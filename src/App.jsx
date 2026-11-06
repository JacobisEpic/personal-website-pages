import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { EmailDraft, FileList, Note, PortfolioTree, SocialLinks, Welcome, fileNames, sections } from "./terminal/Content";
import "./terminal/terminal.css";

const prompt = "jacob@jacobchin ~ %";
const aliases = {
  who: "about",
  experience: "work",
  stuff: "projects",
  "fun-facts": "interests",
};
const help = {
  jacobfetch: "Return to the profile screen",
  tree: "Show the portfolio tree",
  ...sections,
  "msg <text>": "Draft an email to me",
  ls: "List the files",
  "cat <file>": "Read a file",
  theme: "Switch between light and dark",
  clear: "Clear the terminal",
  help: "Show this command list",
};
const completions = Object.keys(help).map((command) => command.replace(/ <\w+>$/, " "));
const menuCommands = [
  ["jacobfetch", "jacobfetch"],
  ["theme", "Toggle light / dark"],
  ["clear", "Clear screen"],
  ["help", "Help"],
];
const initialEntry = { id: 0, command: "jacobfetch", type: "jacobfetch" };

function parseCommand(command) {
  const [verb] = command.toLowerCase().split(/\s+/);
  const arg = command.slice(verb.length).trim();

  if (verb === "cat") {
    const name = arg.toLowerCase().replace(/\.md$/, "");
    if (fileNames.includes(name)) return { type: "note", value: name };
    return { type: "status", value: arg ? `No file named "${arg}". Try ls.` : "Usage: cat <file>" };
  }

  if (verb === "msg") {
    return arg ? { type: "draft", value: arg } : { type: "status", value: "Usage: msg <text>" };
  }

  const name = Object.hasOwn(aliases, verb) ? aliases[verb] : verb;
  if (Object.hasOwn(help, name)) {
    if (arg) return { type: "status", value: `Unexpected arguments for ${verb}. Try help.` };
    if (Object.hasOwn(sections, name)) return { type: "note", value: name };
    return { type: name };
  }

  return { type: "status", value: `Command not found: ${verb}. Try help.` };
}

function initialEntries() {
  const name = window.location.hash.slice(1).toLowerCase();
  const note = name.startsWith("lab/") ? name.slice(4) : name;
  const file = Object.hasOwn(aliases, note) ? aliases[note] : note;
  if (!fileNames.includes(file)) return [initialEntry];
  return [initialEntry, { id: 1, command: `cat ${file}.md`, type: "note", value: file }];
}

function readTheme() {
  try {
    return localStorage.getItem("jacob-terminal-theme") === "dark";
  } catch {
    return false;
  }
}

function Output({ entry, run, select }) {
  switch (entry.type) {
    case "tree":
      return <PortfolioTree select={select} />;
    case "jacobfetch":
      return <Welcome run={run} />;
    case "help":
      return (
        <>
          <dl className="help-list">
            {Object.entries(help).map(([command, description]) => (
              <div key={command}><dt>{command}</dt><dd>{description}</dd></div>
            ))}
          </dl>
          <p className="muted">Use ↑ and ↓ for history, and Tab to complete commands and file names.</p>
        </>
      );
    case "ls":
      return <FileList names={fileNames} run={run} />;
    case "note":
      return <Note name={entry.value} run={run} />;
    case "draft":
      return <EmailDraft message={entry.value} />;
    default:
      return <p>{entry.value}</p>;
  }
}

