import { useEffect, useState } from 'react';

export default function AutoTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      setSeconds((previousSeconds) => previousSeconds + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  return (
    <div className="timer-box">
      <span>
        Chronomètre automatique : <strong>{seconds}s</strong>
      </span>
      <button
        className="btn"
        style={{ padding: '4px 10px', fontSize: '0.8rem' }}
        onClick={() => setIsRunning((running) => !running)}
      >
        {isRunning ? 'Pause' : 'Reprendre'}
      </button>
    </div>
  );
}
