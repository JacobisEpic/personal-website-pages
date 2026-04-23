import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  jobit,
  tripguide,
  threejs,
  DesignTeam,
  MedtronicLogo,
  Hackathon,
  ChessBot,
  SmartDoc,
  IEEE,
  PhilipsLogo,
  CanonicalLogo,
  SmoothOperator
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "extra",
    title: "Extra",
  },
];

const services = [
  {
    title: "President",
    icon: web,
  },
  {
    title: "Officer",
    icon: IEEE,
  },
  {
    title: "Diversity, Equity, and Inclusion Chair",
    icon: mobile,
  },
  {
    title: "Corporate/Public Relations Chair",
    icon: backend,
  }

];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Software Engineer",
    company_name: "Canonical (Ubuntu)",
    icon: CanonicalLogo,
    iconBg: "#000000",
    date: "August 2025 - 2026",
    points: [
      "Worked on Canonical's Backend SaaS team (Landscape), contributing to the development of Ubuntu's enterprise-grade systems management platform",
      "Led investigation of a production memory leak by building a multi-worker simulation environment to reproduce concurrency and database deadlock scenarios",
      "Identified and resolved memory inefficiencies in Python services, including eliminating unnecessary data copying and fixing stale state handling in async write loops",
      "Implemented service-level observability using Grafana dashboards to monitor real production memory usage (RSS), enabling validation of fixes under live load",
      "Authored internal documentation on GitHub Copilot best practices to standardize AI-assisted development workflows across the team",
      "Collaborated with a globally distributed team using Git, Launchpad, CI/CD, and code reviews to ship fixes and backport improvements to supported releases",
      "Participated in in-person engineering roadmap planning sessions in Sweden",
    ],
  },
  {
    title: "Software Engineer Co-Op",
    company_name: "Philips",
    icon: PhilipsLogo,
    iconBg: "#000000",
    date: "January 2025 - May 2025",
    points: [
      "Enhanced Patient Monitoring Systems by maintaining key components to improve performance, maintainability, and third-party device compatibility",
      "Upgraded an internal HL7 messaging tool, enabling seamless integration of external medical devices with the Philips ecosystem",
      "Preserved critical functionality by selectively cherry-picking commits from older versions and reinforcing stability through robust unit testing",
      "Collaborated on a CI/CD pipeline using GitHub and Azure DevOps to increase deployment reliability, test coverage, and continuous integration efficiency for clinical-grade software"
    ],
  },
  {
    title: "Software Engineer Intern",
    company_name: "Medtronic",
    icon: MedtronicLogo,
    iconBg: "#000000",
    date: "June 2024 - August 2024",
    
    points: [
      "Developed an interactive dashboard using AWS cloud services and PowerBI to process and visualize real-time diabetic data from users' insulin pumps, providing comprehensive health insights for patients and doctors",
      "Streamlined data exchange from the upstream data sanitation processes to the Amazon Redshift data warehouse",
      "Utilized Jira & Confluence for project management and tracking, ensuring efficient workflow and timely task completion",
      "Documented processes and collaborated with the team using Confluence to maintain a cohesive and organized work environment"
    ],
  },
  {
    title: "R&D Software Engineer",
    company_name: "BOTLab - Biomedical Optical Technologies Laboratory",
    icon: starbucks,
    iconBg: "#000000",
    date: "May 2022 - August 2023",
    points: [
      "Honored with a selective grant from Boston University’s Undergraduate Research Opportunities Program (UROP)",
      "Improved data processing efficacy by automating the alignment of blood pulse waveforms from prototype and commercial devices",
      "Developed a program to analyze and create notable waveform graphs of Blood Flow Index and saving them to the research network drive",
      "Collected data from over 40 subjects by executing setup standard operating procedures, attaching wearables, and operating software"

    ],
  },
  {
    title: "Engineering Researcher",
    company_name: "BTEC - Bioengineering Technology & Entrepreneurship Center",
    icon: starbucks,
    iconBg: "#000000",
    date: "May 2022 - May 2024",
    points: [
      "Authored lab material used by students at Boston University",
      "Developed a Bio-ink (biological material used in a 3D bioprinter) from alginate that's used in demonstrations and university classes",
      "Assisted students of all ages with using advanced machinery and other laboratory equipment",
      "Automated budget sheet for the laboratory",
      "Managed lab safety, budgeting, and the upkeep of equipment infrastructure systems including DI water filtration system, eye wash, and more.",
    ],
  },
  {
    title: "High School Researcher",
    company_name: "Waksman Student Scholars Program",
    icon: tesla,
    iconBg: "#000000",
    date: "September 2020 - June 2021",
    points: [
      "Selected from a competitive pool of highly motivated high school students to participate in a research program at Rutgers University",
      "Conducted analysis of a unique DNA sample from Landoltia punctata (duckweed) clone 118AY14.16 C2, leveraging basic bioinformatics, molecular biology techniques, and the DNA Sequence Analysis Program (DSAP).",
      "Designed and showcased a final scientific poster to a district-wide cohort of students and mentors",
    ],
  },
  {
    title: "Manual Laborer",
    company_name: "Gasko's Family Farm and Greenhouses",
    icon: shopify,
    iconBg: "#000000",
    date: "February 2021 - May 2021",
    points: [
      "Lifted and transported heavy plants weighing up to 70 pounds each",
      "Loaded trucks at the farm and transported inventory to the plant nursery",
      "Worked with people from diverse backgrounds",
    ],
  },
  {
    title: "Food Delivery",
    company_name: "DoorDash",
    icon: meta,
    iconBg: "#000000",
    date: "Jan 2021 - August 2021",
    points: [
      "Drove all over New Jersey to deliver delicious meals to customers",
      "Ensured positive customer experience",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "SmoothOperator - Autonomous Luggage Assistant",
    description: `
      Design Excellence Award Winner at the annual Boston University ECE Senior Design Capstone Competition. SmoothOperator is an autonomous luggage assistant designed to improve accessibility and independence for travelers. Built over the course of a year, it integrates a custom mechanical platform, forklift-style lifting system, and advanced navigation powered by ROS. Because robotic navigation in dynamic public spaces remains an active research field, the team implemented a system based on Dijkstra’s algorithm for global path planning, paired with SLAM and real-time obstacle avoidance to safely maneuver crowded environments. With LiDAR, IMU, ultrasonic sensors, and QR code scanning, SmoothOperator can carry up to 80 lbs of luggage while adapting to obstacles and maintaining reliable localization. The project showcases how robotics, embedded systems, and user-centered design can merge into a scalable solution for modern travel.
      <a href="https://tinkerso.github.io/smoothoperator.github.io/" target="_blank" rel="noopener noreferrer" style="color: yellow;">
        Check out our website!
      </a>
    `,
    
    tags: [
      {
        name: "Python",
        color: "blue-text-gradient",
      },
      {
        name: "React-Native",
        color: "green-text-gradient",
      },
      {
        name: "Linux",
        color: "pink-text-gradient",
      },
    {
        name: "C",
        color: "orange-text-gradient",
      },
    ],
    image: SmoothOperator,
    source_code_link: "https://tinkerso.github.io/smoothoperator.github.io/",
  },
  {
    name: "Multiclassification UI for X-Ray Images",
    description: `
      1st place project at the inaugural BU BTEC Design-a-thon competition in the Data Science category. Our DEI-focused healthcare solution utilized front-end technologies and machine learning to classify 14 types of lung conditions using chest X-ray images with the ResNet-50 architecture, achieving a final accuracy of 79.5%. We deployed a clean, accessible website that allows doctors to verify preliminary diagnoses, providing corrective guidance or further medical actions. The project was presented to a panel of industry professionals, experts, and professors, demonstrating its practical application in healthcare settings.
      <a href="https://www.bu.edu/eng/2023/05/04/first-design-a-thon-generates-tech-solutions-to-health-disparities/" target="_blank" rel="noopener noreferrer" style="color: yellow;">
        Here's our article!
      </a>
    `,
    
    tags: [
      {
        name: "Python",
        color: "blue-text-gradient",
      },
      {
        name: "HTML/CSS",
        color: "green-text-gradient",
      },
      {
        name: "Convolutional Neural Network",
        color: "pink-text-gradient",
      },
    ],
    image: DesignTeam,
    source_code_link: "https://jacobisepic.github.io/Design-a-thon-Neural-Network/",
  },
  {
    name: "AccessBU: Accessible Navigation Application",
    description: `
      1st place project at the BostonHacks Hackathon in the Inclusive Innovation Track, competing against 300 participants. Developed using React Native, Node.js, JavaScript, and MongoDB, AccessBU leverages Dijkstra’s algorithm with the Google Maps API to reroute individuals with mobile or visual impairments through talking crosswalks to accessible entrances, optimizing route efficiency. The app also features text-to-speech functionality for audio navigation, enhancing user safety. Data points were manually collected around campus, and a crowd-sourcing feature allows users to input locations, further enriching the app's utility. 
      <a href="https://devpost.com/software/accessbu" target="_blank" rel="noopener noreferrer" style="color: yellow;">
        Check out our Devpost!
      </a>
    `,
    tags: [
      {
        name: "React Native",
        color: "blue-text-gradient",
      },
      {
        name: "Node.js",
        color: "green-text-gradient",
      },
      {
        name: "MongoDB",
        color: "pink-text-gradient",
      },
    ],
    image: Hackathon, // Replace with the appropriate image variable
    source_code_link: "https://github.com/Erichen294/AccessBU", // Replace with the actual link if available
  },
];

export { services, technologies, experiences, testimonials, projects };
