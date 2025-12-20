import React from "react";

function PackageRecomandation() {
  const recommendations = [
    { name: "Paket Recom 1", price: 20000 },
    { name: "Paket Recom 2", price: 25000 },
    { name: "Paket Recom 3", price: 30000 },
    { name: "Paket Recom 4", price: 28000 },
    { name: "Paket Recom 5", price: 26000 },
    { name: "Paket Recom 6", price: 24000 },
  ];

  const MAX = 5;

  return (
    <div className="mt-5 bg-white shadow-xl rounded-xl p-4 space-y-6">
      {/* My Package */}
      <div className="space-y-3 overflow-x-auto">
        <h2 className="font-semibold text-lg text-gray-900">Paket Saya</h2>

        {recommendations.map((item, i) => (
          <div
            key={i}
            className="inline-flex items-center justify-between px-4 py-3 border rounded-xl shadow-sm gap-4 active:scale-[0.98] transition bg-white mx-auto"
            style={{ width: "fit-content" }}
          >
            <div>
              <h3 className="font-semibold text-gray-800">{item.name}</h3>
              <h4 className="text-gray-500 text-sm">
                Rp {item.price.toLocaleString()}
              </h4>
            </div>

            <button className="bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
              Beli lagi
            </button>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="space-y-3">
        <h2 className="font-semibold text-lg text-gray-900">Rekomendasi</h2>

        {recommendations.map((item, i) => (
          <div
            key={i}
            className="inline-flex items-center justify-between px-4 py-3 border rounded-xl shadow-sm gap-4 active:scale-[0.98] transition bg-white mx-auto"
            style={{ width: "fit-content" }}
          >
            <div>
              <h3 className="font-semibold text-gray-800">{item.name}</h3>
              <h4 className="text-gray-500 text-sm">
                Rp {item.price.toLocaleString()}
              </h4>
            </div>

            <button className="bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
              Beli
            </button>
          </div>
        ))}

        {/* Show More Button */}
        {recommendations.length > MAX && (
          <div className="text-center pt-2"></div>
        )}
      </div>
    </div>
  );
}

export default PackageRecomandation;
