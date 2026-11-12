import assert from "node:assert/strict";
import { test } from "node:test";

import { createShell, promptFor } from "./shell.js";

const shell = createShell([
  { file: "about" },
  { file: "lab", children: [{ file: "obsidian" }, { file: "hermes" }] },
  { file: "work", children: [{ file: "work/veeva" }] },
  { file: "profile" },
], { about: "Read my bio", work: "See where I worked", lab: "Browse notes" });

function session(terminal = shell) {
  let cwd = "";
  let previous = null;
  const history = [];
  return {
    run(command) {
      history.push(command);
      const result = terminal.execute(command, { cwd, previous, history });
      if (result.type === "cd") [cwd, previous] = [result.path, cwd];
      return result;
    },
    get prompt() { return promptFor(cwd); },
    complete(input) { return terminal.complete(input, cwd).options; },
  };
}

const labels = (listing, group = 0) => listing.groups[group].items.map(({ label }) => label);

test("cd changes the prompt and the working directory for ls, cat, and completion", () => {
  const sh = session();
  assert.deepEqual(labels(sh.run("ls")), ["about.md", "lab", "profile.md", "work"]);
  assert.equal(sh.run("cd lab").value, undefined);
  assert.equal(sh.prompt, "jacob@jacobchin ~/lab %");
  assert.equal(sh.run("pwd").value, "/lab");
  assert.deepEqual(labels(sh.run("ls")), ["hermes.md", "obsidian.md"]);
  assert.equal(sh.run("cat obsidian.md").value, "obsidian");
  assert.deepEqual(sh.complete("cat o"), ["cat obsidian.md"]);
  assert.deepEqual(sh.complete("cd ../w"), ["cd ../work/"]);
  assert.equal(sh.run("cd ..").path, "");
  assert.equal(sh.run("cd -").value, "/lab");
  assert.equal(sh.run("cd ~/work/").path, "work");
  assert.equal(sh.run("cd").path, "");
  assert.equal(sh.run("cd /lab").path, "lab");
  assert.equal(sh.run("clear").type, "clear");
  assert.equal(sh.run("pwd").value, "/lab");
});

test("bad paths and invalid options report errors without changing directories", () => {
  const sh = session();
  assert.match(sh.run("cd -").value, /No previous directory/);
  assert.match(sh.run("cd profile.md").value, /Not a directory/);
  assert.match(sh.run("cd missing/..").value, /No such file or directory/);
  assert.match(sh.run("cd profile.md/..").value, /Not a directory/);
  assert.equal(sh.run("pwd").value, "/");
  assert.match(sh.run("cat lab/").notes[0].error, /Is a directory/);
  assert.match(sh.run("ls profile.md/").errors[0], /Not a directory/);
  assert.match(sh.run("ls -z").value, /Unsupported option/);
  assert.match(sh.run("cat").value, /Usage:/);
  assert.match(sh.run('cd "lab').value, /Unclosed quote/);
  assert.match(sh.run("ls | grep lab").value, /unavailable/);
  assert.match(sh.run("touch new.md").value, /read-only/);
  assert.match(sh.run("rm -rf /").value, /read-only/);
  assert.match(sh.run("unknown").value, /Command not found/);
});

test("listing flags, globs, quoted paths, and multiple operands work together", () => {
  const sh = session();
  const listing = sh.run("ls -lah ~/lab");
  assert.equal(listing.layout, "long");
  assert.deepEqual(labels(listing), [".", "..", "hermes.md", "obsidian.md"]);
  assert.equal(sh.run("ls -1lC").layout, "columns");
  assert.deepEqual(labels(sh.run("ls -1r lab")), ["obsidian.md", "hermes.md"]);
  assert.deepEqual(labels(sh.run("ls -d work lab")), ["lab", "work"]);
  assert.deepEqual(labels(sh.run("ls *.md")), ["about.md", "profile.md"]);
  assert.deepEqual(sh.run("ls -R").groups.map(({ heading }) => heading), [".", "./lab", "./work"]);
  assert.equal(sh.run("ls work about.md").groups[1].heading, "work");
  assert.deepEqual(sh.run("cat lab/*.md").notes, [{ file: "hermes" }, { file: "obsidian" }]);
  assert.deepEqual(sh.run('cat "lab/obsidian.md" /about.md').notes, [{ file: "obsidian" }, { file: "about" }]);
  assert.equal(sh.run("cat obsidian.md").value, "obsidian");
  assert.equal(sh.run("cat lab.md").value, "lab");
  assert.equal(sh.run("cat profile.md").value, "profile");
  assert.equal(sh.run("find . -name 'ob?idian.md'").value, "./lab/obsidian.md");
  assert.equal(sh.run("tree lab").entry.children.length, 2);
});

