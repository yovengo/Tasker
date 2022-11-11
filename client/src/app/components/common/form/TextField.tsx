import { useState } from 'react';
import { TextFieldProps } from '../../../types/types';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const TextField = ({ type, name, label, placeholder, field, error, Icon }: TextFieldProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const errorStyle: string =
    'mt-1 text-slate-500 ring-blue-700 ring-opacity-5 appearance-none rounded block w-full   sm:text-sm -bottom-6 ';
  const getInputClasses = (): string => {
    return (
      'w-full py-2 rounded text-sm dark:bg-gray-700 h-12 focus:outline-none bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-300 shadow-sm rounded-lg text-slate-400 pr-2 ' +
      (Icon ? 'pl-3 xs:pl-12' : 'pl-3') +
      (error ? ' ring-1 ring-blue-500 focus:border-blue-700 focus:ring-blue-700 focus:' : '')
    );
  };

  const toggleShowPassword = (): void => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="relative my-3 form-outline">
      {label && <label htmlFor={name}>{label}</label>}
      <div className="relative text-slate-500">
        {Icon && <Icon className="h-6 w-6 absolute z-10 inset-y-3 left-4 hidden xs:inline-block" />}
        <input
          id={name}
          type={showPassword ? 'text' : type}
          placeholder={placeholder}
          className={getInputClasses()}
          {...field}
        />

        {type === 'password' && (
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute inset-y-0.5 right-2.5 btn btn-outline-secondary text-slate-500"
          >
            {showPassword ? (
              <EyeIcon className="absolute top-3 right-0 w-6 h-6" />
            ) : (
              <EyeSlashIcon className="absolute top-3 right-0 w-6 h-6" />
            )}
          </button>
        )}
        {error ? <div className={errorStyle + 'text-end'}>{error.message}</div> : null}
      </div>
    </div>
  );
};
TextField.defaultProps = {
  type: 'text',
};

export default TextField;
