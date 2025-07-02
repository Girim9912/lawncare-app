// src/components/quote/LawnSizeEstimator.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';

export default function LawnSizeEstimator({ value, onChange }) {
  const [showEstimator, setShowEstimator] = useState(false);
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');

  const calculateSize = () => {
    const w = parseFloat(width);
    const l = parseFloat(length);
    if (isNaN(w) || isNaN(l)) return;
    const size = w * l;
    onChange(size.toString());
    setShowEstimator(false);
  };

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={() => setShowEstimator(!showEstimator)}
        className="text-sm text-green-600 hover:text-green-800"
      >
        {showEstimator ? 'Hide estimator' : 'Not sure? Estimate your lawn size'}
      </button>

      {showEstimator && (
        <div className="mt-3 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-3">Measure Your Lawn</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1" htmlFor="lawn-width">
                Width (ft)
              </label>
              <input
                id="lawn-width"
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                aria-label="Lawn width in feet"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1" htmlFor="lawn-length">
                Length (ft)
              </label>
              <input
                id="lawn-length"
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                aria-label="Lawn length in feet"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={calculateSize}
            disabled={isNaN(parseFloat(width)) || isNaN(parseFloat(length))}
            className="mt-3 bg-green-600 text-white px-4 py-2 rounded text-sm disabled:bg-gray-300"
          >
            Calculate Size
          </button>
          {value && (
            <p className="mt-2 text-sm">
              Estimated size: <strong>{value} sq ft</strong>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

LawnSizeEstimator.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
