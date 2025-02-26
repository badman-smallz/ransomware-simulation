import { useState, useEffect } from "react";

const CountdownTimer = ({ startTime, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState(startTime);

  useEffect(() => {
    if (timeLeft === 0) {
      onExpire();
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft, onExpire]);

  // Format time as mm:ss
  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  return <div>Time Left: {minutes}:{seconds}</div>;
};

export default CountdownTimer;
