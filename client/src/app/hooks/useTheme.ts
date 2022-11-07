import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';
import { ThemeName } from '../types/types';

const useTheme = () => {
  const [theme, setTheme] = useLocalStorage<ThemeName>('theme', null);

  const defaultTheme = (): void => {
    if (theme === null) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
      systemTheme ? setTheme('dark') : setTheme('light');
    }
  };

  useEffect(() => {
    defaultTheme();
  }, []);

  useEffect(() => {
    theme === 'dark'
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark');

    defaultTheme();
  }, [theme]);

  return [theme, setTheme] as const;
};
export default useTheme;
