import React from 'react';
import { NavBarLinkList, NavBarLogo, NavBarWrapper } from './index';
import StyledNavLink from '../../common/StyledNavLink';

const NavBar = () => {
  return (
    <NavBarWrapper>
      <NavBarLogo link="/" label="Tasker" />
      <NavBarLinkList>
        <StyledNavLink to="/some">Something</StyledNavLink>
        <StyledNavLink to="/tasks">Tasks</StyledNavLink>
      </NavBarLinkList>
    </NavBarWrapper>
  );
};
export default NavBar;
