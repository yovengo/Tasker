import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ComputerDesktopIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import useTheme from '../../../hooks/useTheme';

const NavBarThemeSwitch = () => {
  const [theme, setTheme] = useTheme();
  const [shown, setShown] = useState<boolean>(false);

  const showMenu = {
    enter: {
      opacity: 1,
      y: 0,
      display: 'block',
    },
    exit: {
      y: -5,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
      transitionEnd: {
        display: 'none',
      },
    },
  };

  return (
    <motion.div onHoverStart={() => setShown(true)} onHoverEnd={() => setShown(false)}>
      {theme === 'dark' ? (
        <MoonIcon className="w-6 text-sky-500 cursor-pointer" />
      ) : (
        <SunIcon className="w-6 text-sky-500 cursor-pointer" />
      )}
      <motion.ul
        variants={showMenu}
        initial="exit"
        animate={shown ? 'enter' : 'exit'}
        className="absolute mt-3 py-1 px-2 pr-10 text-slate-500 bg-white border border-opacity-50 rounded-lg"
      >
        <motion.li
          whileHover={{
            color: '#0fa5e9',
            x: 2,
          }}
          onClick={() => setTheme('light')}
          className="flex cursor-pointer p-1"
        >
          <SunIcon className="w-6 mr-2" />
          Light
        </motion.li>
        <motion.li
          whileHover={{
            color: '#0fa5e9',
            x: 2,
          }}
          onClick={() => setTheme('dark')}
          className="flex cursor-pointer p-1"
        >
          <MoonIcon className="w-6 mr-2" />
          Dark
        </motion.li>
        <motion.li
          whileHover={{
            color: '#0fa5e9',
            x: 2,
          }}
          onClick={() => setTheme(null)}
          className="flex cursor-pointer p-1"
        >
          <ComputerDesktopIcon className="w-6 mr-2" />
          System
        </motion.li>
      </motion.ul>
    </motion.div>
  );
};
export default NavBarThemeSwitch;
