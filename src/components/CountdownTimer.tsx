import { useEffect, useState } from 'react';

export default function CountdownTimer({ countdown, setResult, setFinalPrice, lockedPrice, prediction }) {
  const [timeLeft, setTimeLeft] = useState(countdown);

  useEffect(() => {
    if (timeLeft === 0) {
      fetchFinalPrice();
    } else {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const fetchFinalPrice = async () => {
    try {
      const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
      const data = await res.json();
      setFinalPrice(data.bitcoin.usd);

      if ((prediction === 'Up' && data.bitcoin.usd > lockedPrice) || (prediction === 'Down' && data.bitcoin.usd < lockedPrice)) {
        setResult('You Won!');
      } else {
        setResult('You Lost!');
      }
    } catch (error) {
      console.error('Error fetching final BTC price:', error);
    }
  };

  return (
    <div className="mt-8 text-3xl font-bold text-yellow-400">
      <div className="text-xl">Time Left: {timeLeft}s</div>
      <div className="mt-4 h-2 bg-gray-700 rounded-full">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-red-600 transition-all duration-1000"
          style={{ width: `${(timeLeft / countdown) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
