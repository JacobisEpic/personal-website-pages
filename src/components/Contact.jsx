import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { getRunTheDateMiles } from "../utils/runTheDate";

const Contact = () => {
  const today = new Date();
  const todayDate = `${today.getMonth() + 1}/${today.getDate()}`;
  const runTheDateMiles = getRunTheDateMiles(today);

  return (
    <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black p-8 rounded-2xl"
      >
        <h3 className={styles.sectionSubTextWhite}></h3>
        <h4 className={styles.sectionHeadTextWhite}>Fun Facts</h4>
        <ul className="mt-6 text-white text-[18px] leading-[30px] list-disc pl-5 space-y-2">
          <li>
            Here's an interactive 3D model I made of myself using the LiDAR scanner from my iPhone’s front camera
          </li>
          <li>
            I’ve been doing the “Run the Date” challenge since 2026 (no missed days). Today’s {todayDate}, so I’m running {runTheDateMiles} miles.          </li>
          <li>
            I rank in the top 2% of Tetris 40 line scores worldwide
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

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "Fun Facts");
