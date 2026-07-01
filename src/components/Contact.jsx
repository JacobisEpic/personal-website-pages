import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  return (
    <div className="xl:mt-12 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="bg-black p-8 rounded-2xl"
      >
        <h3 className={styles.sectionSubTextWhite}></h3>
        <h4 className={styles.sectionHeadTextWhite}>Fun Facts</h4>
        <ul className="mt-6 text-white text-[18px] leading-[30px] list-disc pl-5 space-y-2">
          <li>
            I got into running in 2026 through the “Run the Date” challenge, where I ran the calendar date in miles every day from January 1 (1.01 miles) through May 19 (5.19 miles). Since then, I’ve shifted into a more sustainable weekly mileage routine.
          </li>
          <li>
            I rank in the top 2% of Tetris 40 line scores worldwide
          </li>
          <li>
            I have a 200+ day streak on Duolingo (Learning Chinese & Hindi)
          </li>
          <li>
            I enjoy bowling and bowl one-handed
          </li>
          <li>
            I used to be a football kicker
          </li>
          <li>
            Currently improving latte art skills; I make coffee every morning
          </li>
          <li>
            I played competitive piano for 10 years
          </li>
          <li>
            I'm learning ping pong
          </li>
          <li>
            My favorite emoji is 😎
          </li>
</ul>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "fun-facts");
