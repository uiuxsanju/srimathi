import { useEffect, useState } from 'react';

export function useCountdown(target: number) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target - now);
  return {
    hours: Math.floor(diff / 3.6e6),
    minutes: Math.floor((diff % 3.6e6) / 6e4),
    seconds: Math.floor((diff % 6e4) / 1000),
    done: diff === 0,
  };
}
