import portrait from "../assets/jacob-profile.jpg";
import { experiences } from "../constants";
import { labProjects } from "../constants/lab";
import { absolutePath, createShell } from "./shell";
import PiHoleDiagram from "./PiHoleDiagram";

const email = "jacobchin.builds@gmail.com";
const contacts = [
  { name: "Email", label: email, href: `mailto:${email}`, icon: <path d="M2 4h12v8H2zM2 4l6 5 6-5" /> },
  { name: "LinkedIn", label: "linkedin.com/in/jacob-chin", href: "https://www.linkedin.com/in/jacob-chin/", icon: <path d="M2 6v7m0-10v.3M6 13V6m0 2.5C6 5 13 5 13 9v4" /> },
  { name: "GitHub", label: "github.com/JacobisEpic", href: "https://github.com/JacobisEpic", icon: <path d="M5.5 13.5c-1.5.4-2-.7-2.5-1.4m8 2v-2.3c0-.8-.3-1.2-.6-1.4 2-.2 3.7-1 3.7-4a3 3 0 0 0-.8-2c.1-.4.4-1.2-.1-2.1 0 0-.7-.2-2.2.8a8 8 0 0 0-5.9 0c-1.5-1-2.2-.8-2.2-.8-.5.9-.2 1.7-.1 2.1a3 3 0 0 0-.8 2c0 3 1.7 3.8 3.7 4-.3.2-.6.6-.6 1.4v2.3" /> },
];

const currentRole = { title: "Technical Consultant", company: "Veeva" };
const currentWork = `${currentRole.title} @ ${currentRole.company}`;
const workNotes = [
  { company_name: currentRole.company, title: currentRole.title, date: "Current", points: ["Currently onboarding :)"] },
  ...experiences,
].map((role) => ({
  ...role,
  file: `work/${role.company_name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "")}`,
}));
const featuredEmployers = new Set([currentRole.company, "Canonical (Ubuntu)", "Philips", "Medtronic"]);
const featuredWorkNotes = workNotes.filter(({ company_name }) => featuredEmployers.has(company_name));
const olderWorkNotes = workNotes.filter(({ company_name }) => !featuredEmployers.has(company_name));

function workTreeEntry({ company_name, file }) {
  return { label: company_name.split(" - ")[0], file };
}

const olderRolesFolder = {
  label: "Older Roles",
  file: "work/older-roles",
  children: olderWorkNotes.map(workTreeEntry),
};

const profile = [
  ["Base", "New York City"],
  ["Currently", currentWork],
  ["Previously", "SWE @ Canonical (Ubuntu)", "SWE co-op @ Philips", "SWE intern @ Medtronic"],
  ["Education", "Boston University", "B.S. Computer Engineering", "B.S. Biomedical Engineering"],
];

const projects = [
  {
    name: "TimeMaxx",
    file: "projects/timemaxx",
    detail: "iOS · React Native, TypeScript, SQLite",
    description: "An iPhone app that puts planned and actual time side by side, with one-tap capture and private, on-device storage.",
    links: [["App Store", "https://apps.apple.com/us/app/timemaxx/id6760919064"]],
  },
  {
    name: "SmoothOperator",
    file: "projects/smoothoperator",
    detail: "BU Senior Design 2025 · Design Excellence Award",
    summary: "A luggage robot designed to help travelers with limited mobility move through airports more independently.",
    description: "SmoothOperator helps travelers with limited mobility transport luggage through airports. The prototype scans a boarding pass to select a destination, then uses ROS and LiDAR to navigate around obstacles. A custom lift can raise and carry up to 80 pounds of luggage, and travelers can operate it from the onboard touchscreen or take manual control through a mobile app.",
    links: [["Project site", "https://tinkerso.github.io/smoothoperator.github.io/"]],
  },
  {
    name: "SpaceQuest",
    file: "projects/spacequest",
    detail: "BostonHacks 2024 · 1st place, Comet Care track",
    summary: "Games that help astronauts stay connected with loved ones on long missions.",
    description: "SpaceQuest was designed to help astronauts on long missions stay connected with family and friends on Earth. Players can take turns in iSpy, Trivia, and Jigsaw Puzzle on their own schedules, giving them something to do together even when they can’t be online at the same time.",
    links: [
      ["Devpost", "https://devpost.com/software/test-vi7k1g"],
      ["Source code", "https://github.com/JacobisEpic/SpaceQuest"],
    ],
  },
  {
    name: "AccessBU",
    file: "projects/accessbu",
    detail: "BostonHacks 2023 · 1st place, Inclusive Innovation track",
    summary: "Campus directions that account for hills, audible crosswalk signals, and accessible entrances.",
    description: "AccessBU was designed to make Boston University’s campus easier and safer to navigate for people with mobility or vision impairments. It uses Dijkstra’s algorithm to find routes that account for elevation and audible crosswalk signals, then sends those waypoints and an accessible entrance to Google Maps for turn-by-turn directions. We mapped campus access points by hand, and users can add new ones for future routes.",
    links: [
      ["Devpost", "https://devpost.com/software/accessbu"],
      ["Source code", "https://github.com/Erichen294/AccessBU"],
    ],
  },
];

