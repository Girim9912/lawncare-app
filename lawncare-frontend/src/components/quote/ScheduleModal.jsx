// src/components/quote/ScheduleModal.jsx
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { api } from '../../services/api';

export default function ScheduleModal({ quoteId, onClose }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => 
      api.post('/schedules', { ...data, quoteId }),
    onSuccess: () => setIsSuccess(true),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ date, time, name, phone });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        {isSuccess ? (
          <div className="text-center p-6">
            <div className="text-green-600 text-2xl mb-2">✓</div>
            <h3 className="text-xl font-bold mb-2">Scheduled Successfully!</h3>
            <p className="mb-4">We'll see you on {date} at {time}</p>
            <button
              onClick={onClose}
              className="bg-green-600 text-white px-6 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6">
            <h3 className="text-xl font-bold mb-4">Schedule Your Service</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Time</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {isPending ? 'Scheduling...' : 'Confirm'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}