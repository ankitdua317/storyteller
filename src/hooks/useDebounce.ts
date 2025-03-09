import { useCallback, useEffect, useRef } from "react";

export default function useDebounce<
  T extends string | number | boolean | object | Array<unknown>,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  K extends Function
>(callback: K, delay: number) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  const debouncedFunction = useCallback(
    (...params: T[]) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = window.setTimeout(() => callback(...params), delay);
    },
    [callback, delay]
  );

  return debouncedFunction;
}
