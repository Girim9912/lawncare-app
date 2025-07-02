// src/components/quote/PriceBreakdownModal.jsx
import { useState } from 'react';

export default function PriceBreakdownModal() {
  const [isOpen, setIsOpen] = useState(false);

  const pricingInfo = {
    mowing: {
      base: 0.10,
      description: "Standard mowing with cleanup"
    },
    fertilizing: {
      base: 0.15,
      description: "Premium fertilizer application"
    },
    aeration: {
      base: 0.20,
      description: "Core aeration with cleanup"
    },
    full: {
      base: 0.25,
      description: "Complete lawn care package"
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-sm text-green-600 hover:text-green-800 ml-2"
      >
        View pricing details
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Service Pricing Details</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              {Object.entries(pricingInfo).map(([key, info]) => (
                <div key={key} className="border-b pb-3">
                  <h4 className="font-medium capitalize">{key}</h4>
                  <p className="text-sm text-gray-600">{info.description}</p>
                  <p className="text-sm mt-1">
                    <span className="font-medium">${info.base.toFixed(2)}</span> per sq ft
                  </p>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="mt-6 w-full bg-green-600 text-white py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}