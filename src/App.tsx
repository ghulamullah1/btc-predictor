import { useState } from 'react';
import PriceDisplay from './components/PriceDisplay';
import PredictionControls from './components/PredictionControls';
import CountdownTimer from './components/CountdownTimer';
import ResultModal from './components/ResultModal';

function App() {
  const [lockedPrice, setLockedPrice] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const [result, setResult] = useState(null);
  const [finalPrice, setFinalPrice] = useState(null);

  const handleConfirm = (userPrediction:any, timer:any) => {
    setPrediction(userPrediction);
    setLockedPrice(null);
    setResult(null);
    setFinalPrice(null);
    setCountdown(timer);
    fetchPriceOnConfirm();
  };

  const fetchPriceOnConfirm = async () => {
    try {
      const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
      const data = await res.json();
      setLockedPrice(data.bitcoin.usd);
    } catch (error) {
      console.error('Error fetching BTC price:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-5xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600">
        BTC Price Prediction Game
      </h1>
      <PriceDisplay />
      {lockedPrice && (
        <div className="mt-8 text-xl text-yellow-300">Price Locked at: ${lockedPrice}</div>
      )}
      
      {!result && !lockedPrice && <PredictionControls onConfirm={handleConfirm} />}
      
      {countdown > 0 && !result && (
        <CountdownTimer countdown={countdown} setResult={setResult} setFinalPrice={setFinalPrice} lockedPrice={lockedPrice} prediction={prediction} />
      )}
      
      {result && <ResultModal result={result} finalPrice={finalPrice} />}
    </div>
  );
}

export default App;
