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
          Hi! I'm Jacob Chin, a rising senior at Boston University, double majoring in Computer Engineering and 
          Biomedical Engineering with a concentration in Machine Learning. I have a diverse background as a former 
          student-athlete in Varsity Football, Varsity Bowling, and Soccer, and I bring over a decade of competitive 
          piano experience. Outside the classroom, I enjoy making short-form content as a hobby, exploring new adventures, 
          exercising, playing badminton, longboarding, and tinkering with my coffee espresso setup. I'm enjoy playing
          Clash of Clans, Chess, & Tetris, showcasing my strategic thinking and problem-solving skills. Passionate about tackling 
          complex, real-world problems, I aim to contribute efficient, sustainable, and smart solutions. I'm open to 
          opportunities in all sectors as I'm a versatile individual. Let's work!
        </motion.p>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-4 text-pink-500 text-[17px] max-w-3xl leading-[30px]"
        >
          Programming : Python, C++, C, MATLAB, Java, JavaScript, Verilog, SQL, HTML/CSS
        </motion.p>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-4 text-purple-500 text-[17px] max-w-3xl leading-[30px]"
        >
          Other : Matplotlib, PyTorch, pandas, NumPy, Express, Node.js, mongoDB, pylon Viewer, Arduino, FPGA
        </motion.p>
      </div>

      <div className="mt-30 flex flex-wrap gap-10 justify-end"> {/* Add this wrapper div for the service cards */}
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </div>
  );
};



export default SectionWrapper(About, "about");
