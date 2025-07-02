import { useState } from 'react';
import { motion } from 'framer-motion';
import EmailQuote from './EmailQuote'; // Adjust path as needed
import ScheduleModal from './ScheduleModal'; // Adjust path as needed
import Skeleton from './Skeleton'; // Import the Skeleton component

export default function QuoteResults({ quote, restart, isLoading = false }) {
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  // Show skeleton while loading
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-lg mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6"
      >
        {/* Header skeleton */}
        <div className="text-center mb-6">
          <Skeleton className="h-8 w-48 mx-auto mb-2" />
          <Skeleton className="h-4 w-64 mx-auto" />
        </div>

        {/* Quote details skeleton */}
        <div className="space-y-4 mb-8">
          <div className="flex justify-between border-b pb-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
          
          {/* Additional services skeleton */}
          <div>
            <Skeleton className="h-4 w-32 mb-2" />
            <div className="space-y-2 pl-4">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-12" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          </div>

          {/* Total skeleton */}
          <div className="flex justify-between border-t pt-2">
            <Skeleton className="h-6 w-12" />
            <Skeleton className="h-6 w-20" />
          </div>

          {/* Footer info skeleton */}
          <div className="space-y-2 mt-4">
            <Skeleton className="h-3 w-48" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      
        {/* Email quote skeleton */}
        <Skeleton className="h-12 w-full mb-4" />
      
        {/* Buttons skeleton */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Skeleton className="flex-1 h-12" />
          <Skeleton className="flex-1 h-12" />
        </div>
      </motion.div>
    );
  }

  // Show actual content when not loading
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-lg mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-green-700 mb-2">Your Custom Quote</h2>
        <p className="text-gray-600">Here's your personalized lawn care estimate</p>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium">Base Service:</span>
          <span>${quote.basePrice}</span>
        </div>
        
        {quote.additionalServices.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">Additional Services:</h3>
            <div className="space-y-2 pl-4">
              {quote.additionalServices.map(service => (
                <div key={service.id} className="flex justify-between">
                  <span>{service.name}</span>
                  <span>+${service.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between border-t pt-2 font-bold text-lg">
          <span>Total:</span>
          <span>${quote.totalPrice}</span>
        </div>

        <div className="text-sm text-gray-500 mt-4">
          <p>* This quote is valid for 30 days</p>
          <p>* Frequency: {quote.frequency}</p>
        </div>
      </div>
    
      <EmailQuote quoteId={quote.id} />
    
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={restart}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg transition"
        >
          Start New Quote
        </button>
        
        <button 
          onClick={() => setShowScheduleModal(true)}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition"
        >
          Schedule Service
        </button>
      </div>

      {/* Modal appears when showScheduleModal is true */}
      {showScheduleModal && (
        <ScheduleModal 
          quoteId={quote.id} 
          onClose={() => setShowScheduleModal(false)} 
        />
      )}
    </motion.div>
  )
}