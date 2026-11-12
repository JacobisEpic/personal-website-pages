import { useEffect, useReducer, useRef, useState } from "react";

import { labProjects } from "../constants/lab";
import { portfolioTree } from "./Content";

// Match the default Obsidian graph forces in simulation units.
const centerStrength = 0.1;
const repelStrength = 1000;
const repelMinDistance = 30;
const linkDistance = 250;
const collisionDistance = 120;
const velocityRetention = 0.6;
const alphaDecay = 1 - 0.001 ** (1 / 300);
const dragAlpha = 0.3;
const frameDuration = 1000 / 60;
const panDecay = 0.9;
const focusDecay = 0.78;
const zoomDecay = 0.85;
const centeredView = { x: 0, y: 0, zoom: 1 };

function radiusFor(node, root) {
  return node === root ? 8 : Math.min(6, 2.8 + node.degree * 0.45);
}

function createGraph() {
  const root = { id: "profile", label: "Jacob", x: 0, y: 0, vx: 0, vy: 0, degree: 0 };
  const nodes = [root];
  const edges = [];

  function link(source, target) {
    source.degree++;
    target.degree++;
    edges.push({ source, target });
  }

  function addNode(entry, parent, angle, distance) {
    const node = {
      id: entry.file,
      label: entry.label,
      x: parent.x + Math.cos(angle) * distance,
      y: parent.y + Math.sin(angle) * distance,
      vx: 0,
      vy: 0,
      degree: 0,
    };
    nodes.push(node);
    link(parent, node);

    entry.children?.forEach((child, index) => {
      const offset = index - (entry.children.length - 1) / 2;
      addNode(child, node, angle + offset * 0.34, 170 + Math.abs(offset) * 18);
    });
  }

  const sections = portfolioTree.filter(({ file }) => file !== root.id);
  sections.forEach((entry, index) => {
    const angle = index * 2 * Math.PI / sections.length - Math.PI / 2;
    addNode(entry, root, angle, linkDistance);
  });

  const byId = new Map(nodes.map((node) => [node.id, node]));
  for (const project of labProjects) {
    for (const related of project.links ?? []) {
      const source = byId.get(project.slug);
      const target = byId.get(related);
      if (target && !edges.some((edge) => (
        (edge.source === source && edge.target === target) ||
        (edge.source === target && edge.target === source)
      ))) link(source, target);
    }
  }

  const graph = { root, nodes, edges, byId };
  let alpha = 1;
  for (let tick = 0; tick < 260; tick++) {
    alpha *= 1 - alphaDecay;
    tickGraph(graph, alpha);
  }
  graph.extentX = Math.max(...nodes.map(({ x }) => Math.abs(x)));
  graph.extentY = Math.max(...nodes.map(({ y }) => Math.abs(y)));
  return graph;
}

function tickGraph({ nodes, edges, root }, alpha, pinned) {
  for (const node of nodes) {
    node.vx -= node.x * centerStrength * alpha;
    node.vy -= node.y * centerStrength * alpha;
  }

  for (const { source, target } of edges) {
    const dx = target.x + target.vx - source.x - source.vx;
    const dy = target.y + target.vy - source.y - source.vy;
    const distance = Math.hypot(dx, dy) || 1;
    const force = (distance - linkDistance) * alpha / (distance * Math.min(source.degree, target.degree));
    const bias = source.degree / (source.degree + target.degree);
    source.vx += dx * force * (1 - bias);
    source.vy += dy * force * (1 - bias);
    target.vx -= dx * force * bias;
    target.vy -= dy * force * bias;
  }

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i];
      const b = nodes[j];
      const dx = b.x - a.x || 0.001;
      const dy = b.y - a.y;
      const distance = Math.hypot(dx, dy);
      const push = repelStrength * alpha / (distance * Math.max(distance, repelMinDistance));
      a.vx -= dx * push;
      a.vy -= dy * push;
      b.vx += dx * push;
      b.vy += dy * push;
    }
  }

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i];
      const b = nodes[j];
      const dx = b.x + b.vx - a.x - a.vx || 0.001;
      const dy = b.y + b.vy - a.y - a.vy;
      const distance = Math.hypot(dx, dy);
      if (distance >= collisionDistance) continue;
      const push = (collisionDistance - distance) / distance * 0.25;
      a.vx -= dx * push;
      a.vy -= dy * push;
      b.vx += dx * push;
      b.vy += dy * push;
    }
  }

  for (const node of nodes) {
    if (node === pinned) {
      node.vx = node.vy = 0;
      continue;
    }
    if (node === root) {
      // Let Jacob be dragged too, then ease the hub back to the center.
      node.x = Math.abs(node.x) > 0.01 ? node.x * 0.86 : 0;
      node.y = Math.abs(node.y) > 0.01 ? node.y * 0.86 : 0;
      node.vx = node.vy = 0;
      continue;
    }
    node.vx *= velocityRetention;
    node.vy *= velocityRetention;
    node.x += node.vx;
    node.y += node.vy;
  }
}

