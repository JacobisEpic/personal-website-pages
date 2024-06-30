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
  SmartDoc
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
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "President",
    icon: web,
  },
  {
    title: "Diversity, Equity, and Inclusion Chair",
    icon: mobile,
  },
  {
    title: "Corporate/Public Relations Chair",
    icon: backend,
  },
  {
    title: "Content Creator",
    icon: creator,
  },
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
    title: "Software Engineer Intern",
    company_name: "Medtronic",
    icon: MedtronicLogo,
    iconBg: "#000000",
    date: "June 2024 - Present",
    points: [
      "Developed an interactive dashboard using AWS cloud services and PowerBI to process and visualize real-time diabetic data from users' insulin pumps, providing comprehensive health insights for patients and doctors",
      "Streamlined data exchange from the upstream data sanitation processes to the Amazon Redshift data warehouse",
      "Utilized Jira & Confluence for project management and tracking, ensuring efficient workflow and timely task completion",
      "Documented processes and collaborated with the team using Confluence to maintain a cohesive and organized work environment"
    ],
  },
  {
    title: "R&D Software Engineer Intern",
    company_name: "BOTLab - Biomedical Optical Technologies Laboratory",
    icon: starbucks,
    iconBg: "#000000",
    date: "May 2022 - August 2023",
    points: [
      "Honored with a selective grant from Boston University’s Undergraduate Research Opportunities Program (UROP)",
      "Contributed as the third author on a presentation submitted to SPIE. Photonics West, engaging in data collection and analysis",
      "Improved data processing efficacy by 35% by automating the alignment of blood pulse waveforms from prototype and commercial devices",
      "Developed a fully automated program to analyze and create notable waveform graphs of Blood Flow Index and saving them to the research network drive",
      "Collected data from over 40 subjects by executing setup standard operating procedures, attaching wearables, and operating software"

    ],
  },
  {
    title: "Laboratory Assistant",
    company_name: "BTEC - Bioengineering Technology & Entrepreneurship Center",
    icon: starbucks,
    iconBg: "#000000",
    date: "May 2022 - Present",
    points: [
      "Authored lab material used by the engineering Master's students at Boston university",
      "Developed a Bio-ink (biological material used in a 3D bioprinter) from alginate that's used in demonstrations and university classes",
      "Assisted students of all ages with using advanced machinery and other labortory equipment",
      "Automated budget sheet for the laboratory",
      "Managed lab safety, budgeting, and the upkeep of equipment infrastructure systems including DI water filtration system, eye wash, and more.",
    ],
  },
  {
    title: "High School Researcher",
    company_name: "Waksman Student Scholars Program",
    icon: tesla,
    iconBg: "#000000",
    date: "Septemper 2020 - June 2021",
    points: [
      "Selected from a competitive pool of highly motivated high school students to participate in a reseaerch program at Rutgers University",
      "Conducted analysis of a unique DNA sample from Landoltia punctata (duckweed) clone 118AY14.16 C2, leveraging basic bioinformatics, molecular biology techniques, and the DNA Sequence Analysis Program (DSAP).",
      "Implementing responsive design and ensuring cross-browser compatibility",
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
      "Lifted extremely heavy plants; actually the most incredibly heavy plants in the world. Probably nearly 60/70 pounds each",
      "Loaded truck at farm then transported them to the plant nursery",
      "Worked with people with diverse background",
      "Appointed as leader among high school workers at the greenhouse",
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
    name: "Multiclassification UI for X-Ray Images",
    description: `
      1st place project at the inaugural BU BTEC Design-a-thon competition in the Data Science category. Our DEI-focused healthcare solution utilized front-end technologies and machine learning to classify 14 types of lung conditions using chest X-ray images with the ResNet-50 architecture, achieving a final accuracy of 79.5%. We deployed a clean, accessible website that allows doctors to verify preliminary diagnoses, providing corrective guidance or further medical actions. The project was presented to a panel of industry professionals, experts, and professors, demonstrating its practical application in healthcare settings.
      <a href="https://www.bu.edu/eng/2023/05/04/first-design-a-thon-generates-tech-solutions-to-health-disparities/" target="_blank" rel="noopener noreferrer" style="color: pink;">
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
      <a href="https://devpost.com/software/accessbu" target="_blank" rel="noopener noreferrer" style="color: pink;">
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
  {
    name: "Smart Document Analyzer",
    description: `
      The Smart Document Analyzer is a sophisticated web application developed using HTML, CSS, JavaScript, Python, MongoDB, and Flask. It utilizes the Google JSON Search API and GPT-3.5 Turbo API to process PDF files, outputting summaries, NLP analyses, and feed ingestion, all securely stored in a MongoDB database. The application features secure account registration and login with password hashing and input sanitation, allowing users to access previously uploaded documents and generated outputs. Additionally, unit testing and Docker containers were implemented to validate functionality and ensure a smooth setup process.
    `,
    tags: [
      {
        name: "Python",
        color: "blue-text-gradient",
      },
      {
        name: "Machine Learning",
        color: "green-text-gradient",
      },
      {
        name: "APIs",
        color: "pink-text-gradient",
      },
    ],
    image: SmartDoc, // Replace with the appropriate image variable
    source_code_link: "https://github.com/JacobisEpic/Smart-Document-Analyzer",
  },
  {
    name: "Chess Bot - A Chess Engine",
    description: `
      An interactive chess game engine crafted with Python and Pygame. Leveraging the Negamax Algorithm combined with Alpha-Beta pruning, the AI offers a sophisticated gameplay experience using deterministic evaluation, probing a search tree up to a depth of 5 moves.
    `,
    tags: [
      {
        name: "Python",
        color: "blue-text-gradient",
      },
      {
        name: "Pygame",
        color: "green-text-gradient",
      },
      {
        name: "DFS Algorithm",
        color: "pink-text-gradient",
      },
      {
        name: "Chess",
        color: "yellow-text-gradient",
      },
    ],
    image: ChessBot, // Replace with the appropriate image variable
    source_code_link: "https://github.com/JacobisEpic/ChessBOT", // Replace with the actual link if available
  },
  {
    name: "Binary Classification for Dog & Cat Images",
    description:
      "The Dogs and Cats Binary Classification project is a machine learning model designed to distinguish between images of dogs and cats. Utilizing Python and advanced algorithms, the model processes images through a convolutional neural network to achieve accurate classifications. This project demonstrates effective image recognition techniques, providing a robust solution for binary image classification tasks.",
    tags: [
      {
        name: "MATLAB",
        color: "blue-text-gradient",
      },
      {
        name: "Python",
        color: "green-text-gradient",
      },
      {
        name: "Machine Learning",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://github.com/JacobisEpic/Dogs-and-Cats-Binary-Classification",
  },
  {
    name: "Light For Limited Motion Individuals",
    description: `
      This project involved designing and manufacturing a versatile light lamp that integrates RGB, white, and blue lighting options. The lamp is controllable by an IR remote, voice commands, and ambient lighting, catering specifically to individuals with limited motion. It combines functionality with accessibility, providing an intuitive user experience. Check out our presentation for detailed insights into the design and implementation.
      <a href="https://docs.google.com/presentation/d/1e6YmBjNsG_UtT_aBiCNVBlE9Xnf4rjQA9O8_U0sFXwY/edit?usp=sharing" target="_blank" rel="noopener noreferrer" style="color: pink;">
        View our presentation!
      </a>
    `,
    tags: [
      {
        name: "C++",
        color: "blue-text-gradient",
      },
      {
        name: "Arduino",
        color: "green-text-gradient",
      },
      {
        name: "Circuitry",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide, // Replace with the appropriate image variable
    source_code_link: "https://docs.google.com/presentation/d/1e6YmBjNsG_UtT_aBiCNVBlE9Xnf4rjQA9O8_U0sFXwY/edit?usp=sharing",
  },
];

export { services, technologies, experiences, testimonials, projects };
