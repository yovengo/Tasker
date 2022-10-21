import React from 'react';
import { NavBarLinkList, NavBarLogo, NavBarWrapper } from './index';
import StyledNavLink from '../../common/StyledNavLink';
import { useAppSelector } from '../../../store/hook';
import { getIsLoggedIn } from '../../../store/usersSlice';
import NavBarThemeSwitch from './NavBarThemeSwitch';

const NavBar = () => {
  const isLoggedIn = useAppSelector(getIsLoggedIn());

  return (
    <NavBarWrapper>
      <NavBarLogo link="/" label="Tasker" />
      <NavBarLinkList>
        {isLoggedIn ? (
          <>
            <StyledNavLink to="/about">About</StyledNavLink>
            <NavBarThemeSwitch />
          </>
        ) : (
          <>
            <NavBarThemeSwitch />
            <StyledNavLink to="/auth/signup" styleType="button">
              SignUp
            </StyledNavLink>
          </>
        )}
      </NavBarLinkList>
    </NavBarWrapper>
  );
};
export default NavBar;