export default function PortfolioGraph({ current, selectionKey, select }) {
  const [graph] = useState(createGraph);
  const [size, setSize] = useState({ width: 204, height: 460 });
  const [hovered, setHovered] = useState(null);
  const [focused, setFocused] = useState(null);
  const [, redraw] = useReducer((frame) => frame + 1, 0);
  const surface = useRef(null);
  const camera = useRef(centeredView);
  const focusTarget = useRef(null);
  const zoomTarget = useRef(null);
  const panVelocity = useRef({ x: 0, y: 0 });
  const gesture = useRef(null);
  const animation = useRef(0);
  const alpha = useRef(0);
  const lastFrame = useRef(0);
  const tickTime = useRef(0);

  function setZoom(zoom, anchorX, anchorY) {
    const previous = camera.current;
    const ratio = zoom / previous.zoom;
    camera.current = {
      zoom,
      x: anchorX + (previous.x - anchorX) * ratio,
      y: anchorY + (previous.y - anchorY) * ratio,
    };
  }

  function zoomBy(factor, anchorX = 0, anchorY = 0) {
    focusTarget.current = null;
    const zoom = Math.max(0.55, Math.min(3.6, (zoomTarget.current?.zoom ?? camera.current.zoom) * factor));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setZoom(zoom, anchorX, anchorY);
      redraw();
    } else {
      zoomTarget.current = { zoom, anchorX, anchorY };
      queueFrame();
    }
  }

  function panBy(dx, dy) {
    const view = camera.current;
    camera.current = { ...view, x: view.x + dx, y: view.y + dy };
  }

  function resetView() {
    focusTarget.current = null;
    zoomTarget.current = null;
    panVelocity.current = { x: 0, y: 0 };
    camera.current = centeredView;
    redraw();
  }

  useEffect(() => {
    const svg = surface.current;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width && height) setSize({ width, height });
    });
    observer.observe(svg);

    function zoomOnWheel(event) {
      event.preventDefault();
      if (gesture.current) return;
      const bounds = svg.getBoundingClientRect();
      const delta = event.deltaY * (event.deltaMode === 1 ? 40 : event.deltaMode === 2 ? 800 : 1);
      if (delta > 0) zoomBy(1.5 ** (-delta / 120));
      else if (delta < 0) {
        zoomBy(1.5 ** (-delta / 120), event.clientX - bounds.left - bounds.width / 2, event.clientY - bounds.top - bounds.height / 2);
      }
    }

    svg.addEventListener("wheel", zoomOnWheel, { passive: false });
    return () => {
      observer.disconnect();
      svg.removeEventListener("wheel", zoomOnWheel);
      cancelAnimationFrame(animation.current);
      animation.current = 0;
    };
  }, []);

  const { width, height } = size;
  const view = camera.current;
  const fit = Math.min((width / 2 - 22) / graph.extentX, (height / 2 - 28) / graph.extentY);
  const baseScale = Math.max(fit, 0.01);
  const scale = baseScale * view.zoom;
  const offsetX = width / 2 + view.x;
  const offsetY = height / 2 + view.y;
  const currentNode = graph.byId.get(current);
  const highlighted = gesture.current?.pinned?.id ?? focused ?? hovered ?? currentNode?.id;

  useEffect(() => {
    if (!currentNode) return;
    zoomTarget.current = null;
    panVelocity.current = { x: 0, y: 0 };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const { zoom } = camera.current;
      focusTarget.current = null;
      camera.current = {
        zoom,
        x: -currentNode.x * baseScale * zoom,
        y: -currentNode.y * baseScale * zoom,
      };
      redraw();
    } else {
      focusTarget.current = { node: currentNode, baseScale };
      queueFrame();
    }
  }, [currentNode, selectionKey, baseScale]);

  function queueFrame() {
    if (animation.current) return;
    lastFrame.current = performance.now();
    animation.current = requestAnimationFrame(animate);
  }

  function animate(time) {
    animation.current = 0;
    const elapsed = Math.min(Math.max(0, time - lastFrame.current), 3 * frameDuration);
    lastFrame.current = time;
    const pinned = gesture.current?.pinned;
    const target = pinned ? dragAlpha : 0;
    let changed = false;

    if (pinned || alpha.current > 0.001) {
      tickTime.current += elapsed;
      // Retain fractional time so a slightly short frame doesn't cut the tick rate in half.
      while (tickTime.current >= frameDuration) {
        tickTime.current -= frameDuration;
        alpha.current += (target - alpha.current) * alphaDecay;
        tickGraph(graph, alpha.current, pinned);
        changed = true;
      }
    } else {
      tickTime.current = 0;
    }

    const frames = elapsed / frameDuration;
    const { x: vx, y: vy } = panVelocity.current;
    const moving = Math.hypot(vx, vy) > 0.01;
    if (moving) {
      const remaining = panDecay ** frames;
      const distance = (1 - remaining) / (1 - panDecay) * frameDuration;
      panBy(vx * distance, vy * distance);
      panVelocity.current = { x: vx * remaining, y: vy * remaining };
      changed = true;
    }

    const focus = focusTarget.current;
    if (focus) {
      const { x, y, zoom } = camera.current;
      const dx = -focus.node.x * focus.baseScale * zoom - x;
      const dy = -focus.node.y * focus.baseScale * zoom - y;
      const done = Math.hypot(dx, dy) < 0.5;
      const step = done ? 1 : 1 - focusDecay ** frames;
      panBy(dx * step, dy * step);
      if (done) focusTarget.current = null;
      changed = true;
    }

    const zoom = zoomTarget.current;
    if (zoom) {
      const previous = camera.current.zoom;
      const done = Math.abs(zoom.zoom / previous - 1) < 0.01;
      setZoom(done ? zoom.zoom : zoom.zoom + (previous - zoom.zoom) * zoomDecay ** frames, zoom.anchorX, zoom.anchorY);
      if (done) zoomTarget.current = null;
      changed = true;
    }

    if (changed) redraw();
    if (pinned || alpha.current > 0.001 || moving || zoomTarget.current || focusTarget.current) {
      animation.current = requestAnimationFrame(animate);
    }
  }

  function beginGesture(event) {
    if (event.button !== 0 || gesture.current) return;
    focusTarget.current = null;
    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerX = event.clientX - bounds.left;
    const pointerY = event.clientY - bounds.top;
    let closest;
    let closestDistance = Infinity;
    for (const node of graph.nodes) {
      const distance = Math.hypot(pointerX - offsetX - node.x * scale, pointerY - offsetY - node.y * scale);
      if (distance <= Math.max(radiusFor(node, graph.root) + 3, 8) && distance < closestDistance) {
        closest = node;
        closestDistance = distance;
      }
    }
    zoomTarget.current = null;
    panVelocity.current = { x: 0, y: 0 };
    gesture.current = {
      pointer: event.pointerId,
      node: closest,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      lastY: event.clientY,
      lastTime: performance.now(),
      vx: 0,
      vy: 0,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function moveGesture(event) {
    const drag = gesture.current;
    if (!drag || drag.pointer !== event.pointerId) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (!drag.moved && dx * dx + dy * dy < 25) return;
    drag.moved = true;

    if (drag.node) {
      const bounds = event.currentTarget.getBoundingClientRect();
      const { x, y, zoom } = camera.current;
      const dragScale = baseScale * zoom;
      if (!drag.pinned) tickTime.current = frameDuration;
      drag.pinned = drag.node;
      drag.node.x = (event.clientX - bounds.left - width / 2 - x) / dragScale;
      drag.node.y = (event.clientY - bounds.top - height / 2 - y) / dragScale;
      drag.node.vx = drag.node.vy = 0;
      alpha.current = Math.max(alpha.current, dragAlpha);
      queueFrame();
      redraw();
    } else {
      const now = performance.now();
      const dt = Math.max(4, now - drag.lastTime);
      const moveX = event.clientX - drag.lastX;
      const moveY = event.clientY - drag.lastY;
      drag.vx = drag.vx * 0.8 + Math.max(-1, Math.min(1, moveX / dt)) * 0.2;
      drag.vy = drag.vy * 0.8 + Math.max(-1, Math.min(1, moveY / dt)) * 0.2;
      drag.lastX = event.clientX;
      drag.lastY = event.clientY;
      drag.lastTime = now;
      panBy(moveX, moveY);
      redraw();
    }
  }

  function finishGesture(event) {
    const drag = gesture.current;
    if (!drag || drag.pointer !== event.pointerId) return;
    gesture.current = null;
    if (event.type !== "pointerup") return;
    if (!drag.moved && drag.node) select(drag.node.id);
    if (drag.moved && !drag.node && performance.now() - drag.lastTime < 100
      && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      panVelocity.current = { x: drag.vx, y: drag.vy };
      queueFrame();
    }
  }

  function handleKeys(event) {
    const shift = event.shiftKey ? 48 : 16;
    const movement = {
      ArrowUp: [0, shift],
      ArrowDown: [0, -shift],
      ArrowLeft: [shift, 0],
      ArrowRight: [-shift, 0],
    }[event.key];

    if (movement) {
      event.preventDefault();
      focusTarget.current = null;
      panBy(...movement);
      redraw();
    } else if (event.key === "+" || event.key === "=" || event.key === "-") {
      event.preventDefault();
      zoomBy(event.key === "-" ? 1 / 1.2 : 1.2);
    }
  }

  return (
    <section className="graph-window" aria-labelledby="graph-title">
      <header className="navigator-bar">
        <span id="graph-title">Graph</span>
        <div className="graph-tools">
          <button type="button" aria-label="Zoom out" title="Zoom out" onClick={() => zoomBy(1 / 1.2)}>−</button>
          <button type="button" aria-label="Zoom in" title="Zoom in" onClick={() => zoomBy(1.2)}>+</button>
          <button type="button" aria-label="Reset graph view" title="Reset graph view" onClick={resetView}>⟲</button>
        </div>
      </header>
      <svg
        ref={surface}
        className="graph-surface"
        viewBox={`0 0 ${width} ${height}`}
        tabIndex={0}
        aria-label="Portfolio graph. Use arrow keys to pan, plus and minus to zoom, and Enter to open a focused node."
        onKeyDown={handleKeys}
        onPointerDown={beginGesture}
        onPointerMove={moveGesture}
        onPointerUp={finishGesture}
        onPointerCancel={finishGesture}
        onLostPointerCapture={finishGesture}
      >
        <g aria-hidden="true">
          {graph.edges.map(({ source, target }) => (
            <line
              key={`${source.id}:${target.id}`}
              className={source.id === highlighted || target.id === highlighted ? "graph-edge is-highlighted" : "graph-edge"}
              x1={offsetX + source.x * scale}
              y1={offsetY + source.y * scale}
              x2={offsetX + target.x * scale}
              y2={offsetY + target.y * scale}
            />
          ))}
        </g>
        {graph.nodes.map((node) => {
          const radius = radiusFor(node, graph.root);
          const isCurrent = node === currentNode;
          const showLabel = isCurrent || node === graph.root || node.id === highlighted || view.zoom >= 1.75;
          const x = offsetX + node.x * scale;
          return (
            <g
              key={node.id}
              data-graph-node={node.id}
              className="graph-node"
              aria-current={isCurrent ? "true" : undefined}
              aria-label={`Open ${node.label}`}
              role="button"
              tabIndex={0}
              transform={`translate(${x} ${offsetY + node.y * scale})`}
              onPointerEnter={(event) => { if (event.pointerType !== "touch") setHovered(node.id); }}
              onPointerLeave={() => setHovered(null)}
              onFocus={() => setFocused(node.id)}
              onBlur={() => setFocused(null)}
              onClick={(event) => { if (event.detail === 0) select(node.id); }}
              onKeyDown={(event) => {
                if (event.key !== "Enter" && event.key !== " ") return;
                event.preventDefault();
                select(node.id);
              }}
            >
              <circle r={Math.max(radius + 3, 8)} fill="transparent" />
              <circle className="graph-dot" r={radius} />
              {showLabel && (
                <text y={radius + 14} textAnchor={x < 45 ? "start" : x > width - 45 ? "end" : "middle"} aria-hidden="true">
                  {node.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <p className="graph-hint">Drag · Scroll to zoom</p>
    </section>
  );
}
