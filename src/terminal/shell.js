const builtins = {
  cd: ["cd [directory]", "Change directory. Use cd .., cd -, or cd to return to ~."],
  pwd: ["pwd", "Print the current directory."],
  ls: ["ls [flags] [path ...]", "List files. Flags: -a/-A (dot entries), -l (permissions), -1/-C (rows/columns), -d (directories themselves), -R (recursive), -r (reverse), -F (type marks), -h (no sizes on virtual files)."],
  cat: ["cat <file ...>", "Read one or more portfolio notes."],
  open: ["open <file ...>", "Open portfolio notes in the terminal."],
  tree: ["tree [path]", "Show the directory hierarchy."],
  find: ["find [path] [-name pattern]", "List paths recursively, optionally filtering by name."],
  whoami: ["whoami", "Print the portfolio username."],
  type: ["type <command ...>", "Identify commands and aliases. Also available as which."],
  echo: ["echo [text ...]", "Print text. Supports \$PWD, \$OLDPWD, \$HOME, and \$USER."],
  history: ["history", "Show recent commands from this session."],
  clear: ["clear", "Clear the terminal output."],
  help: ["help [command]", "List commands or show how to use one."],
  man: ["man [command]", "Show the portfolio manual for a command."],
  jacobfetch: ["jacobfetch", "Return to the profile screen."],
  codex: ["codex [prompt]", "Get a prepared summary of Jacob in a familiar CLI."],
  claude: ["claude [prompt]", "Get a prepared summary of Jacob in a familiar CLI."],
  theme: ["theme", "Switch between light and dark."],
  msg: ["msg <text>", "Draft an email to Jacob."],
};

const aliases = new Map(Object.entries({
  home: "jacobfetch", screenfetch: "jacobfetch", who: "about", experience: "work",
  stuff: "projects", "fun-facts": "interests", chdir: "cd", less: "cat", more: "cat",
  ll: "ls -l", la: "ls -a", which: "type",
}));
const writeCommands = new Set("rm mkdir rmdir touch mv cp chmod chown ln sudo vi vim nano".split(" "));
const pathCommands = new Set(["cd", "ls", "cat", "open", "tree", "find"]);
const status = (value) => ({ type: "status", value });
export const absolutePath = (path) => "/" + path;
export const promptFor = (path) => `jacob@jacobchin ~${path ? "/" + path : ""} %`;

function wordsFrom(input, variables) {
  const words = [];
  let word = "";
  let started = false;
  let quote = "";
  let wildcard = false;
  const push = () => {
    if (started) words.push({ text: word, wildcard });
    word = "";
    started = wildcard = false;
  };

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (char === "\\" && quote !== "'") {
      if (++i === input.length) return { error: "Incomplete escape." };
      word += input[i];
      started = true;
    } else if (char === quote) {
      quote = "";
    } else if (!quote && (char === "'" || char === '"')) {
      quote = char;
      started = true;
    } else if (!quote && /\s/.test(char)) {
      push();
    } else if (!quote && "|&;<>".includes(char)) {
      return { error: "Pipes, redirection, and command chaining are unavailable. Try help." };
    } else if (char === "$" && quote !== "'" && variables) {
      const name = /^\$(\w+)/.exec(input.slice(i))?.[1];
      word += name ? variables[name] ?? "" : char;
      if (name) i += name.length;
      started = true;
    } else {
      word += char;
      started = true;
      if (!quote && (char === "*" || char === "?")) wildcard = true;
    }
  }
  if (quote) return { error: "Unclosed quote." };
  push();
  return { words };
}

function matchesPattern(name, pattern) {
  name = name.toLowerCase();
  pattern = pattern.toLowerCase();
  let i = 0;
  let j = 0;
  let star = -1;
  let retry = 0;
  while (i < name.length) {
    if (pattern[j] === "?" || pattern[j] === name[i]) {
      i++;
      j++;
    } else if (pattern[j] === "*") {
      star = j++;
      retry = i;
    } else if (star >= 0) {
      j = star + 1;
      i = ++retry;
    } else {
      return false;
    }
  }
  return /^\**$/.test(pattern.slice(j));
}

function splitAtSlash(path) {
  const index = path.lastIndexOf("/") + 1;
  return [path.slice(0, index), path.slice(index)];
}

