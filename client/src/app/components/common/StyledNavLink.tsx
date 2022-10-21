import React from 'react';
import { StyledNavLinkProps } from '../../types/types';
import { NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { getLinkStyle } from '../../utils/getLinkStyle';

const StyledNavLink = ({
  children,
  styleType = 'default',
  className,
  to,
  ...rest
}: StyledNavLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        twMerge(
          className || '',
          getLinkStyle(styleType),
          styleType === 'default' && isActive && 'text-blue-300'
        )
      }
      {...rest}
    >
      {children}
    </NavLink>
  );
};
export default StyledNavLink;
