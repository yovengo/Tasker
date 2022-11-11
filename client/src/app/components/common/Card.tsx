import React from 'react';
import { CardProps, CardTitleProps } from '../../types/types';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.5,
  },
  in: {
    opacity: 1,
    scale: 1,
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
  const { pathname } = useLocation();

  return (
    <motion.div
      key={pathname}
      initial="initial"
      animate="in"
      variants={pageVariants}
      transition={pageTransition}
      className="bg-white rounded-lg overflow-hidden ring-1 ring-slate-900/5 shadow-xl p-8 mb-20 min-w-full xs:min-w-[400px] "
    >
      {children}
    </motion.div>
  );
};

const CardTitle = ({ children, label }: CardTitleProps) => (
  <h1 className="text-slate-800 mb-6 text-5xl ">{children || label}</h1>
);

Card.Title = CardTitle;
export default Card;
