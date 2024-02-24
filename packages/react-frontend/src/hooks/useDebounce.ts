import { useState, useEffect } from "react";

export function useDebounce(
  value: string,
  delay: number = 500,
  minLen: number = 3
) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (value.length < minLen) {
        return;
      }

      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, minLen]);

  return debouncedValue;
}