test("help, command discovery, shortcuts, and the portfolio commands stay wired", () => {
  const sh = session();
  assert.equal(sh.run("help").type, "help");
  assert.equal(sh.run("man ls").value[0], "ls [flags] [path ...]");
  assert.equal(sh.run("cd --help").type, "manual");
  assert.match(sh.run("which ll ls unknown").value, /ll is an alias for ls -l\nls is a portfolio command\nunknown not found/);
  assert.equal(sh.run("ll").layout, "long");
  assert.deepEqual(labels(sh.run("la")).slice(0, 2), [".", ".."]);
  assert.equal(sh.run("less lab/obsidian.md").value, "obsidian");
  assert.equal(sh.run("more lab/obsidian.md").value, "obsidian");
  assert.equal(sh.run("open lab/obsidian.md").value, "obsidian");
  assert.equal(sh.run("whoami").value, "jacob");
  assert.equal(sh.run('echo "$USER $PWD"').value, "jacob /");
  assert.equal(sh.run("echo '$HOME'").value, "$HOME");
  assert.equal(sh.run("about").type, "note");
  assert.equal(sh.run("who").value, "about");
  assert.equal(sh.run("chdir lab").path, "lab");
  assert.equal(sh.run("jacobfetch").type, "jacobfetch");
  assert.equal(sh.run("home").type, "jacobfetch");
  assert.equal(sh.run("theme").type, "theme");
  assert.equal(sh.run("msg Hello & goodbye").value, "Hello & goodbye");
  assert.match(sh.run("history").value, /^1  help\n[\s\S]*\d+  history$/);
});

test("assistant commands return a prepared summary without changing the session", () => {
  const sh = session();
  sh.run("cd lab");
  for (const assistant of ["codex", "claude"]) {
    for (const command of [assistant, `${assistant} "summarize Jacob"`, `${assistant} -p "what does Jacob build?"`]) {
      assert.deepEqual(sh.run(command), { type: "assistant", assistant });
      assert.equal(sh.run("pwd").value, "/lab");
    }
    assert.equal(sh.run(`${assistant} --help`).type, "manual");
    assert.equal(sh.run(`man ${assistant}`).value[0], `${assistant} [prompt]`);
    assert.deepEqual(sh.complete(assistant.slice(0, 3)), [`${assistant} `]);
  }
});

test("renamed sections keep commands, legacy paths, and completion working", () => {
  const renamed = createShell([
    { file: "side-quests", children: [{ file: "obsidian" }] },
    { file: "fun-facts" },
  ], { "side-quests": "See what I’m tinkering with", "fun-facts": "Get to know me outside work" });
  const sh = session(renamed);
  assert.deepEqual(labels(sh.run("ls")), ["fun-facts.md", "side-quests"]);
  for (const command of ["side-quests", "sidequests", "lab"]) {
    assert.deepEqual(sh.run(command), { type: "note", value: "side-quests" });
  }
  for (const command of ["fun-facts", "funfacts", "interests"]) {
    assert.deepEqual(sh.run(command), { type: "note", value: "fun-facts" });
  }
  assert.equal(sh.run("cat interests.md").value, "fun-facts");
  assert.equal(sh.run("cat lab.md").value, "side-quests");
  assert.equal(sh.run("cat lab/obsidian.md").value, "obsidian");
  assert.deepEqual(sh.complete("cd si"), ["cd side-quests/"]);
  assert.deepEqual(sh.complete("cat lab/o"), ["cat lab/obsidian.md"]);
  assert.equal(sh.run("cd lab").path, "side-quests");
  assert.equal(sh.prompt, "jacob@jacobchin ~/side-quests %");
  assert.equal(sh.run("cat obsidian.md").value, "obsidian");
});

test("cd completion suggests directories, parent paths, home, and legacy folder names", () => {
  const terminal = createShell([
    { file: "about" },
    { file: "projects", children: [{ file: "projects/timemaxx" }] },
    { file: "side-quests", children: [
      { file: "obsidian" },
      { file: "networking", children: [{ file: "networking/config" }] },
    ] },
    { file: "work", children: [{ file: "work/veeva" }] },
  ], { about: "Bio", projects: "Projects", "side-quests": "Experiments", work: "Work" });
  const sh = session(terminal);
  assert.deepEqual(sh.complete("cd"), ["cd "]);
  assert.deepEqual(sh.complete("cd "), ["cd projects/", "cd side-quests/", "cd work/"]);
  assert.deepEqual(sh.complete("cd s"), ["cd side-quests/"]);
  assert.deepEqual(sh.complete("cd ."), ["cd ./", "cd ../"]);
  assert.deepEqual(sh.complete("cd .."), ["cd ../"]);
  assert.deepEqual(sh.complete("cd ~"), ["cd ~/"]);
  assert.deepEqual(sh.complete("cd ~/s"), ["cd ~/side-quests/"]);
  assert.deepEqual(sh.complete("cd /w"), ["cd /work/"]);
  assert.deepEqual(sh.complete("cd lab"), ["cd lab/"]);
  assert.deepEqual(sh.complete("chdir si"), ["chdir side-quests/"]);
  sh.run("cd side-quests");
  assert.deepEqual(sh.complete("cd "), ["cd networking/"]);
  assert.deepEqual(sh.complete("cd ../w"), ["cd ../work/"]);
  assert.deepEqual(sh.complete("cd networking/"), []);
  assert.deepEqual(sh.complete("cat networking/c"), ["cat networking/config.md"]);
  assert.deepEqual(sh.complete("cd missing"), []);
});
