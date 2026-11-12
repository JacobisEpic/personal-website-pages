import gaggimatePhoto from "../assets/gaggimate-espresso.png";

export const labProjects = [
  {
    slug: "gaggimate",
    title: "GaggiMate Espresso Mod",
    image: {
      src: gaggimatePhoto,
      alt: "Collage of the red Gaggia Classic Pro with the GaggiMate display, internal wiring, shot graphs, and a latte.",
      width: 1003,
      height: 1063,
    },
    description: "Modifying my Gaggia Classic Pro with GaggiMate Pro, then using shot telemetry to investigate inconsistent espresso.",
    intro: [
      "I am deeply into coffee, and modifying my espresso machine was a natural next step. I installed ",
      { label: "GaggiMate Pro", href: "https://github.com/jniebuhr/gaggimate" },
      " on my Gaggia Classic Pro to get more control over brewing and see what was happening during a shot. It became a mix of hardware work, local networking, and data-driven troubleshooting.",
    ],
    tags: ["GaggiMate Pro", "Gaggia Classic Pro", "Hardware", "PID", "JSON", "mDNS"],
    sections: [
      {
        title: "1. From maintenance to modification",
        paragraphs: [
          "Before the mod, I was already making espresso and lattes for myself, roommates, friends, and family. When bitter shots and uneven water flow pointed toward scale buildup, I researched the problem, disassembled and cleaned parts of the machine, and got the flow and coffee quality back.",
          "That made me more comfortable working on the Gaggia. I started researching Gaggiuino in 2025, then compared it with GaggiMate in 2026. I wanted more visibility into temperature, pressure, and extraction profiles, with a setup I could install and maintain myself.",
          "I chose a consolidated GaggiMate Pro kit because I wanted to focus on the modification instead of sourcing every connector and component separately. Buying the kit simplified procurement, but the installation still took plenty of troubleshooting.",
        ],
      },
      {
        title: "2. Opening the machine",
        paragraphs: [
          "I worked through the installation in late August 2026 on a Cherry Red Gaggia Classic Pro RI9380/47, the 120V US model. That detail mattered: some of the switch wiring differed from the diagrams I was following.",
          "The work involved the original switches, thermostat connections, controller wiring, pump, and plumbing. The steam valve was difficult to remove and had buildup to clean out. Thermostat spade connectors and the pump's overpressure-valve assembly were stubborn too.",
          "First startup brought more debugging: a pump running without the expected water output, brew and steam inputs being interpreted in reverse, and later a black display with a suspected loose connection. Once the controller was working, I could move on to water-flow and temperature tests.",
        ],
      },
      {
        title: "3. A working controller, then a nearly empty cup",
        paragraphs: [
          "Wi-Fi setup worked after switching to a 2.4 GHz network. I could then use the device's locally hosted interface, check readings, and experiment with profiles. Water tests showed roughly 10 g/s of free flow and around 1 bar during flushing, with temperature responding and recovering after the flush.",
          "My first espresso shot produced just 0.6 g in about 30 seconds. I tried grind adjustments, different doses, removing the puck screen, and Medium-style profiles. A later test produced 25.4 g from a 15 g dose, but repeatability still needed work.",
          "Getting the controller running and dialing in coffee were two separate problems. More control gave me more variables to understand, and the grinder, puck preparation, dose, and profile still had to work together.",
        ],
      },
      {
        title: "4. Turning shots into a debugging record",
        paragraphs: [
          "By October 5, the machine had recorded 68 shots since August 26. I could review temperature, pressure, flow, estimated water volume, duration, and profile information, then inspect the JSON data when results looked odd. My most-used profile was Medium 15g 1:2.",
          "I did not have a Bluetooth scale connected, so the recorded weight field was unavailable or zero. I weighed the espresso separately. Estimated water volume from the machine and the actual mass in my cup were different measurements.",
          "The most useful comparisons were shots that should have been similar. On October 7, shots 75 and 77 produced 16.7 g and 36.8 g even though I reported the same grind setting and preparation. That was a 20.1 g difference to investigate.",
        ],
        comparison: {
          label: "Manually measured espresso yields from October 7, 2026",
          columns: ["Shot", "Measured yield", "Recorded context"],
          rows: [
            ["72", "24.1 g", "Grind setting 3.8"],
            ["74", "41.0 g", "Grind setting 3.9"],
            ["75", "16.7 g", "Same reported grind and preparation as shot 77"],
            ["77", "36.8 g", "Same reported grind and preparation as shot 75"],
          ],
        },
      },
      {
        title: "5. Following the evidence",
        paragraphs: [
          "Similar pressure could coexist with different flow and yield. I considered puck resistance, grind variation, retention, channeling, priming, temperature, and a steam valve that had been leaking. The available data did not isolate a single root cause.",
          "I considered an OEM replacement and a serviceable valve, but did not record a completed repair. The machine was operational and brewing in my last detailed tests, with the consistency investigation still open.",
        ],
      },
      {
        title: "The technology, piece by piece",
        comparison: {
          label: "Hardware and software in my GaggiMate setup",
          columns: ["Component", "Role in the project"],
          rows: [
            ["Gaggia Classic Pro RI9380/47", "120V US machine that I maintained and modified"],
            ["GaggiMate Pro", "Controller, display, brewing profiles, and recorded shot data"],
            ["PID temperature control", "Brew temperature target and feedback"],
            ["Pressure and flow telemetry", "Readings to compare how extractions behaved"],
            ["2.4 GHz Wi-Fi + mDNS", ["Local interface at ", { code: "gaggimate.local" }, ", hosted on the device itself"]],
            ["JSON shot records + separate scale", "Time-series data alongside manually measured beverage yields"],
          ],
        },
      },
      {
        title: "Why I keep tinkering with it",
        paragraphs: [
          "The project took me from maintaining an appliance to understanding more of its wiring, plumbing, embedded interface, and network behavior. Learning how the .local address worked was another small connection between the coffee machine and the software systems I enjoy building.",
          "I like that the results are physical. A graph can suggest where to look, but I still need to check the machine and measure what ends up in the cup. The extra data helps me ask better questions and run more deliberate experiments.",
        ],
      },
    ],
  },
  {
    slug: "hermes",
    title: "Hermes AI Assistant",
    description: "A Mac-hosted agent with Discord workflows, scheduled research, and an iMessage bot called JacobBot.",
    intro: [
      "I started experimenting with ",
      { label: "Hermes Agent", href: "https://github.com/NousResearch/hermes-agent" },
      " because I wanted to see what an AI assistant could actually do with tools, local files, and recurring tasks. It grew into a collection of personal automations, plus an iMessage bot that taught me a lot about permissions and reliability.",
    ],
    tags: ["Hermes Agent", "Discord", "Python", "SQLite", "BlueBubbles", "macOS"],
    links: ["obsidian"],
    sections: [
      {
        title: "1. Giving an agent somewhere to live",
        paragraphs: [
          "I was already using Codex for development and experimenting with local models through Ollama. Hermes caught my attention in September 2026 because I wanted to try an agent that could handle recurring work without me starting every interaction.",
          "I configured it on my existing Mac and created a private Discord bot, with channels for apartments, investing, coding, alerts, and logs. That gave me a familiar way to interact with it from my phone. I also tried different model configurations, eventually using Codex as the primary option with Claude as a fallback.",
          "Hosting the agent locally gave it access to the tools and files I was already using. It also meant availability depended on my laptop being awake, connected, and running the gateway.",
        ],
      },
      {
        title: "2. An apartment scout with an approval step",
        paragraphs: [
          "Apartment hunting was an early use case: find relevant listings, remember what had already appeared, and surface new options in Discord. I built a workflow around browser discovery, SQLite for listing state and deduplication, and a proposed Gmail alert connection.",
          "Discovery and outreach were separate steps. The agent could prepare an inquiry with the exact recipient visible, but contacting someone required my approval. I also added protections against duplicate sends.",
          "The prototype passed 19 tests and a dry run that took a synthetic listing through ingestion, deduplication, approval, and message preparation. The scheduled scout stayed paused, Gmail was not connected, and the demonstration sent no real inquiry. Existing apartment platforms also had good search tools, so I kept questioning how much value the AI layer added.",
        ],
      },
      {
        title: "3. Scheduled work and unreliable inputs",
        paragraphs: [
          "By early October, the setup had scheduled jobs for stock-source collection, research digests, paper-trading reviews, Reel drafts, and Obsidian check-ins. Research reports actually made it back to Discord, which was a useful milestone.",
          "The failures were more instructive. A collector could import a Python dependency when run manually but fail in its scheduled environment. The downstream digest could still report success. Other runs hit rate limits, missing source credentials, incomplete coverage, and incorrect delivery times.",
          "A readable report was only one part of the system. I needed to know whether collection had succeeded, how fresh the inputs were, and what was missing. The investment experiments remained research and paper trading; they did not execute live trades.",
        ],
      },
      {
        title: "4. JacobBot, through iMessage",
        paragraphs: [
          "I wanted to try the same idea in a messaging app I already used, so I connected Hermes to iMessage through BlueBubbles and called it JacobBot. Other people being able to message it changed the design immediately.",
          "My private assistant had useful access to my Mac. JacobBot needed a separate profile, gateway, and tool configuration. I added a required !jacobbot wake token, owner-only administrative commands, rate limits, and restrictions that kept reminders in the chat that requested them. The bot's tools excluded my private files, terminal, memory, and unrestricted browser access.",
          "Message loops were another challenge. A reply could return through BlueBubbles as an incoming event, while updates and read receipts could cause duplicate processing. I worked through message-ID deduplication, in-flight reply tracking, and intake filtering.",
          "The adapter passed 61 tests, alongside 44 passing guard checks. Live tests covered wake-token behavior, a single reply without a loop, administrative commands, a short reminder, and a friend's direct message.",
        ],
      },
      {
        title: "5. The parts I was still working through",
        paragraphs: [
          "JacobBot still had open questions around group chats, inbound-message logging, and image-generation credentials. I also wanted a separate bot identity alongside my normal iMessage account, but did not establish a working dual-identity setup under one macOS user.",
          "Operating Hermes brought its own debugging. At one point the existing gateway kept running while every new CLI process was immediately killed by macOS. Replacing the managed Python executable with a fresh byte-for-byte copy restored launches, although I never established the exact operating-system cause.",
        ],
      },
      {
        title: "The technology, piece by piece",
        comparison: {
          label: "Tools used in the Hermes experiments",
          columns: ["Component", "Role in my setup"],
          rows: [
            ["Hermes Agent + Python", "Local agent runtime and custom workflows on macOS"],
            ["Discord", "Private messaging interface, reports, and workflow channels"],
            ["SQLite", "Apartment listing state and deduplication"],
            ["Scheduled jobs", "Research collection, digests, drafts, and vault check-ins"],
            ["BlueBubbles", "Bridge between iMessage and the separate JacobBot profile"],
            ["Obsidian + Markdown", "Local knowledge base, including a demonstrated to-do-file reading pilot"],
          ],
        },
      },
      {
        title: "What I am taking from it",
        paragraphs: [
          "I got working research digests, a messaging interface to my own workflows, and a restricted social bot out of the experiments. Other pieces stayed paused or incomplete, with reliability and integration work still to do.",
          "I keep coming back to whether a task benefits from an agent or would be easier with Codex, ChatGPT, or a small script. The useful engineering work has been in the connections: maintaining state, validating inputs, handling delivery, and deciding what the agent should be allowed to do.",
        ],
      },
    ],
  },
  {
    slug: "obsidian",
    title: "Obsidian PKMS",
    description: "My second brain: local Markdown notes, Git-based sync across Apple devices, and experiments with AI-assisted reflection.",
    intro: [
      "After four or five years with Notion, I started building my second brain in ",
      { label: "Obsidian", href: "https://obsidian.md/" },
      " in June 2026. I wanted a place for my thoughts, plans, workouts, and projects, with ordinary files I could keep, version, and use with other tools.",
    ],
    tags: ["Obsidian", "Markdown", "Git", "GitHub", "iSH", "QuickAdd", "AI"],
    links: ["hermes", "gaggimate"],
    sections: [
      {
        title: "1. Starting with files I could own",
        paragraphs: [
          "My first interest was the idea of an AI-maintained knowledge base: collect information in Markdown, connect related ideas, and use an agent to help organize it. I explored that for things like LeetCode patterns before committing to an everyday vault.",
          "The practical appeal was simpler. My notes would live on my computer, remain readable outside Obsidian, and be available to Git, scripts, and coding agents. I could choose how to use the information without depending on one application's interface.",
        ],
      },
      {
        title: "2. Getting the same vault onto three devices",
        paragraphs: [
          "I wanted the vault on my MacBook, iPhone, and iPad without another subscription or a home server running just for notes. I considered Obsidian Sync and iCloud, then chose a private GitHub repository because I already knew Git and wanted version history.",
          "On the Mac, I used Obsidian with Git-based synchronization. Mobile was more unusual: I used iSH, a Linux terminal environment for iOS, mounted Obsidian's directory through the Files app, set up Git and SSH, and cloned the repository into that mounted location.",
          "The routine was to pull before editing, then commit and push afterward. That made cross-device access possible, but it also made synchronization something I had to manage. I eventually wrapped the repeated commands in a shell shortcut.",
        ],
      },
      {
        title: "3. Finding the friction in mobile Git",
        paragraphs: [
          "The iOS filesystem mount did not behave exactly like a normal computer. I ran into Git ownership warnings, a corrupted index on the iPad, merge editors, and operations that could hang inside iSH.",
          "One odd behavior was that staging files immediately after opening iSH could freeze, while running git status first helped subsequent operations proceed. That became part of the sync-script troubleshooting. These were practical reminders that free synchronization still comes with maintenance.",
          "By my October retrospective, the MacBook, iPhone, and iPad workflow worked for my needs. Mobile access remained less seamless than the cloud sync I had been used to.",
        ],
      },
      {
        title: "4. Making it useful every day",
        paragraphs: [
          "My task system settled into one Markdown file: current and near-term tasks at the top, with a backlog underneath. I also kept using a physical Muji planner. Obsidian became the searchable record I could return to, while paper remained useful for immediate planning and reflection.",
          "Exercise tracking was one of the first workflows I built out. I separated the plan, reusable templates, and completed sessions. QuickAdd created date-first notes for rotating Lift A/B/C and Run A/B/C sessions, with other activities logged separately. The important details were what I did, how much I lifted, and how many reps I completed.",
          "The vault expanded to include career planning, technical study, AI workflows, ideas, journaling, Hermes documentation, and GaggiMate troubleshooting. I added structure when it made information easier to retrieve, rather than trying to settle on a perfect hierarchy upfront.",
        ],
      },
      {
        title: "5. Using the record I had built",
        paragraphs: [
          "Consistent notes gave me something useful to analyze. An October review of my workout history identified 46 lifting sessions between June 2 and October 7. I wanted to use those records and my existing templates to develop a better training plan, with the historical logs preserved.",
          "I also had Codex inspect the vault and used ChatGPT for an outside perspective on recurring themes and connections. A Hermes pilot read my actual to-do file and identified 41 unchecked tasks. Those were concrete examples of agents using the files, while broader ideas like automatic vault restructuring were still experiments.",
          "Nutrition tracking became another test. I tried the Macros plugin, then explored Food Tracker because readable Markdown entries seemed easier to maintain manually and through an agent. I had not settled on a permanent migration between them.",
        ],
      },
      {
        title: "The technology, piece by piece",
        comparison: {
          label: "Tools used in my Obsidian knowledge system",
          columns: ["Component", "What it does for me"],
          rows: [
            ["Obsidian", "Writing, browsing, linking, and searching my notes"],
            ["Markdown", "Portable files for tasks, journals, logs, plans, and project documentation"],
            ["Git + private GitHub repository", "Version history and the shared repository for device synchronization"],
            ["iSH + SSH", "Git access to the mounted Obsidian directory on iPhone and iPad"],
            ["QuickAdd + templates", "Dated workout notes with a repeatable session structure"],
            ["Codex, ChatGPT, and Hermes experiments", "Reading records, finding themes, and exploring useful automations"],
          ],
        },
      },
      {
        title: "Still shaping it around how I work",
        paragraphs: [
          "Around 150 days in, the most useful parts were the habits I could keep: writing things down, maintaining one task list, and returning to past records. Folder organization, mobile friction, and the amount of automation worth maintaining were still evolving.",
          "Letting an agent read a personal vault also made me think more carefully about what belonged in it and what access I was comfortable granting. A folder name alone does not isolate private material. I reviewed the contents before experimenting with AI access.",
          "I am always exploring how to make the system more useful, but I also know that building productivity systems can become its own hobby. The goal is to recover ideas, understand what I have done, and decide what to work on next.",
        ],
      },
    ],
  },
  {
    slug: "pi-hole",
    title: "Docker Pi-hole",
    description: "DNS ad blocking that went from an always-on Lenovo laptop to two on-demand commands on my Mac.",
    intro: [
      "I wanted network-wide ad blocking without installing something on every device. I started with ",
      { label: "Pi-hole", href: "https://github.com/pi-hole/pi-hole" },
      ", an open-source DNS sinkhole that filters requests to advertising and tracking domains. Getting it to fit my day-to-day use took three versions of the setup.",
    ],
    tags: ["Pi-hole", "Docker Compose", "Ubuntu", "DNS", "macOS", "Shell scripting"],
    sections: [
      {
        title: "1. Turning an old laptop into a home server",
        paragraphs: [
          "My first thought was to buy a Raspberry Pi and leave it running all the time. After looking at the cost, I realized I already had an old Lenovo laptop sitting around that could do the same job.",
          "I installed Ubuntu, set up Docker, and deployed Pi-hole with Docker Compose. The laptop stayed plugged in and connected to the home Wi-Fi, and I used SSH to manage it remotely. It became a small Linux server with a specific job: answering DNS requests.",
        ],
      },
      {
        title: "2. Trying network-wide ad blocking",
        paragraphs: [
          "I wanted every device on my family’s network to benefit from the same filtering. I gave the laptop a consistent local IP address, then changed the router’s DNS settings to point to it.",
          "When a device needed to look up a domain, Pi-hole checked it against the blocklists. A blocked domain got a blocking response; an allowed domain could resolve normally. Initially, it worked, and I could see advertising domains being blocked.",
          "The tradeoff was that everyone’s DNS now depended on my experiment. Some of my family’s websites and workflows were affected, and at one point devices across the house lost internet access. I restored the router’s automatic DNS settings to get the network back to normal.",
          "I never established a definitive cause for that outage. What was clear was that I wanted to keep learning without making the rest of the household depend on the setup.",
        ],
      },
      {
        title: "3. Keeping the filtering on my Mac",
        paragraphs: [
          "I kept Pi-hole on the Lenovo, but changed only my Mac’s DNS settings to use it. The family router went back to its normal configuration. That gave me control over my own blocklists without changing anyone else’s browsing experience.",
          "This worked well for roughly two months. I could switch between Pi-hole and automatic DNS whenever I wanted. But it still meant leaving an entire second laptop powered on, connected to Wi-Fi, and plugged into the wall just to handle lookups from one computer.",
          "Eventually, I started asking why the second computer needed to be involved at all.",
        ],
      },
      {
        title: "4. Moving Pi-hole onto the Mac itself",
        paragraphs: [
          "I already had Docker Desktop installed on my Mac, so I moved the Compose setup there. My Mac could send DNS requests to its own local container, and the old laptop no longer needed to stay on.",
          [
            "I exposed the DNS service at ",
            { code: "127.0.0.1:53" },
            " and the administration dashboard at ",
            { code: "127.0.0.1:8080/admin" },
            ". That kept the service local to the machine I was actually using.",
          ],
          "I also wrote two shell commands so that enabling and disabling the setup would be something I would actually bother doing:",
        ],
        commands: [
          {
            name: "pihole-on",
            description: "Starts Docker Desktop and Pi-hole, points my Mac’s DNS at the local container, and refreshes the DNS cache.",
          },
          {
            name: "pihole-off",
            description: "Restores automatic DNS, refreshes the cache, and shuts down Pi-hole and Docker Desktop.",
          },
        ],
      },
      {
        title: "How the current setup works",
        paragraphs: [
          "With Pi-hole enabled, apps on my Mac send DNS lookups to the local container. Pi-hole checks the requested domain, blocks it when it matches a blocklist, or resolves it through its cache or upstream DNS.",
        ],
        diagram: "pi-hole-dns",
        after: [
          "Pi-hole returns the DNS answer to my Mac. Once an allowed domain has an IP address, the app connects to that website through my normal network connection. Pi-hole handles the name lookup; it is not a proxy for the web traffic.",
        ],
      },
      {
        title: "The technology, side by side",
        comparison: {
          label: "Original Linux setup compared with the current Mac setup",
          columns: ["Component", "Original Linux setup", "Current Mac setup"],
          rows: [
            ["Host", "Old Lenovo laptop", "Personal Mac"],
            ["Operating system", "Ubuntu 24.04.4 LTS", "macOS"],
            ["Deployment", "Docker Compose", "Docker Compose on Docker Desktop"],
            ["DNS endpoint", { code: "192.168.1.185:53" }, { code: "127.0.0.1:53" }],
            ["Admin dashboard", { code: "192.168.1.185:8080/admin" }, { code: "127.0.0.1:8080/admin" }],
            ["Upstream DNS", ["Cloudflare: ", { code: "1.1.1.1" }, " / ", { code: "1.0.0.1" }], "Configured in Pi-hole"],
            ["Management", "SSH and Docker commands", [{ code: "pihole-on" }, " / ", { code: "pihole-off" }]],
            ["Availability", "Always on", "On demand"],
            ["Who used it", "The household, then only my Mac", "Only my Mac"],
          ],
        },
      },
      {
        title: "What I took away",
        paragraphs: [
          "The project gave me hands-on experience with Linux, SSH, Docker Compose, DNS, router configuration, and macOS shell scripting. I also learned how quickly a small home-network experiment can become something other people rely on.",
          "The version I kept fits the actual use case: DNS-based ad blocking on my own Mac, available when I want it. Each iteration removed something I no longer needed, until the setup stopped requiring a separate computer running 24/7.",
        ],
      },
    ],
  },
];
