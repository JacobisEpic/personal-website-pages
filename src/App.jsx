import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { AssistantSummary, DirectoryListing, DirectoryTree, EmailDraft, Note, PortfolioTree, SocialLinks, Welcome, fileNames, shell } from "./terminal/Content";
import PortfolioGraph from "./terminal/PortfolioGraph";
import { promptFor } from "./terminal/shell";
import "./terminal/terminal.css";

const initialEntry = { id: 0, command: "jacobfetch", type: "jacobfetch", cwd: "" };

function initialEntries() {
  const name = window.location.hash.slice(1).toLowerCase();
  const note = name.replace(/^(?:lab|side-quests)\//, "");
  const result = shell.execute(note, { cwd: "", previous: null, history: [] });
  const file = result.type === "note" ? result.value : note;
  if (!fileNames.includes(file)) return [initialEntry];
  return [initialEntry, { id: 1, command: shell.openFileCommand(file), type: "note", value: file, cwd: "" }];
}

function fileForEntry(entry) {
  switch (entry?.type) {
    case "note":
    case "notes":
      return entry.value;
    case "jacobfetch":
      return "profile";
    case "cd":
      return entry.path || "profile";
    case "ls":
      return entry.directory;
    case "tree":
      return entry.entry.file ?? "profile";
    default:
      return undefined;
  }
}

function readTheme() {
  try {
    return localStorage.getItem("jacob-terminal-theme") === "dark";
  } catch {
    return false;
  }
}

function measureLog(output) {
  const style = getComputedStyle(output);
  return {
    inset: parseFloat(style.paddingTop),
    key: [output.clientWidth, output.clientHeight, style.fontSize, style.lineHeight, style.padding].join(":"),
  };
}

const helpGroups = [
  {
    title: "Portfolio",
    rows: [
      ["jacobfetch", "Show my profile"],
      ["about", "Read my bio"],
      ["work", "Browse experience"],
      ["projects", "Browse projects"],
      ["side-quests", "See side projects"],
      ["fun-facts", "Life outside work"],
      ["contact", "Find me online"],
    ],
  },
  {
    title: "Files",
    rows: [
      ["ls", "List files"],
      ["cd", "Change folders"],
      ["cat, open", "Read notes"],
      ["tree", "Show folder tree"],
      ["find", "Search files"],
      ["pwd", "Show current folder"],
    ],
  },
  {
    title: "Terminal",
    rows: [
      ["help, man", "Command help"],
      ["clear", "Clear the screen"],
      ["history", "Command history"],
      ["theme", "Switch theme"],
      ["msg <text>", "Draft an email"],
      ["type", "Look up a command"],
      ["whoami", "Show username"],
      ["echo", "Print text"],
    ],
  },
];

function Output({ entry, run }) {
  switch (entry.type) {
    case "tree":
      return <DirectoryTree entry={entry.entry} label={entry.label} run={run} />;
    case "jacobfetch":
      return <Welcome run={run} />;
    case "assistant":
      return <AssistantSummary assistant={entry.assistant} cwd={entry.cwd} run={run} />;
    case "help":
      return (
        <>
          <div className="help-groups">
            {helpGroups.map(({ title, rows }) => (
              <section key={title}>
                <h3>{title}</h3>
                <dl className="help-list">
                  {rows.map(([command, description]) => (
                    <div key={command}><dt>{command}</dt><dd>{description}</dd></div>
                  ))}
                </dl>
              </section>
            ))}
          </div>
          <p className="muted">Try <code>help ls</code> for flags. Tab completes, ↑/↓ recall commands, and Esc cancels.</p>
        </>
      );
    case "ls":
      return <DirectoryListing groups={entry.groups} layout={entry.layout} errors={entry.errors} run={run} />;
    case "manual":
      return <><p><strong>{entry.value[0]}</strong>{entry.alias && ` (${entry.alias})`}</p><p>{entry.value[1]}</p></>;
    case "notes":
      return entry.notes.map(({ file, error }, index) => (
        <div className="shell-document" key={index}>
          {error ? <p>{error}</p> : file === "profile" ? <Welcome run={run} /> : <Note name={file} run={run} />}
        </div>
      ));
    case "note":
      return <Note name={entry.value} run={run} />;
    case "draft":
      return <EmailDraft message={entry.value} />;
    default:
      return entry.value ? <p className="shell-text">{entry.value}</p> : null;
  }
}

export default function App() {
  const [dark, setDark] = useState(readTheme);
  const [hasOpenFolders, setHasOpenFolders] = useState(false);
  const [entries, setEntries] = useState(initialEntries);
  const [location, setLocation] = useState({ cwd: "", previous: null });
  const [input, setInput] = useState("");
  const [matches, setMatches] = useState([]);
  const history = useRef([]);
  const cursor = useRef(0);
  const draft = useRef("");
  const sequence = useRef(1);
  const explorer = useRef(null);
  const terminal = useRef(null);
  const log = useRef(null);
  const scrollAnchor = useRef(null);
  const field = useRef(null);
  const latest = entries[entries.length - 1];
  const currentFile = fileForEntry(latest);
  const folderAction = hasOpenFolders ? "Collapse all folders" : "Expand all folders";
  const themeAction = dark ? "Switch to light mode" : "Switch to dark mode";

  useLayoutEffect(() => {
    const output = log.current;
    const last = output.lastElementChild;
    const layout = measureLog(output);
    output.scrollTop = last ? last.offsetTop - layout.inset : 0;
    scrollAnchor.current = last ? { element: last, offset: 0, layout: layout.key } : null;
  }, [entries]);

  useEffect(() => {
    const output = log.current;
    function preserveReadingPosition() {
      const layout = measureLog(output);
      const anchor = scrollAnchor.current;
      if (!anchor || anchor.layout === layout.key) return;
      anchor.layout = layout.key;
      if (output.contains(anchor.element)) {
        output.scrollTop = anchor.element.offsetTop + anchor.offset - layout.inset;
      }
    }
    const observer = new ResizeObserver(preserveReadingPosition);
    observer.observe(output);
    window.addEventListener("resize", preserveReadingPosition);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", preserveReadingPosition);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) field.current.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
    try {
      localStorage.setItem("jacob-terminal-theme", dark ? "dark" : "light");
    } catch {
      // Theme switching still works when browser storage is unavailable.
    }
  }, [dark]);

  function updateInput(value) {
    setInput(value);
    setMatches([]);
  }

  function focusPromptOnClick(event) {
    if (event.target.closest("a, button, input, label, summary")) return;
    if (window.getSelection()?.isCollapsed === false) return;

    field.current.focus({ preventScroll: true });
  }

  function rememberReadingPosition() {
    const output = log.current;
    const layout = measureLog(output);
    // Resize-induced scroll events must not replace the position saved before reflow.
    if (scrollAnchor.current && scrollAnchor.current.layout !== layout.key) return;
    const top = output.scrollTop + layout.inset;
    let element = output.firstElementChild;
    for (const entry of output.children) {
      if (entry.offsetTop > top + 1) break;
      element = entry;
    }
    scrollAnchor.current = element ? { element, offset: top - element.offsetTop, layout: layout.key } : null;
  }

  function runCommand(raw, event, fromTree = false) {
    const command = raw.trim().replace(/^(home|screenfetch)(?=\s|$)/i, "jacobfetch");
    if (!command) return;

    history.current = [...history.current.slice(-49), command];
    cursor.current = history.current.length;
    draft.current = "";
    updateInput("");

    if (!fromTree && (event?.detail === 0 || window.matchMedia("(pointer: fine)").matches)) {
      field.current.focus({ preventScroll: true });
    }

    let result = shell.execute(command, { ...location, history: history.current });
    if (result.type === "cd") setLocation({ cwd: result.path, previous: location.cwd });
    if (result.type === "clear") {
      setEntries([]);
      return;
    }
    if (result.type === "theme") {
      setDark(!dark);
      result = { type: "status", value: `Switched to ${dark ? "light" : "dark"} mode.` };
    }

    const entry = { ...result, id: ++sequence.current, command, cwd: location.cwd };
    setEntries((previous) => [...previous, entry]);
  }

  function showTreeFile(file) {
    runCommand(shell.openFileCommand(file), undefined, true);
  }

  function updateFolderAction() {
    setHasOpenFolders(Boolean(explorer.current.querySelector("details[open]")));
  }

  function toggleAllFolders() {
    const open = !explorer.current.querySelector("details[open]");
    for (const folder of explorer.current.querySelectorAll("details")) {
      folder.open = open;
    }
    setHasOpenFolders(open);
  }

  function openFromTree(file) {
    showTreeFile(file);
    if (window.matchMedia("(max-width: 840px)").matches) {
      terminal.current.scrollIntoView({ block: "start" });
      log.current.focus({ preventScroll: true });
    }
  }

  function handlePromptKey(event) {
    if (event.nativeEvent.isComposing || event.altKey || event.metaKey) return;
    if (event.key === "Escape" || (event.ctrlKey && event.key.toLowerCase() === "c"
      && event.currentTarget.selectionStart === event.currentTarget.selectionEnd
      && window.getSelection()?.isCollapsed !== false)) {
      event.preventDefault();
      cursor.current = history.current.length;
      draft.current = "";
      updateInput("");
      return;
    }
    if (event.ctrlKey) {
      if (event.key.toLowerCase() === "l") {
        event.preventDefault();
        setEntries([]);
        setMatches([]);
      }
      return;
    }

    if (event.key === "Tab" && !event.shiftKey && input.trim()) {
      event.preventDefault();
      if (matches.length > 1) {
        const next = (matches.indexOf(input) + 1) % matches.length;
        setInput(matches[next]);
        return;
      }
      const { prefix, options } = shell.complete(input, location.cwd);
      if (!options.length) return;

      let common = options[0];
      for (const option of options.slice(1)) {
        while (!option.startsWith(common)) common = common.slice(0, -1);
      }
      if (common.length > prefix.length) {
        updateInput(common);
      }
      setMatches(options.length > 1 ? options : []);
      return;
    }

    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;

    const commands = history.current;
    const next = cursor.current + (event.key === "ArrowUp" ? -1 : 1);
    if (next < 0 || next > commands.length) return;

    event.preventDefault();
    if (cursor.current === commands.length) draft.current = input;
    cursor.current = next;
    updateInput(commands[next] ?? draft.current);
  }

  return (
    <main className="terminal-page" data-theme={dark ? "dark" : "light"}>
      <nav className="navigator-window" aria-label="Portfolio navigation">
        <header className="navigator-bar">
          <span aria-hidden="true">~/</span> Explore
          <button
            className="navigator-toggle"
            type="button"
            aria-label={folderAction}
            aria-controls="navigator-tree"
            title={folderAction}
            onClick={toggleAllFolders}
          >
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d={hasOpenFolders ? "M4 1.5l4 4 4-4M4 14.5l4-4 4 4" : "M4 5.5l4-4 4 4M4 10.5l4 4 4-4"} />
            </svg>
          </button>
        </header>
        <div className="navigator-content" id="navigator-tree" ref={explorer}>
          <p className="navigator-hint"><span>hint:</span> Terminal not your thing? Click around here.</p>
          <PortfolioTree
            current={currentFile}
            select={openFromTree}
            selectFolder={openFromTree}
            onFolderToggle={updateFolderAction}
          />
        </div>
      </nav>
      <section className="terminal-window" ref={terminal} aria-labelledby="terminal-title" onClick={focusPromptOnClick}>
        <header className="window-bar">
          <div className="window-lights" aria-hidden="true">
            <svg className="window-light-close" viewBox="0 0 16 16">
              <path d="m5 5 6 6m0-6-6 6" />
            </svg>
            <svg className="window-light-minimize" viewBox="0 0 16 16">
              <path d="M4.5 8h7" />
            </svg>
            <svg className="window-light-maximize" viewBox="0 0 16 16">
              <path d="M4 4h7L4 11zm8 8H5l7-7z" />
            </svg>
          </div>
          <span id="terminal-title">jacob <span className="title-divider">/</span> zsh</span>
          <div className="window-actions">
            <SocialLinks />
            <button
              type="button"
              className="theme-toggle"
              aria-label={themeAction}
              title={themeAction}
              onClick={() => setDark((previous) => !previous)}
            >
              <svg viewBox="0 0 16 16" aria-hidden="true">
                {dark ? (
                  <>
                    <circle cx="8" cy="8" r="3" />
                    <path d="M8 1v1.5m0 11V15M1 8h1.5m11 0H15M3.05 3.05l1.06 1.06m7.78 7.78 1.06 1.06m0-9.9-1.06 1.06m-7.78 7.78-1.06 1.06" />
                  </>
                ) : <path d="M13.75 9.35A5.9 5.9 0 0 1 6.65 2.25a5.9 5.9 0 1 0 7.1 7.1Z" />}
              </svg>
            </button>
          </div>
        </header>
        <div className="terminal-log" ref={log} role="log" aria-label="Terminal output" tabIndex={0} onScroll={rememberReadingPosition}>
          {entries.map((entry) => (
            <div className={entry.type === "cd" && !entry.value ? "terminal-entry is-quiet" : "terminal-entry"} key={entry.id}>
              <p className="command-echo"><span>{promptFor(entry.cwd)}</span> {entry.command}</p>
              <Output entry={entry} run={runCommand} />
            </div>
          ))}
        </div>
        <form className={`terminal-prompt${location.cwd ? " has-directory" : ""}`} onSubmit={(event) => {
          event.preventDefault();
          runCommand(input);
        }}>
          {matches.length > 0 && (
            <p className="completions" role="status">
              {matches.map((match, index) => (
                <span key={match}>{index > 0 && "  ·  "}<span className={match === input ? "is-active" : undefined}>{match.trimEnd()}</span></span>
              ))}
            </p>
          )}
          <label htmlFor="terminal-command" className="prompt-label">{promptFor(location.cwd)}</label>
          <input
            ref={field}
            id="terminal-command"
            aria-label="Type a command"
            value={input}
            onChange={(event) => {
              cursor.current = history.current.length;
              updateInput(event.target.value);
            }}
            onKeyDown={handlePromptKey}
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            enterKeyHint="go"
            maxLength={500}
            placeholder="▌"
          />
          <button className="run-command" type="submit" aria-label="Run command" disabled={!input.trim()}>↵</button>
        </form>
      </section>
      <PortfolioGraph current={currentFile} selectionKey={latest?.id} select={openFromTree} />
    </main>
  );
}
