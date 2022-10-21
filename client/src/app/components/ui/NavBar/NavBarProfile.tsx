import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserCircleIcon, ArrowRightOnRectangleIcon, UserIcon } from '@heroicons/react/24/outline';

const NavBarProfile = () => {
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
      <UserIcon className="w-6 cursor-pointer" />
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
          className="flex cursor-pointer p-1"
        >
          <UserCircleIcon className="w-6 mr-2" />
          Profile
        </motion.li>
        <motion.li
          whileHover={{
            color: '#0fa5e9',
            x: 2,
          }}
          className="flex cursor-pointer p-1"
        >
          <ArrowRightOnRectangleIcon className="w-6 mr-2" />
          Sign&nbsp;out
        </motion.li>
      </motion.ul>
    </motion.div>
  );
};
export default NavBarProfile;