export default function App() {
  const [dark, setDark] = useState(readTheme);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasOpenFolders, setHasOpenFolders] = useState(false);
  const [entries, setEntries] = useState(initialEntries);
  const [input, setInput] = useState("");
  const [matches, setMatches] = useState([]);
  const history = useRef([]);
  const cursor = useRef(0);
  const draft = useRef("");
  const sequence = useRef(1);
  const explorer = useRef(null);
  const terminal = useRef(null);
  const log = useRef(null);
  const field = useRef(null);
  const menu = useRef(null);
  const menuButton = useRef(null);
  const latest = entries[entries.length - 1];
  const currentFile = latest?.type === "note" ? latest.value
    : latest?.type === "jacobfetch" ? "profile" : undefined;
  const folderAction = hasOpenFolders ? "Collapse all folders" : "Expand all folders";

  useLayoutEffect(() => {
    const output = log.current;
    const last = output.lastElementChild;
    output.scrollTop = last ? last.offsetTop - 20 : 0;
  }, [entries]);

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
    if (event.target.closest("a, button, input, label, summary, .terminal-menu")) return;
    if (window.getSelection()?.isCollapsed === false) return;

    field.current.focus({ preventScroll: true });
  }

  function runCommand(raw, event, fromTree = false) {
    const command = raw.trim().replace(/^(home|screenfetch)(?=\s|$)/i, "jacobfetch");
    if (!command) return;

    history.current = [...history.current.slice(-49), command];
    cursor.current = history.current.length;
    draft.current = "";
    updateInput("");
    setMenuOpen(false);

    if (!fromTree && (event?.detail === 0 || window.matchMedia("(pointer: fine)").matches)) {
      field.current.focus({ preventScroll: true });
    }

    let result = parseCommand(command);
    if (result.type === "clear") {
      setEntries([]);
      return;
    }
    if (result.type === "theme") {
      setDark(!dark);
      result = { type: "status", value: `Switched to ${dark ? "light" : "dark"} mode.` };
    }

    const entry = { ...result, id: ++sequence.current, command };
    setEntries((previous) => fromTree || result.type === "jacobfetch" ? [entry] : [...previous.slice(-39), entry]);
  }

  function showTreeFile(file) {
    runCommand(file === "profile" ? "jacobfetch" : `cat ${file}.md`, undefined, true);
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
    if (event.nativeEvent.isComposing || event.altKey || event.ctrlKey || event.metaKey) return;

    if (event.key === "Tab" && !event.shiftKey && input.trim()) {
      const prefix = input.trimStart().toLowerCase().replace(/\s+/g, " ");
      const candidates = prefix.startsWith("cat ")
        ? fileNames.map((name) => `cat ${name}.md`)
        : completions;
      const options = candidates.filter((command) => command.startsWith(prefix));
      if (!options.length) return;

      let common = options[0];
      for (const option of options.slice(1)) {
        while (!option.startsWith(common)) common = common.slice(0, -1);
      }
      if (common.length > prefix.length) {
        event.preventDefault();
        updateInput(common);
      } else if (options.length > 1 && !matches.length) {
        event.preventDefault();
        setMatches(options);
      }
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
    <main
      className="terminal-page"
      data-theme={dark ? "dark" : "light"}
      onPointerDown={(event) => {
        if (menuOpen && !menu.current.contains(event.target)) setMenuOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key !== "Escape" || !menuOpen) return;
        setMenuOpen(false);
        menuButton.current.focus();
      }}
    >
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
          <PortfolioTree
            current={currentFile}
            select={openFromTree}
            selectFolder={showTreeFile}
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
            <div className="terminal-menu" ref={menu}>
              <button
                type="button"
                ref={menuButton}
                className="menu-toggle"
                aria-label="Terminal menu"
                aria-expanded={menuOpen}
                aria-controls="terminal-actions"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 4h10M3 8h10M3 12h10" /></svg>
              </button>
              <div className="menu-panel" id="terminal-actions" hidden={!menuOpen}>
                {menuCommands.map(([command, label]) => (
                  <button key={command} type="button" onClick={(event) => runCommand(command, event)}>{label}</button>
                ))}
              </div>
            </div>
          </div>
        </header>
        <div className="terminal-log" ref={log} role="log" aria-label="Terminal output" tabIndex={0}>
          {entries.map((entry) => (
            <div className="terminal-entry" key={entry.id}>
              <p className="command-echo"><span>{prompt}</span> {entry.command}</p>
              <Output entry={entry} run={runCommand} select={openFromTree} />
            </div>
          ))}
        </div>
        <form className="terminal-prompt" onSubmit={(event) => {
          event.preventDefault();
          runCommand(input);
        }}>
          {matches.length > 0 && <p className="completions" role="status">{matches.map((match) => match.trimEnd()).join("  ·  ")}</p>}
          <label htmlFor="terminal-command" className="prompt-label">{prompt}</label>
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
    </main>
  );
}
