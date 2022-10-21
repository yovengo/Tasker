import React from 'react';
import { NavBarLinkList, NavBarLogo, NavBarWrapper } from './index';
import StyledNavLink from '../../common/StyledNavLink';
import { useAppSelector } from '../../../store/hook';
import { getIsLoggedIn } from '../../../store/usersSlice';
import NavBarThemeSwitch from './NavBarThemeSwitch';
import NavBarProfile from './NavBarProfile';

const NavBar = () => {
  const isLoggedIn = useAppSelector(getIsLoggedIn());

  return (
    <NavBarWrapper>
      <NavBarLogo link="/" label="Tasker" />
      <NavBarLinkList>
        {isLoggedIn ? (
          <>
            <StyledNavLink to="/about" className="border-r">
              About
            </StyledNavLink>
            <NavBarThemeSwitch />
            <NavBarProfile />
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
