import { useEffect, useState } from 'react';

const RandomDecrement = () => {
  const calculateMinutesRemaining = () => {
    const currentDate = new Date();
    const yearEnd = new Date(currentDate.getFullYear(), 11, 31, 23, 59, 59);
    const remainingMilliseconds = yearEnd - currentDate;
    const remainingMinutes = Math.floor(remainingMilliseconds / (1000 * 60));
    return Math.floor(remainingMinutes / 5);
  };

  const [number, setNumber] = useState(calculateMinutesRemaining());

  useEffect(() => {
    const decrementNumber = () => {
      // Generate a random decrement between 1 and 3
      const decrement = Math.floor(Math.random() * 3) + 1;
      setNumber((prevNumber) => Math.max(prevNumber - decrement, 0));
    };

    // Set an interval with a random time between 3 and 45 seconds
    const intervalTime = Math.floor(Math.random() * (45000 - 3000 + 1)) + 3000;
    const interval = setInterval(decrementNumber, intervalTime);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p>{number} timeslots left</p>
    </div>
  );
};

export default RandomDecrement;
