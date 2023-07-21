// import { motion } from "framer-motion";

// import { styles } from "../styles";
// import { ComputersCanvas } from "./canvas";
// import Tilt from "react-tilt";
// import {headshot} from "../assets";

// const ServiceCard = ({ index, icon }) => (
//   <Tilt className='xs:w-[320px] h-[250px] w-full ml-auto'>
//     <motion.div
//       variants={fadeIn("right", "spring", index * 0.5, 0.75)}
//       className='w-full green-pink-gradient p-[1.5px] rounded-[20px] shadow-card'
//     >
//       <div
//         options={{
//           max: 45,
//           scale: 1,
//           speed: 450,
//         }}
//         className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[320px] flex justify-evenly items-center flex-col'
//       >
//         <motion.img
//           src={icon}
//           alt='web-development'
//           className='w-16 h-16 object-contain'
//           animate={{
//             scale: [1, 1.2, 1],
//           }}
//           transition={{
//             duration: 1.5,
//             repeat: Infinity,
//             repeatType: "reverse",
//           }}
//         />
//       </div>
//     </motion.div>
//   </Tilt>
// );

// const Hero = () => {
//   return (
//     <section className={`relative w-full h-screen mx-auto`}>
//       <div
//         className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
//       >
//         <div className='flex flex-col justify-center items-center mt-5'>
//           {/* this is that weird purple bar */}
//           {/* <div className='w-5 h-5 rounded-full bg-[#915EFF]' /> */}
//           {/* <div className='w-1 sm:h-80 h-40 violet-gradient' /> */}
//         </div>

//         {/* <div> */}
//         <div className="p-4 bg-black border-2 border-gray-400 rounded shadow-lg">
//           <h1 className={`${styles.heroHeadText} text-white`}>
//             i am <span className='text-[#ffc0cb]'>JACOB C. CHIN</span>
//           </h1>
//           <p className={`${styles.heroSubText} mt-2 text-white-100`}>
//           Computer Engineer & Biomedical Engineer <br className='sm:block hidden' />
//           I solve problems 😎
//           </p>
//         </div>
      


//       </div>


//       {/* <ComputersCanvas /> */}

//       {/* <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
//         <a href='#about'>
//           <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
//             <motion.div
//               animate={{
//                 y: [0, 24, 0],
//               }}
//               transition={{
//                 duration: 1.5,
//                 repeat: Infinity,
//                 repeatType: "loop",
//               }}
//               className='w-3 h-3 rounded-full bg-secondary mb-1'
//             />
//           </div>
//         </a>
//       </div> */}
//     </section>
//   );
// };

// export default Hero;

import { motion } from "framer-motion";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import Tilt from "react-tilt";
import {headshot} from "../assets";

// Add fadeIn function (or import it if it's defined elsewhere)
const fadeIn = (direction = "right", type = "spring", delay = 0, duration = 0.75) => ({
  hidden: { opacity: 0, x: direction === "right" ? 100 : -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: type,
      delay: delay,
      duration: duration,
    },
  },
});

const ServiceCard = ({ index, icon }) => (
  <Tilt className='Tilt' options={{ max: 45, scale: 1, speed: 450 }}>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='motion-div-class'
    >
      <div className='div-class'>
        <motion.img
          src={icon}
          alt='web-development'
          className='w-54 h-54 object-contain pl-36 -mt-18'

          animate={{
            scale: [0.8, 0.7, 0.8],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>
    </motion.div>
  </Tilt>
);

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          {/* this is that weird purple bar */}
          {/* <div className='w-5 h-5 rounded-full bg-[#915EFF]' /> */}
          {/* <div className='w-1 sm:h-80 h-40 violet-gradient' /> */}
        </div>

        {/* <div> */}
        <div className="w-3/5 p-4 bg-black border-2 rounded-3xl shadow-lg">

          <h1 className={`${styles.heroHeadText} text-white`}>
            <span className='text-[#ffc0cb]'>JACOB C. CHIN</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
          Computer Engineer & Biomedical Engineer <br className='sm:block hidden' />
          I solve problems 😎
          </p>
        </div>
      
        <div className='flex flex-wrap gap-10 justify-end w-full mt-5'>
          <ServiceCard index={1} icon={headshot} />
        </div>

      </div>


      {/* <ComputersCanvas /> */}

      {/* <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div> */}
    </section>
  );
};

export default Hero;
