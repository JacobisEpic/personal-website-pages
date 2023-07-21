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
  carrent,
  jobit,
  tripguide,
  threejs,
  DesignTeam
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
    title: "Data Science Researcher/Intern",
    company_name: "BOTLab - Biomedical Optical Technologies Laboratory",
    icon: starbucks,
    iconBg: "#000000",
    date: "May 2022 - Present",
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
    description:
      "First place project in university-wide competition!",
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
    image: carrent,
    source_code_link: "https://jacobisepic.github.io/Design-a-thon-Neural-Network/",
  },
  {
    name: "Binary Classification for Dog & Cat Images",
    description:
      "Classified whether a given image was a dog or cat.",
    tags: [
      {
        name: "MATLAB",
        color: "blue-text-gradient",
      },
      {
        name: "Python",
        color: "green-text-gradient",
      },
      // {
      //   name: "scss",
      //   color: "pink-text-gradient",
      // },
    ],
    image: jobit,
    source_code_link: "https://github.com/JacobisEpic/Dogs-and-Cats-Binary-Classification",
  },
  {
    name: "Light For Limited Motion Individuals",
    description:
      "Designed and manufactured a working RGB, white, and blue light lamp that's controllable by IR remote, voice, and ambient lighting",
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
    image: tripguide,
    source_code_link: "https://docs.google.com/presentation/d/1e6YmBjNsG_UtT_aBiCNVBlE9Xnf4rjQA9O8_U0sFXwY/edit?usp=sharing",
  },
];

export { services, technologies, experiences, testimonials, projects };
