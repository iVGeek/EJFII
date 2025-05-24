import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import { FiDollarSign, FiCreditCard, FiCheck } from 'react-icons/fi';

// Mock Stripe integration - in a real app, you would use actual Stripe keys
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY || 'pk_test_mock_key');

const donationAmounts = [
  { amount: 10, label: '$10' },
  { amount: 25, label: '$25' },
  { amount: 50, label: '$50' },
  { amount: 100, label: '$100' },
  { amount: 250, label: '$250' },
  { amount: 500, label: '$500' },
];

const Donate: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25);
  const [customAmount, setCustomAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // In a real app, you would:
    // 1. Send the donation details to your backend
    // 2. Create a Stripe Checkout session
    // 3. Redirect to Stripe for payment

    // Mock implementation
    try {
      const amount = selectedAmount || parseInt(customAmount) || 0;
      if (amount <= 0) {
        alert('Please enter a valid donation amount');
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
    } catch (error) {
      console.error('Error processing donation:', error);
      alert('There was an error processing your donation. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 flex items-center justify-center"
      >
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden text-center p-8">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
            <FiCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Thank you for your donation!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Your contribution will help us provide mental health resources to those in need.
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg"
          >
            Make another donation
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900"
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Support Our Mission</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Your donation helps us provide mental health resources and support to those in need.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-full bg-primary/10 mr-4">
                <FiDollarSign className="text-primary text-xl" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Make a Donation</h2>
            </div>

            <form onSubmit={handleDonate}>
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 mb-3">Donation Amount</label>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {donationAmounts.map((item) => (
                    <button
                      key={item.amount}
                      type="button"
                      onClick={() => {
                        setSelectedAmount(item.amount);
                        setCustomAmount('');
                      }}
                      className={`py-2 px-4 rounded-lg border ${
                        selectedAmount === item.amount
                          ? 'border-primary bg-primary/10 text-primary dark:text-orange-300'
                          : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    placeholder="Custom amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Payment Method</label>
                <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
                  <div className="flex items-center">
                    <FiCreditCard className="text-gray-500 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">Credit or Debit Card</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Secure payment processed by Stripe
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  `Donate $${selectedAmount || customAmount || '0'}`
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>EJ Foundation is a 501(c)(3) nonprofit organization. Donations are tax-deductible.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Donate;
