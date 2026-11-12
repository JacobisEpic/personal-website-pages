export default function PiHoleDiagram() {
  return (
    <figure className="pihole-flow">
      <figcaption>DNS filtering on my Mac</figcaption>
      <div className="pihole-flow-step">
        <strong>Apps on my Mac</strong>
        <small>DNS points to 127.0.0.1</small>
      </div>
      <div className="pihole-flow-arrow" aria-hidden="true">↓</div>
      <div className="pihole-flow-step is-filter">
        <strong>Pi-hole in Docker Desktop</strong>
        <small>127.0.0.1:53 · checks blocklists</small>
      </div>
      <svg className="pihole-flow-branches" viewBox="0 0 480 42" preserveAspectRatio="none" aria-hidden="true">
        <path d="M240 0v16M120 42V16h240v26M114 36l6 6 6-6m228 0 6 6 6-6" />
      </svg>
      <div className="pihole-flow-outcomes">
        <div className="is-blocked">
          <strong>Blocked domain</strong>
          <small>Blocking reply returned to my Mac</small>
        </div>
        <div>
          <strong>Allowed domain</strong>
          <small>Resolve via cache or upstream DNS; return the IP to my Mac</small>
        </div>
      </div>
      <div className="pihole-flow-web">
        <small>After an allowed name resolves</small>
        <strong>Mac → website</strong>
        <small>Web traffic uses my normal network connection.</small>
      </div>
    </figure>
  );
}
