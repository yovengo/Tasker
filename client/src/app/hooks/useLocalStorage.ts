import { useEffect, useState } from 'react';

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const getValue = (): T => {
    const storage = localStorage.getItem(key);

    if (storage) {
      return JSON.parse(storage);
    }
    return initialValue;
  };

  const [value, setValue] = useState(getValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue] as const;
};
export default useLocalStorage;