export function createShell(tree, sections) {
  const byFile = new Map();
  const byPath = new Map();
  const commands = { ...builtins, ...Object.fromEntries(
    Object.entries(sections).map(([name, description]) => [name, [name, description]]),
  ) };
  const commandNames = [...Object.keys(commands), ...aliases.keys()].filter((name) => {
    const [command] = (aliases.get(name) ?? name).split(" ");
    return Object.hasOwn(commands, command);
  });

  function build(parent, nodes) {
    parent.children = nodes.map(({ file, children }) => {
      const basename = file.split("/").pop();
      const name = children ? basename : `${basename}.md`;
      const path = parent.path ? `${parent.path}/${name}` : name;
      const entry = { name, path, file, parent };
      byFile.set(file, entry);
      byPath.set(path, entry);
      if (children) build(entry, children);
      return entry;
    }).sort((a, b) => a.name.localeCompare(b.name));
  }

  const root = { name: ".", path: "" };
  byPath.set("", root);
  build(root, tree);

  function resolve(raw, cwd) {
    if (!raw) return { entry: byPath.get(cwd) };
    const fromHome = raw === "~" || raw.startsWith("~/");
    const path = fromHome ? raw.slice(1) : raw;
    let entry = fromHome || path.startsWith("/") ? root : byPath.get(cwd);
    for (const segment of path.toLowerCase().split("/")) {
      if (!segment) continue;
      if (!entry.children) return { error: "Not a directory" };
      if (segment === "..") entry = entry.parent ?? root;
      else if (segment !== ".") entry = entry.children.find(({ name }) => name === segment);
      if (!entry) return { error: "No such file or directory" };
    }
    return !entry.children && path.endsWith("/") ? { error: "Not a directory" } : { entry };
  }

  function expand(operand, cwd) {
    if (!operand.wildcard) return [operand.text];
    const [base, pattern] = splitAtSlash(operand.text);
    const { entry } = resolve(base, cwd);
    return (entry?.children ?? [])
      .filter(({ name }) => matchesPattern(name, pattern))
      .map(({ name }) => base + name);
  }

  function helpFor(command) {
    if (!command) return { type: "help" };
    const expanded = aliases.get(command) ?? command;
    const [name] = expanded.split(" ");
    return Object.hasOwn(commands, name)
      ? { type: "manual", value: commands[name], alias: expanded !== command ? `${command} = ${expanded}` : undefined }
      : status(`No manual entry for ${command}. Try help.`);
  }

  const usage = (verb) => status(`Usage: ${commands[verb][0]}`);
  const pathError = (verb, arg, error) => `${verb}: ${arg}: ${error}`;

  function list(operands, flags, cwd) {
    const entries = [];
    const errors = [];
    const groups = [];
    for (const arg of operands.length ? operands : ["."]) {
      const { entry, error } = resolve(arg, cwd);
      if (entry) entries.push({ entry, label: arg });
      else errors.push(pathError("ls", arg, error));
    }
    const reverse = flags.includes("r");
    entries.sort((a, b) => (reverse ? -1 : 1) * a.label.localeCompare(b.label));
    const files = entries.filter(({ entry }) => !entry.children || flags.includes("d"));
    if (files.length) groups.push({ items: files.map(({ entry, label }) => ({ entry, label })) });

    function addGroup(entry, heading) {
      const items = entry.children.map((child) => ({ entry: child, label: child.name }));
      if (flags.lastIndexOf("a") > flags.lastIndexOf("A")) {
        items.unshift({ entry, label: "." }, { entry: entry.parent ?? root, label: ".." });
      }
      if (reverse) items.reverse();
      groups.push({ heading, items });
      if (flags.includes("R")) {
        for (const { entry: child, label } of items) {
          if (child.children && label !== "." && label !== "..") addGroup(child, `${heading.replace(/\/$/, "")}/${label}`);
        }
      }
    }

    for (const { entry, label } of entries) {
      if (entry.children && !flags.includes("d")) {
        addGroup(entry, operands.length > 1 || flags.includes("R") ? label : undefined);
      }
    }
    const format = [...flags].findLast((flag) => "l1C".includes(flag));
    return { type: "ls", groups, errors, layout: format === "l" ? "long" : format === "1" ? "single" : "columns" };
  }

  function read(verb, operands, cwd) {
    if (!operands.length) return usage(verb);
    const notes = [];
    for (const arg of operands) {
      const { entry, error } = resolve(arg, cwd);
      let file = entry?.file;
      if (!entry && error !== "Not a directory" && !arg.endsWith("/")) {
        // Preserve extensionless notes and links from the original portfolio shell.
        file = resolve(`${arg}.md`, cwd).entry?.file;
        if (!file && (cwd === "" || arg.startsWith("/") || arg.startsWith("~/"))) {
          const legacy = arg.toLowerCase().replace(/^(?:~?\/|\.\/)/, "").replace(/\.md$/, "");
          if (byFile.has(legacy)) file = legacy;
        }
      }
      notes.push(entry?.children
        ? { error: pathError(verb, arg, "Is a directory") }
        : file ? { file } : { error: pathError(verb, arg, error) });
    }
    return { type: "notes", notes, value: notes.findLast(({ file }) => file)?.file };
  }

  function execute(command, { cwd, previous, history }) {
    const [rawVerb] = command.split(/\s+/);
    const rawArgs = command.slice(rawVerb.length).trim();
    const [verb, aliasFlag] = (aliases.get(rawVerb.toLowerCase()) ?? rawVerb.toLowerCase()).split(" ");
    if (verb === "msg") return rawArgs ? { type: "draft", value: rawArgs } : usage(verb);
    if (writeCommands.has(verb)) return status(`${verb}: The portfolio filesystem is read-only.`);
    if (verb === "exit" || verb === "logout") return status("Close the tab to leave, or run jacobfetch to return to the profile.");
    if (!Object.hasOwn(commands, verb)) return status(`Command not found: ${rawVerb}. Try help.`);

    const variables = Object.assign(Object.create(null), {
      PWD: absolutePath(cwd), OLDPWD: previous == null ? "" : absolutePath(previous), HOME: "/", USER: "jacob",
    });
    const parsed = wordsFrom(rawArgs, variables);
    if (parsed.error) return status(parsed.error);
    const args = parsed.words.map(({ text }) => text);
    if (args.length === 1 && args[0] === "--help") return helpFor(rawVerb.toLowerCase());
    if (verb === "codex" || verb === "claude") return { type: "assistant", assistant: verb };
    if (verb === "help" || verb === "man") return args.length > 1 ? usage(verb) : helpFor(args[0]?.toLowerCase());
    if (verb === "echo") return status(args.join(" "));
    if (verb === "type") {
      if (!args.length) return usage(verb);
      return status(args.map((name) => {
        const alias = aliases.get(name);
        if (alias) return `${name} is an alias for ${alias}`;
        return Object.hasOwn(commands, name) ? `${name} is a portfolio command` : `${name} not found`;
      }).join("\n"));
    }
    if (verb === "history" && !args.length) return status(history.map((line, index) => `${index + 1}  ${line}`).join("\n"));

    if (verb === "cd") {
      if (args.length > 1) return usage(verb);
      const arg = args[0] ?? "~";
      if (arg === "-" && previous == null) return status("cd: No previous directory.");
      const { entry, error } = resolve(arg === "-" ? absolutePath(previous) : arg, cwd);
      if (!entry?.children) return status(pathError("cd", arg, error ?? "Not a directory"));
      return { type: "cd", path: entry.path, value: arg === "-" ? absolutePath(entry.path) : undefined };
    }

    if (verb === "ls" || verb === "cat" || verb === "open") {
      let flags = aliasFlag?.slice(1) ?? "";
      const operands = [];
      let options = true;
      for (const operand of parsed.words) {
        const { text } = operand;
        if (options && text === "--") {
          options = false;
          continue;
        }
        if (options && /^-./.test(text)) {
          if (verb !== "ls" || !/^-[1ACadFhlRr]+$/.test(text)) {
            return status(`${verb}: Unsupported option ${text}. Try help ${verb}.`);
          }
          flags += text.slice(1);
          continue;
        }
        options = false;
        const expanded = expand(operand, cwd);
        if (!expanded.length) return status(`${verb}: No matches for ${text}.`);
        operands.push(...expanded);
      }
      return verb === "ls" ? list(operands, flags, cwd) : read(verb, operands, cwd);
    }

    if (verb === "tree" || verb === "find") {
      const paths = [...args];
      const target = paths[0] && paths[0] !== "-name" ? paths.shift() : ".";
      const filter = verb === "find" && paths[0] === "-name" && paths.length === 2 ? paths[1] : undefined;
      if (paths.length && filter === undefined) return usage(verb);
      const { entry, error } = resolve(target, cwd);
      if (!entry) return status(pathError(verb, target, error));
      if (verb === "tree") return { type: "tree", entry, label: target };
      const lines = [];
      function visit(node, label) {
        if (filter === undefined || matchesPattern(node.name, filter)) lines.push(label);
        for (const child of node.children ?? []) visit(child, `${label.replace(/\/$/, "")}/${child.name}`);
      }
      visit(entry, target);
      return status(lines.join("\n"));
    }

    if (args.length) return usage(verb);
    if (verb === "pwd") return status(absolutePath(cwd));
    if (verb === "whoami") return status("jacob");
    return Object.hasOwn(sections, verb) ? { type: "note", value: verb } : { type: verb };
  }

  function complete(input, cwd) {
    const prefix = input.trimStart().toLowerCase().replace(/\s+/g, " ");
    const [verb] = prefix.split(" ");
    const [name] = (aliases.get(verb) ?? verb).split(" ");
    let candidates;
    if (!prefix.includes(" ")) {
      candidates = commandNames.map((key) => {
        const [command] = (aliases.get(key) ?? key).split(" ");
        return key + (commands[command][0].includes(" ") ? " " : "");
      });
    } else if (pathCommands.has(name)) {
      const start = prefix.slice(0, prefix.lastIndexOf(" ") + 1);
      const [parent] = splitAtSlash(prefix.slice(start.length));
      candidates = (resolve(parent, cwd).entry?.children ?? [])
        .filter((entry) => name !== "cd" || entry.children)
        .map((entry) => `${start}${parent}${entry.name}${entry.children ? "/" : ""}`);
    } else if (name === "help" || name === "man" || name === "type") {
      const start = prefix.slice(0, prefix.lastIndexOf(" ") + 1);
      candidates = commandNames.map((command) => start + command);
    }
    return { prefix, options: (candidates ?? []).filter((candidate) => candidate.startsWith(prefix)) };
  }

  function openFileCommand(file) {
    if (file === "profile") return "jacobfetch";
    const entry = byFile.get(file);
    return entry.children ? entry.path : `cat ${absolutePath(entry.path)}`;
  }

  return { commands, execute, complete, openFileCommand };
}
