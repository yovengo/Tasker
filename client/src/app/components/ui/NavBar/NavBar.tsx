import React from 'react';
import { NavBarLinkList, NavBarLogo, NavBarWrapper } from './index';
import StyledNavLink from '../../common/StyledNavLink';
import { useAppSelector } from '../../../store/hook';
import { getIsLoggedIn } from '../../../store/usersSlice';
import ThemeSwitch from '../../common/ThemeSwitch';

const NavBar = () => {
  const isLoggedIn = useAppSelector(getIsLoggedIn());

  return (
    <NavBarWrapper>
      <NavBarLogo link="/" label="Tasker" />
      <NavBarLinkList>
        {isLoggedIn ? (
          <>
            <StyledNavLink to="/about">About</StyledNavLink>
            <ThemeSwitch />
          </>
        ) : (
          <>
            <ThemeSwitch />
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
