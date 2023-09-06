export function throttle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  let lastCall = 0;

  return (...args: Parameters<T>) => {
    const now = new Date().getTime();

    if (now - lastCall < delay) {
      return;
    }

    lastCall = now;
    return callback(...args);
  };
}