export const sections = {
  about: "Read my bio",
  work: "See where I’ve worked",
  [olderRolesFolder.file]: "Browse older roles",
  projects: "Explore what I’ve built",
  "side-quests": "See what I’m tinkering with",
  "fun-facts": "Get to know me outside work",
  contact: "Find me online",
};

export const fileNames = [
  ...Object.keys(sections),
  ...workNotes.map(({ file }) => file),
  ...projects.map(({ file }) => file),
  ...labProjects.map(({ slug }) => slug),
];

export const portfolioTree = [
  { label: "Profile", file: "profile" },
  { label: "About", file: "about" },
  {
    label: "Work",
    file: "work",
    children: [...featuredWorkNotes.map(workTreeEntry), olderRolesFolder],
  },
  {
    label: "Projects",
    file: "projects",
    children: projects.map(({ name, file }) => ({ label: name, file })),
  },
  {
    label: "Side Quests",
    file: "side-quests",
    children: labProjects.map(({ title, slug }) => ({ label: title, file: slug })),
  },
  { label: "Fun Facts", file: "fun-facts" },
  { label: "Contact", file: "contact" },
];

export const shell = createShell(portfolioTree, sections);

function CommandLink({ command, run, children = command }) {
  return <button className="command-link" type="button" onClick={(event) => run(command, event)}>{children}</button>;
}

