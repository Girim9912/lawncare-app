import { useState } from 'react'

export default function QuoteForm({ formData, setFormData, nextStep }) {
  const [errors, setErrors] = useState({})

  const serviceTypes = [
    { id: 'mowing', name: 'Lawn Mowing' },
    { id: 'fertilizing', name: 'Fertilizing' },
    { id: 'aeration', name: 'Aeration' },
    { id: 'full', name: 'Full Service' },
  ]

  const frequencies = [
    { id: 'weekly', name: 'Weekly' },
    { id: 'biweekly', name: 'Bi-Weekly' },
    { id: 'monthly', name: 'Monthly' },
  ]

  const additionalOptions = [
    { id: 'edging', name: 'Edging', price: 15 },
    { id: 'trimming', name: 'Bush Trimming', price: 25 },
    { id: 'mulching', name: 'Mulching', price: 50 },
  ]

  const validate = () => {
    const newErrors = {}
    if (!formData.lawnSize) newErrors.lawnSize = 'Lawn size is required'
    if (!formData.address) newErrors.address = 'Address is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = (e) => {
    e.preventDefault()
    if (validate()) nextStep()
  }

  const handleCheckboxChange = (service) => {
    setFormData(prev => ({
      ...prev,
      additionalServices: prev.additionalServices.includes(service)
        ? prev.additionalServices.filter(s => s !== service)
        : [...prev.additionalServices, service]
    }))
  }

  return (
    <form onSubmit={handleNext} className="max-w-lg mx-auto">
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Lawn Size (sq ft)</label>
        <input
          type="number"
          value={formData.lawnSize}
          onChange={(e) => setFormData({...formData, lawnSize: e.target.value})}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        {errors.lawnSize && <p className="text-red-500 text-sm mt-1">{errors.lawnSize}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Service Type</label>
        <div className="grid grid-cols-2 gap-4">
          {serviceTypes.map((service) => (
            <label key={service.id} className="flex items-center space-x-2">
              <input
                type="radio"
                checked={formData.serviceType === service.id}
                onChange={() => setFormData({...formData, serviceType: service.id})}
                className="text-green-600 focus:ring-green-500"
              />
              <span>{service.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Service Frequency</label>
        <div className="grid grid-cols-3 gap-4">
          {frequencies.map((freq) => (
            <label key={freq.id} className="flex items-center space-x-2">
              <input
                type="radio"
                checked={formData.frequency === freq.id}
                onChange={() => setFormData({...formData, frequency: freq.id})}
                className="text-green-600 focus:ring-green-500"
              />
              <span>{freq.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Additional Services</label>
        <div className="space-y-2">
          {additionalOptions.map((option) => (
            <label key={option.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.additionalServices.includes(option.id)}
                  onChange={() => handleCheckboxChange(option.id)}
                  className="text-green-600 focus:ring-green-500"
                />
                <span>{option.name}</span>
              </div>
              <span className="text-gray-600">+${option.price}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Property Address</label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
      >
        Continue
      </button>
    </form>
  )
}