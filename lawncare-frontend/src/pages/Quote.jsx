import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { getQuote } from '../services/api'
import QuoteForm from '../components/quote/QuoteForm'
import QuoteResults from '../components/quote/QuoteResults'
import LoadingSpinner from '../components/ui/LoadingSpinner'

export default function Quote() {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('lawncareQuoteDraft');
    return saved ? JSON.parse(saved) : {
        lawnSize: '',
        serviceType: 'mowing',
        frequency: 'weekly',
        address: '',
        additionalServices: [],
    };
    });

    useEffect(() => {
        localStorage.setItem('lawncareQuoteDraft', JSON.stringify(formData));
        }, [formData]);

     
  const { mutate, isPending, isError, error, data } = useMutation({
    mutationFn: getQuote,
    onSuccess: () => setStep(3),
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    mutate(formData)
  }

  if (isPending) return <LoadingSpinner />

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Get Your Free Quote</h1>
      
      {step === 1 && (
        <QuoteForm 
          formData={formData}
          setFormData={setFormData}
          nextStep={() => setStep(2)}
        />
      )}
      
      {step === 2 && (
        <div className="max-w-lg mx-auto">
          <h2 className="text-xl font-semibold mb-4">Review Your Information</h2>
          {/* Display form summary */}
          <button 
            onClick={handleSubmit}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg mt-6"
          >
            Calculate Quote
          </button>
        </div>
      )}
      
      {step === 3 && data && (
        <QuoteResults 
          quote={data}
          restart={() => {
            localStorage.removeItem('lawncareQuoteDraft');
            setStep(1);
            setFormData({
                lawnSize: '',
                serviceType: 'mowing',
                frequency: 'weekly',
                address: '',
                additionalServices: [],
            });
            }}
        />
      )}
      
      {isError && (
        <div className="text-red-500 text-center mt-4">
          Error: {error.message}
        </div>
      )}
    </div>
  )
}