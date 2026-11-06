export const labProjects = [
  {
    slug: "hermes",
    title: "Hermes AI Assistant",
    description: "A personal AI assistant I manage through Discord to organize information and try useful automations.",
    intro: "Hermes is where I experiment with what a personal AI assistant can actually help with in everyday life.",
    tags: ["AI", "Discord", "Automation", "macOS"],
    links: ["obsidian"],
    sections: [
      {
        title: "Why I built it",
        paragraphs: ["I wanted one place to try small AI workflows without turning every idea into a separate app. Discord gives me a familiar interface for talking to the assistant and checking what it is doing."],
      },
      {
        title: "How I use it",
        paragraphs: ["I run and manage Hermes on my Mac. I use it for scheduled jobs, information gathering, and stock research, and I experiment with model configuration and tool integrations. I am also exploring how it can work with the notes in my Obsidian knowledge system."],
      },
      {
        title: "What I learned",
        paragraphs: ["I tried applying an agent to apartment searching. Existing apartment platforms already have useful filters and discovery tools, and adding AI did not clearly improve the search. It was a good reminder that deciding when not to automate is part of building useful tools."],
      },
    ],
  },
  {
    slug: "obsidian",
    title: "Obsidian PKMS",
    description: "A personal knowledge system built around Obsidian, Markdown, Git, and AI-assisted analysis.",
    intro: "Obsidian on my Mac is my primary knowledge tool and the place where I keep the notes and systems I return to across work, learning, and daily life.",
    tags: ["Obsidian", "Markdown", "Git", "AI"],
    links: ["hermes", "gaggimate"],
    sections: [
      {
        title: "Why I built it",
        paragraphs: ["I wanted my notes available on my Mac and phone without paying for cloud sync or keeping a home server running. Version-controlling the vault with Git gives me a relatively simple foundation without building an elaborate synchronization system."],
      },
      {
        title: "How I use it",
        paragraphs: ["The vault covers AI setups and workflows, Hermes Agent HQ, Obsidian documentation, recruiting and career planning, technical study, startup ideas, goals, to-do lists, and general reflections. I also keep exercise routines, logs, and progress, along with AI-assisted analysis to spot weaknesses. GaggiMate modifications and troubleshooting have a home there too."],
      },
      {
        title: "Why Markdown matters",
        paragraphs: ["Plain Markdown files stay readable outside any one app. They are useful to me now and leave room for AI agents to access and analyze the information later, when that is genuinely helpful."],
      },
    ],
  },
  {
    slug: "gaggimate",
    title: "GaggiMate Espresso Mod",
    description: "Tinkering with a Gaggia Classic Pro to explore more control over espresso brewing.",
    intro: "Espresso is a hands-on hobby for me, and modifying a machine is a natural excuse to learn more about what changes a shot.",
    tags: ["GaggiMate", "Espresso", "Hardware", "Data"],
    sections: [
      {
        title: "Why modify the machine?",
        paragraphs: ["I was curious how much more I could learn from an espresso machine I already owned. GaggiMate adds a hardware and software layer to the Gaggia Classic Pro so I can experiment with brewing behavior instead of treating every shot as a black box."],
      },
      {
        title: "Experiments and troubleshooting",
        paragraphs: ["I have been trying shot profiles and extraction parameters, then collecting and reviewing shot data to understand the results. Inconsistent yields have also led me to investigate possible mechanical issues, including a leaking steam valve."],
      },
      {
        title: "What I am learning",
        paragraphs: ["Hands-on hardware work is a useful reminder that a graph is only part of the story. Small changes to the physical setup can matter, and troubleshooting takes patience before drawing conclusions."],
      },
    ],
  },
  {
    slug: "pi-hole",
    title: "Docker Pi-hole",
    description: "An experiment in DNS-level ad blocking with Docker and an old laptop turned home server.",
    intro: "Pi-hole started as a practical way to learn what happens between a device, a DNS server, and the rest of the internet.",
    tags: ["Pi-hole", "Docker Compose", "Ubuntu", "DNS", "SSH"],
    sections: [
      {
        title: "The setup",
        paragraphs: ["I repurposed an old Lenovo laptop running Ubuntu as a home server, deployed Pi-hole with Docker Compose, and set up SSH for remote access. The project gave me a reason to learn more about DNS and network-level ad blocking."],
      },
      {
        title: "What I tested",
        paragraphs: ["I compared router-level and device-level DNS configuration, tested whether blocking worked, and ran into network reliability issues that needed troubleshooting. I also experimented with running Pi-hole locally on my Mac through Docker Desktop instead of maintaining an always-on server."],
      },
      {
        title: "What stuck with me",
        paragraphs: ["A home network experiment has to fit how I actually use my devices. This project has been as much about learning the tradeoffs of each setup as it has been about blocking ads."],
      },
    ],
  },
];
