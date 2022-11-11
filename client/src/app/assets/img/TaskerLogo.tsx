import React from 'react';
import { LogoProps } from '../../types/types';

const TaskerLogo = ({ style }: LogoProps) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={style}
    >
      <g clipPath="url(#a)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 0h8c1.105 0 2 1.105 2 2v36a2 2 0 0 1-2 2.001H2c-1.104 0-2-1.105-2-2V2A2 2 0 0 1 2 0Zm14 0h8c1.105 0 2 1.105 2 2v20a2 2 0 0 1-2 2h-8c-1.104 0-2-1.105-2-2V2a2 2 0 0 1 2-2Zm14 0h8c1.104 0 2 1.105 2 2v28a2 2 0 0 1-2 2h-8c-1.105 0-2-1.105-2-2V2a2 2 0 0 1 2-2Z"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h40v40H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
export default TaskerLogo;
