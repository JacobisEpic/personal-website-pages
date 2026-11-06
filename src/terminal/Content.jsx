import portrait from "../assets/Headshot.png";
import { experiences } from "../constants";
import { labProjects } from "../constants/lab";

const email = "jacobchin.builds@gmail.com";
const contacts = [
  { name: "Email", label: email, href: `mailto:${email}`, icon: <path d="M2 4h12v8H2zM2 4l6 5 6-5" /> },
  { name: "GitHub", label: "github.com/JacobisEpic", href: "https://github.com/JacobisEpic", icon: <path d="M5.5 13.5c-1.5.4-2-.7-2.5-1.4m8 2v-2.3c0-.8-.3-1.2-.6-1.4 2-.2 3.7-1 3.7-4a3 3 0 0 0-.8-2c.1-.4.4-1.2-.1-2.1 0 0-.7-.2-2.2.8a8 8 0 0 0-5.9 0c-1.5-1-2.2-.8-2.2-.8-.5.9-.2 1.7-.1 2.1a3 3 0 0 0-.8 2c0 3 1.7 3.8 3.7 4-.3.2-.6.6-.6 1.4v2.3" /> },
  { name: "LinkedIn", label: "linkedin.com/in/jacob-chin", href: "https://www.linkedin.com/in/jacob-chin/", icon: <path d="M2 6v7m0-10v.3M6 13V6m0 2.5C6 5 13 5 13 9v4" /> },
];

const profile = [
  ["Base", "New York City"],
  ["Currently", "Technical Consultant @ Veeva"],
  ["Previously", "SWE @ Canonical (Ubuntu), SWE co-op @ Philips, SWE intern @ Medtronic"],
  ["Education", "Boston University · B.S. Computer Engineering + B.S. Biomedical Engineering"],
];

const projects = [
  {
    name: "TimeMaxx",
    detail: "iOS · React Native, TypeScript, SQLite",
    description: "An iPhone app that puts planned and actual time side by side, with one-tap capture and private, on-device storage.",
    links: [
      ["Project site", import.meta.env.BASE_URL + "timemaxx/"],
      ["App Store", "https://apps.apple.com/us/app/timemaxx/id6760919064"],
      ["Source code", "https://github.com/JacobisEpic/TimeMaxx"],
    ],
  },
  {
    name: "SmoothOperator",
    detail: "Robotics · BU Design Excellence Award",
    description: "An autonomous luggage assistant with a custom lifting platform, SLAM, and real-time obstacle avoidance.",
    links: [["Project site", "https://tinkerso.github.io/smoothoperator.github.io/"]],
  },
  {
    name: "AccessBU",
    detail: "Accessibility · BostonHacks track winner",
    description: "Accessible campus routing through talking crosswalks, with audio navigation and crowdsourced entrances.",
    links: [
      ["Devpost", "https://devpost.com/software/accessbu"],
      ["Source code", "https://github.com/Erichen294/AccessBU"],
    ],
  },
];

export const sections = {
  about: "Read my bio",
  work: "See where I’ve worked",
  education: "See what I studied",
  projects: "Explore what I’ve built",
  lab: "Browse notes from my side projects",
  interests: "See what I do away from work",
  contact: "Find me online",
};

export const fileNames = [...Object.keys(sections), ...labProjects.map(({ slug }) => slug)];

function CommandLink({ command, run, children = command }) {
  return <button className="command-link" type="button" onClick={(event) => run(command, event)}>{children}</button>;
}

export function Welcome({ run }) {
  return (
    <section className="screenfetch" aria-label="Profile">
      <header>
        <h1>Jacob Chin</h1>
        <p>Software engineer in NYC.</p>
      </header>
      <figure className="profile-portrait">
        <img src={portrait} width={560} height={614} alt="Portrait of Jacob Chin" />
      </figure>
      <dl className="profile-facts">
        {profile.map(([label, value]) => (
          <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
        ))}
      </dl>
      <nav className="social-links" aria-label="Social links">
        {contacts.map(({ name, href, icon }) => (
          <a key={name} href={href} aria-label={name} title={name}>
            <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
          </a>
        ))}
      </nav>
      <div className="welcome-hints">
        <p>Start with <CommandLink command="help" run={run} />, or try <CommandLink command="work" run={run} />, <CommandLink command="projects" run={run} />, or <CommandLink command="lab" run={run} />.</p>
        <p>Off the clock? <CommandLink command="interests" run={run} /></p>
      </div>
    </section>
  );
}

