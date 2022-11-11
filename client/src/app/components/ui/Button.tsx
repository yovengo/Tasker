import React from 'react';
import { ButtonProps } from '../../types/types';

const Button = ({ label, children, isValid }: ButtonProps) => (
  <button
    type="submit"
    disabled={!isValid}
    className="inline-flex w-full items-center justify-center py-3 px-5 leading-6 transition-colors shadow text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 focus:outline-none my-2"
  >
    {label || children || 'button'}
  </button>
);
export default Button;
