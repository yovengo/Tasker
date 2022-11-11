import React from 'react';
import { CardProps, CardTitleProps } from '../../types/types';
import { motion } from 'framer-motion';
import TaskerLogo from '../../assets/img/TaskerLogo';
import { NavLink } from 'react-router-dom';

const pageVariants = {
  initial: {
    opacity: 0,
    y: -50,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
  },
};

const pageTransition = {
  ease: [0, 0.71, 0.2, 1.01],
  duration: 0.3,
  delay: 0.1,
};

const Card = ({ children }: CardProps) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      variants={pageVariants}
      transition={pageTransition}
      className="overflow-hidden p-8 min-w-full min-h-[557px] xs:min-w-[400px] "
    >
      <div className="flex justify-center mb-6">
        <NavLink to="/">
          <TaskerLogo style="fill-gray-800 w-20 h-20" />
        </NavLink>
      </div>
      {children}
    </motion.div>
  );
};

const CardTitle = ({ children, label }: CardTitleProps) => (
  <h1 className="text-slate-800 mb-6 text-5xl ">{children || label}</h1>
);

Card.Title = CardTitle;
export default Card;
