import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close, github, LinkedInLogo} from "../assets";


const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-black" : "bg-black"
      }`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <div className='flex items-center gap-2'>

          <Link
            to='/'
            // className='flex items-center gap-2'
            onClick={() => {
              setActive("");
              window.scrollTo(0, 0);
            }}
            className='text-white text-[18px] font-bold cursor-pointer flex '
          >
            Jacob Chin
          </Link>
          &nbsp;
          {/* this is the logo at the top left */}
          
          {/* <p className='text-white text-[18px] font-bold cursor-pointer flex '>
            Jacob Chin &nbsp; */}
          <a href="https://www.linkedin.com/in/jacob-chin/" target="_blank" rel="noopener noreferrer">
            <img src={LinkedInLogo} alt="LinkedIn Icon" width="30" height="30" />
          </a>
          <a href="https://github.com/JacobisEpic" target="_blank" rel="noopener noreferrer">
            <img src={github} alt="LinkedIn Icon" width="30" height="30" />
          </a>

        </div>

            {/* <span className='sm:block hidden'> I can add something here </span> */}
          {/* </p> */}
          {/* This is the logo to the right of my Name */}
          {/* <img src={logo} alt='logo' className='w-9 h-9 object-contain' />  */}
        {/* </Link> */}

        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-white"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[28px] h-[28px] object-contain'
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-white"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
