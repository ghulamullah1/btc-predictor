import { useEffect, useState } from 'react';

export default function PriceDisplay() {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await res.json();
        setPrice(data.bitcoin.usd);
      } catch (error) {
        console.error('Error fetching BTC price:', error);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center text-4xl font-extrabold text-yellow-500 animate-pulse mt-8">
      {price ? `₿ 1 BTC = $${price}` : 'Loading price...'}
    </div>
  );
}
