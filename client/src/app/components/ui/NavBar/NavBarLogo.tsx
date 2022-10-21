import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavBarLogoProps } from '../../../types/types';
import TaskerLogo from '../../../assets/img/TaskerLogo';

const NavBarLogo = ({ link, label }: NavBarLogoProps) => {
  return (
    <NavLink
      to={link}
      className="flex mr-3 flex-none overflow-hidden md:w-auto text-slate-200 items-center"
    >
      <TaskerLogo />
      <span className="text-slate-800 mx-4 font-bold">{label}</span>
    </NavLink>
  );
};
export default NavBarLogo;