function OutboundLink({ href, children, ...props }) {
  const website = !/^(?:mailto:|tel:|#)/i.test(href);
  return (
    <a {...props} href={href} target={website ? "_blank" : undefined} rel={website ? "noopener noreferrer" : undefined}>
      {children}
    </a>
  );
}

export function SocialLinks() {
  return (
    <nav className="social-links" aria-label="Social links">
      {contacts.map(({ name, href, icon }) => (
        <OutboundLink key={name} href={href} aria-label={name} title={name}>
          <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
        </OutboundLink>
      ))}
    </nav>
  );
}

export function Welcome({ run }) {
  return (
    <section className="screenfetch" aria-label="Profile">
      <header>
        <h1>Jacob Chin</h1>
        <p>Engineer in NYC</p>
      </header>
      <figure className="profile-portrait">
        <img src={portrait} width={1893} height={1930} alt="Portrait of Jacob Chin" />
      </figure>
      <dl className="profile-facts">
        {profile.map(([label, ...lines]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{lines.map((line) => <div key={line}>{line}</div>)}</dd>
          </div>
        ))}
      </dl>
      <div className="welcome-hints">
        <p>Start with <CommandLink command="help" run={run} />, or try <CommandLink command="work" run={run} />, <CommandLink command="projects" run={run} />, or <CommandLink command="side-quests" run={run} />.</p>
        <p>Off the clock? <CommandLink command="fun-facts" run={run} /></p>
      </div>
    </section>
  );
}

export function AssistantSummary({ assistant, cwd, run }) {
  const isClaude = assistant === "claude";
  const name = isClaude ? "Claude Code" : "OpenAI Codex";
  const shortName = isClaude ? "Claude" : "Codex";
  const directory = cwd ? `~/${cwd}` : "~";

  return (
    <section className="assistant-response" data-assistant={assistant} aria-label={`${name} prepared summary`}>
      {isClaude ? (
        <header className="assistant-banner claude-banner">
          <pre className="claude-mascot" aria-hidden="true">{" ▐▛███▛█\n▝▜██████▀\n  ▝▝ ▝▝"}</pre>
          <div className="assistant-cli-info">
            <div className="assistant-cli-title"><strong>Claude Code</strong><span className="muted">portfolio edition</span></div>
            <div className="muted">0 tokens used · prewritten</div>
            <div className="assistant-directory">{directory}</div>
          </div>
        </header>
      ) : (
        <header className="assistant-banner codex-banner">
          <div className="assistant-cli-title"><strong><span aria-hidden="true">&gt;_ </span>OpenAI Codex</strong><span className="muted">(portfolio edition)</span></div>
          <dl className="assistant-cli-details">
            <div><dt>model:</dt><dd>prewritten</dd></div>
            <div><dt>directory:</dt><dd className="assistant-directory">{directory}</dd></div>
          </dl>
        </header>
      )}
      <p>Haha, I can't afford free {shortName} for everyone in my terminal. But you probably wanted a summary of me, so here's one I prepared earlier.</p>
      <div className="assistant-summary">
        <p><span className="assistant-bullet" aria-hidden="true">{isClaude ? "⏺" : "•"}</span><strong>Jacob Chin, in a few lines:</strong></p>
        <p>Jacob is a software engineer with high agency and strong ownership. A Boston University graduate with a double major in Computer Engineering and Biomedical Engineering, he thrives at the intersection of software and real-world problem solving.</p>
        <p>His experience spans medical technology, autonomous robotics, and open-source software. He's served as President of the Biomedical Engineering Society, led DEI initiatives at Theta Tau, and won BostonHacks back to back.</p>
        <p>A hobbyist at heart: experimenting with his espresso setup, pickup soccer, one-handed bowling, piano since age 6, Tetris, and learning Chinese. Based in NJ/NYC and open to opportunities in NYC.</p>
      </div>
      <p className="assistant-links">Go deeper: <CommandLink command="work" run={run} /> · <CommandLink command="projects" run={run} /> · <CommandLink command="fun-facts" run={run} /></p>
    </section>
  );
}

function FileList({ names, run }) {
  return (
    <ul className="file-list">
      {names.map((name) => <li key={name}><CommandLink command={shell.openFileCommand(name)} run={run}>{name}.md</CommandLink></li>)}
    </ul>
  );
}

function ShellEntryLink({ entry, label, run }) {
  const path = absolutePath(entry.path);
  const name = entry.children && label !== "." && label !== ".." && !label.endsWith("/") ? label + "/" : label;
  return (
    <CommandLink command={entry.children ? `ls ${path}` : `cat ${path}`} run={run}>
      {name}
    </CommandLink>
  );
}

export function DirectoryListing({ groups, layout, errors, run }) {
  return (
    <>
      {errors.map((error, index) => <p key={index}>{error}</p>)}
      {groups.map(({ heading, items }, index) => {
        const columnWidth = Math.max(16, ...items.map(({ label, entry }) => label.length + Number(Boolean(entry.children))));
        return (
          <div className="listing-group" key={index}>
            {heading && <p>{heading}:</p>}
            <ul className={`file-list directory-list ${layout}`} style={{ "--file-column": `${columnWidth}ch` }}>
              {items.map(({ entry, label }, index) => (
                <li key={index} className={entry.children ? "directory-entry" : undefined}>
                  {layout === "long" && <span className="file-mode">{entry.children ? "dr-xr-xr-x" : "-r--r--r--"}{"  "}</span>}
                  <ShellEntryLink entry={entry} label={label} run={run} />
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </>
  );
}

export function DirectoryTree({ entry, label, run }) {
  const rows = [{ entry, label, stem: "" }];
  function append(children, indent) {
    children.forEach((child, index) => {
      const last = index === children.length - 1;
      rows.push({ entry: child, label: child.name, stem: indent + (last ? "└── " : "├── ") });
      if (child.children) append(child.children, indent + (last ? "    " : "│   "));
    });
  }
  if (entry.children) append(entry.children, "");
  return (
    <ul className="file-list directory-list single shell-tree">
      {rows.map(({ entry, label, stem }) => (
        <li key={entry.path} className={entry.children ? "directory-entry" : undefined}>
          <span aria-hidden="true">{stem}</span><ShellEntryLink entry={entry} label={label} run={run} />
        </li>
      ))}
    </ul>
  );
}

export function PortfolioTree({ nodes = portfolioTree, current, select, selectFolder, onFolderToggle }) {
  return (
    <ul className="tree-branches">
      {nodes.map(({ label, file, children }) => (
        <li key={file}>
          {children ? (
            <details onToggle={onFolderToggle}>
              <summary
                className="tree-row"
                aria-current={current === file ? "true" : undefined}
                onClick={() => selectFolder?.(file)}
              >
                <span className="tree-chevron" aria-hidden="true">▸</span>{label}
              </summary>
              <PortfolioTree
                nodes={children}
                current={current}
                select={select}
                selectFolder={selectFolder}
                onFolderToggle={onFolderToggle}
              />
            </details>
          ) : (
            <button
              className="tree-row"
              type="button"
              aria-current={current === file ? "true" : undefined}
              onClick={() => select(file)}
            >
              {label}
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

function ExperiencePoints({ points }) {
  return <ul className="experience-points">{points.map((point) => <li key={point}>{point}</li>)}</ul>;
}

function Work({ roles, run, showOlderRoles = false }) {
  return (
    <ul className="output-list">
      {roles.map(({ company_name, date, title, file }) => (
        <li key={file}>
          <h3><CommandLink command={shell.openFileCommand(file)} run={run}>{company_name}</CommandLink></h3>
          <p>{title} · {date}</p>
        </li>
      ))}
      {showOlderRoles && (
        <li>
          <h3>
            <CommandLink command={shell.openFileCommand(olderRolesFolder.file)} run={run}>
              {olderRolesFolder.label}
            </CommandLink>
          </h3>
        </li>
      )}
    </ul>
  );
}

function ProjectDetails({ project }) {
  const { detail, description, links } = project;
  return (
    <>
      <p className="muted">{detail}</p>
      <p>{description}</p>
      <div className="project-links">{links.map(([label, href]) => <OutboundLink key={href} href={href}>{label}</OutboundLink>)}</div>
    </>
  );
}

function Projects({ run }) {
  return (
    <>
      <p>A few things I’ve built.</p>
      <ul className="output-list">
        {projects.map(({ name, file, description, summary = description }) => (
          <li key={file}>
            <h3><CommandLink command={shell.openFileCommand(file)} run={run}>{name}</CommandLink></h3>
            <p>{summary}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

function NoteText({ text }) {
  if (typeof text === "string") return text;
  if (Array.isArray(text)) return text.map((part, index) => <NoteText key={index} text={part} />);
  if (text.href) return <OutboundLink href={text.href}>{text.label}</OutboundLink>;
  return <code>{text.code}</code>;
}

function NoteComparison({ comparison }) {
  return (
    <div className="note-table-scroll" role="region" aria-label={comparison.label} tabIndex={0}>
      <table className="note-comparison" aria-label={comparison.label}>
        <thead><tr>{comparison.columns.map((column) => <th scope="col" key={column}>{column}</th>)}</tr></thead>
        <tbody>
          {comparison.rows.map(([label, ...values]) => (
            <tr key={label}>
              <th scope="row">{label}</th>
              {values.map((value, index) => <td key={index}><NoteText text={value} /></td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LabNote({ project, run }) {
  const { title, intro, tags, image, sections: noteSections, links } = project;
  return (
    <article className="lab-note">
      <h3>{title}</h3>
      <p className="muted">{tags.join(" · ")}</p>
      {image && (
        <img
          className="lab-note-image"
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          decoding="async"
        />
      )}
      <p><NoteText text={intro} /></p>
      {noteSections.map(({ title: heading, paragraphs = [], commands, diagram, comparison, after = [] }) => (
        <section key={heading}>
          <h4>{heading}</h4>
          {paragraphs.map((paragraph, index) => <p key={index}><NoteText text={paragraph} /></p>)}
          {commands && (
            <dl className="note-commands">
              {commands.map(({ name, description }) => (
                <div key={name}><dt><code>{name}</code></dt><dd>{description}</dd></div>
              ))}
            </dl>
          )}
          {diagram === "pi-hole-dns" && <PiHoleDiagram />}
          {comparison && <NoteComparison comparison={comparison} />}
          {after.map((paragraph, index) => <p key={index}><NoteText text={paragraph} /></p>)}
        </section>
      ))}
      {links && <FileList names={links} run={run} />}
    </article>
  );
}

export function Note({ name, run }) {
  switch (name) {
    case "about":
      return (
        <>
          <p>Hi! I'm Jacob Chin, a Boston University graduate with a double major in <OutboundLink href="https://www.bu.edu/eng/academics/resources/undergraduate-student-resources/double-majors-in-engineering/">Computer Engineering and Biomedical Engineering</OutboundLink>.</p>
          <p>I'm an engineer by background and a hobbyist at heart. I've worked on everything from medical technology to autonomous robotics and open-source software. These days, I'm exploring the people side of tech through technical consulting. I still love building things, but I also want to challenge myself in ways that go beyond writing code.</p>
          <p>Outside of work, I'm always picking up new hobbies or going way too deep into existing ones. Whether it's tinkering with my espresso setup, playing soccer, bowling, ping pong, or exploring music and games, I love trying new things. Above all, I value making the most of my time, meeting interesting people, and building meaningful friendships.</p>
          <p>Based in New York City. Always happy to connect!</p>
          <p><a href={`mailto:${email}`}>{email}</a></p>
        </>
      );
    case "work":
      return <Work roles={featuredWorkNotes} run={run} showOlderRoles />;
    case olderRolesFolder.file:
      return <Work roles={olderWorkNotes} run={run} />;
    case "projects":
      return <Projects run={run} />;
    case "side-quests":
      return (
        <>
          <p>Things I’m building, tinkering, and figuring out in my spare time.</p>
          <ul className="output-list">
            {labProjects.map(({ slug, title, description }) => (
              <li key={slug}>
                <h3><CommandLink command={shell.openFileCommand(slug)} run={run}>{title}</CommandLink></h3>
                <p>{description}</p>
              </li>
            ))}
          </ul>
        </>
      );
    case "fun-facts":
      return (
        <ul className="interest-list">
          <li>I modded my Gaggia Classic Pro to track espresso brewing data.</li>
          <li>I love playing pickup soccer.</li>
          <li>I bowl one-handed, with a 194 average and a high of 276. I once threw 14 strikes in a row across two games.</li>
          <li>I enjoy playing ping pong.</li>
          <li>I ran the calendar date in miles every day from January 1 through May 19, 2026.</li>
          <li>I'm in the global top 2% for Tetris 40 lines on TETR.IO.</li>
          <li>I'm learning Chinese on Duolingo, with a 300+ day streak.</li>
          <li>I've played piano since age 6 and competed for 10 years.</li>
        </ul>
      );
    case "contact":
      return (
        <dl className="profile-facts">
          {contacts.map(({ name: label, label: value, href }) => (
            <div key={label}><dt>{label}</dt><dd><OutboundLink href={href}>{value}</OutboundLink></dd></div>
          ))}
        </dl>
      );
    default: {
      const role = workNotes.find(({ file }) => file === name);
      if (role) {
        return (
          <article className="lab-note">
            <h3>{role.company_name}</h3>
            <p className="muted">{role.title} · {role.date}</p>
            {role.points.length > 0 && <ExperiencePoints points={role.points} />}
          </article>
        );
      }

      const selectedProject = projects.find(({ file }) => file === name);
      if (selectedProject) {
        return (
          <article className="lab-note">
            <h3>{selectedProject.name}</h3>
            <ProjectDetails project={selectedProject} />
          </article>
        );
      }

      const project = labProjects.find(({ slug }) => slug === name);
      return <LabNote project={project} run={run} />;
    }
  }
}

export function EmailDraft({ message }) {
  const href = `mailto:${email}?subject=Hello%20Jacob&body=${encodeURIComponent(message)}`;
  return <p><a href={href}>Open this draft in your email app</a> to send your message.</p>;
}