export function FileList({ names, run }) {
  return (
    <ul className="file-list">
      {names.map((name) => <li key={name}><CommandLink command={`cat ${name}.md`} run={run}>{name}.md</CommandLink></li>)}
    </ul>
  );
}

function Work() {
  return (
    <ul className="output-list">
      {experiences.map(({ company_name, date, title, points }) => (
        <li key={company_name}>
          <details>
            <summary><strong>{company_name}</strong> <span>{title} · {date}</span></summary>
            <ul>{points.map((point) => <li key={point}>{point}</li>)}</ul>
          </details>
        </li>
      ))}
    </ul>
  );
}

function Projects() {
  return (
    <ul className="output-list">
      {projects.map(({ name, detail, description, links }) => (
        <li key={name}>
          <h3>{name}</h3>
          <p className="muted">{detail}</p>
          <p>{description}</p>
          <div className="project-links">{links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</div>
        </li>
      ))}
    </ul>
  );
}

export function Note({ name, run }) {
  switch (name) {
    case "about":
      return (
        <>
          <p>I’m Jacob, a software engineer based in NYC. I’ve worked on Ubuntu’s systems management software, medical devices, and autonomous robotics.</p>
          <p>Outside work, I tinker with an espresso machine, play pick-up soccer, and keep notes on what I’m building.</p>
        </>
      );
    case "work":
      return <Work />;
    case "education":
      return (
        <>
          <p><strong>Boston University</strong> · Computer Engineering and Biomedical Engineering</p>
          <p>I served as president of the Biomedical Engineering Society and led DEI initiatives at Theta Tau, a professional engineering fraternity.</p>
        </>
      );
    case "projects":
      return <Projects />;
    case "lab":
      return (
        <>
          <p>Experiments in AI assistants, knowledge systems, espresso, and home networking.</p>
          <ul className="output-list">
            {labProjects.map(({ slug, title, description }) => (
              <li key={slug}>
                <h3><CommandLink command={`cat ${slug}.md`} run={run}>{title}</CommandLink></h3>
                <p>{description}</p>
              </li>
            ))}
          </ul>
        </>
      );
    case "interests":
      return (
        <ul className="interest-list">
          <li>Espresso, latte art, and tinkering with my Gaggia Classic Pro.</li>
          <li>Pick-up soccer, bowling one-handed, and learning ping pong.</li>
          <li>Running. I ran the calendar date in miles every day from January 1 through May 19, 2026.</li>
          <li>Tetris. I ranked in the top 2% worldwide for 40-line scores.</li>
          <li>Learning Chinese and playing piano. I played competitively for 10 years.</li>
        </ul>
      );
    case "contact":
      return (
        <dl className="profile-facts">
          {contacts.map(({ name: label, label: value, href }) => (
            <div key={label}><dt>{label}</dt><dd><a href={href}>{value}</a></dd></div>
          ))}
        </dl>
      );
    default: {
      const { title, intro, tags, sections: noteSections, links } = labProjects.find(({ slug }) => slug === name);
      return (
        <article className="lab-note">
          <h3>{title}</h3>
          <p className="muted">{tags.join(" · ")}</p>
          <p>{intro}</p>
          {noteSections.map(({ title: heading, paragraphs }) => (
            <section key={heading}>
              <h4>{heading}</h4>
              {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </section>
          ))}
          {links && <FileList names={links} run={run} />}
        </article>
      );
    }
  }
}

export function EmailDraft({ message }) {
  const href = `mailto:${email}?subject=Hello%20Jacob&body=${encodeURIComponent(message)}`;
  return <p><a href={href}>Open this draft in your email app</a> to send your message.</p>;
}
