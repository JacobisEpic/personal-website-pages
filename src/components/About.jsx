import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className='xs:w-[250px] w-full'>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full p-[1px] rounded-[20px] shadow-card'
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-black rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <img
          src={icon}
          alt='web-development'
          className='w-30 h-30 object-contain'
        />

        <h3 className='text-white text-[20px] font-bold text-center'>
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <div className="flex flex-wrap md:flex-nowrap gap-10"> {/* Add a flex container here */}
      <div className="w-full md:w-full"> {/* Add this wrapper div */}
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>Introduction</p>
          <h2 className={styles.sectionHeadText}>Who am I?</h2>
        </motion.div>

        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-4 text-black text-[17px] max-w-3xl leading-[30px]"
        >
          Hi! I'm Jacob Chin. I graduated from Boston University with a double major in{" "}
          <a
            href="https://www.bu.edu/eng/academics/resources/undergraduate-student-resources/double-majors-in-engineering/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 transition-colors"
          >
            Computer Engineering and Biomedical Engineering
          </a>
          . I thrive at the intersection of software and real-world problem solving, with experience building
          solutions in medical technology, autonomous robotics, and open-source software. Beyond academics, I’ve been deeply involved
          in extracurriculars and leadership, from serving as President of the Biomedical Engineering Society to leading DEI initiatives 
          at Theta Tau, a professional engineering fraternity. These experiences have shaped me not only as an engineer, but also as a 
          communicator who can bridge technical innovation with people and purpose. Outside of engineering, I’m a hobbyist at heart. I'm always 
          exploring something new, whether it’s experimenting with my espresso setup, staying active through sports like soccer, bowling, 
          and ping pong, or finding creative outlets through music and games.
        </motion.p>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-4 text-purple-500 text-[17px] max-w-3xl leading-[30px]"
        >
          Software engineer with high agency and strong ownership. Proven ability to thrive in team environments and consistently deliver. Ready to contribute.
        </motion.p>
        <motion.p
          variants={fadeIn("", "", 0.15, 1)}
          className="mt-4 text-pink-500 text-[17px] max-w-3xl leading-[30px]"
        >
          Based in NJ/NYC, open to opportunities in NYC. Contact:{" "}
          <a
            href="mailto:jacobchin.builds@gmail.com"
            className="font-semibold underline"
          >
            jacobchin.builds@gmail.com
          </a>
        </motion.p>
      </div>

      <div className="mt-30 flex flex-wrap gap-x-10 gap-y-5 justify-end"> {/* Add this wrapper div for the service cards */}
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </div>
  );
};



export default SectionWrapper(About, "about");
