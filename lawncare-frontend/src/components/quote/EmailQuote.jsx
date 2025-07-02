// src/components/quote/EmailQuote.jsx
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { api } from '../../services/api';

export default function EmailQuote({ quoteId }) {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  
  const { mutate, isPending } = useMutation({
    mutationFn: (email) => 
      api.post('/quotes/send', { email, quoteId }),
    onSuccess: () => setIsSent(true),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(email);
  };

  if (isSent) return (
    <div className="text-green-600 text-center py-4">
      Quote sent successfully!
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="mt-6 border-t pt-6">
      <h4 className="font-medium mb-3">Email this quote</h4>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          className="flex-1 px-4 py-2 border rounded-lg"
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          {isPending ? 'Sending...' : 'Send'}
        </button>
      </div>
    </form>
  );
}