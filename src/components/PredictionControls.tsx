import { useState } from 'react';

export default function PredictionControls({ onConfirm }) {
  const [prediction, setPrediction] = useState(null);
  const [timer, setTimer] = useState(30);

  const handlePredictionChange = (choice) => {
    setPrediction(choice);
  };

  const handleTimerChange = (event) => {
    setTimer(event.target.value);
  };

  return (
    <div className="mt-6 space-y-6 text-center">
      <div className="flex justify-center space-x-6">
        <button
          onClick={() => handlePredictionChange('Up')}
          className={`px-8 py-3 rounded-xl text-2xl font-semibold transform transition duration-300 ease-in-out 
            ${prediction === 'Up' ? 'bg-green-600 shadow-xl' : 'bg-gray-700 hover:bg-green-500 hover:scale-105'}`}
        >
          Up
        </button>
        <button
          onClick={() => handlePredictionChange('Down')}
          className={`px-8 py-3 rounded-xl text-2xl font-semibold transform transition duration-300 ease-in-out 
            ${prediction === 'Down' ? 'bg-red-600 shadow-xl' : 'bg-gray-700 hover:bg-red-500 hover:scale-105'}`}
        >
          Down
        </button>
      </div>

      <div className="mt-6">
        <input
          type="number"
          value={timer}
          onChange={handleTimerChange}
          min="5"
          max="60"
          className="w-20 py-3 text-center bg-gray-800 rounded-xl text-white shadow-lg"
        />
        <span className="ml-2 text-lg">seconds</span>
      </div>

      <button
        onClick={() => onConfirm(prediction, timer)}
        className="mt-8 px-10 py-4 rounded-xl text-2xl font-semibold bg-blue-500 hover:bg-blue-600 transition transform hover:scale-105"
      >
        Confirm
      </button>
    </div>
  );
}
