export default function ResultModal({ result, finalPrice }) {
    return (
      <div className="mt-8 text-center animate__animated animate__fadeIn">
        <div className="text-5xl font-extrabold text-yellow-400">{result}</div>
        {finalPrice && (
          <div className="mt-6 text-xl text-gray-300">
            Final BTC Price: ${finalPrice}
          </div>
        )}
      </div>
    );
  }
  