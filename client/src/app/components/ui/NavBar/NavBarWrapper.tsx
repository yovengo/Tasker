import React from 'react';
import { WrapperComponentProps } from '../../../types/types';
import ScreenWidthWrapper from '../../common/ScreenWidthWrapper';

const NavBarWrapper = ({ children }: WrapperComponentProps) => {
  return (
    <div className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 bg-white/95 supports-backdrop-blur:bg-white/65">
      <ScreenWidthWrapper>
        <div className="py-4 px-4">
          <div className="relative flex items-center">{children}</div>
        </div>
      </ScreenWidthWrapper>
    </div>
  );
};
export default NavBarWrapper;
