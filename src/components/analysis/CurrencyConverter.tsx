import React, { useState } from 'react';
import type { City } from '../../types';

interface CurrencyConverterProps {
  city: City;
}

export function CurrencyConverter({ city }: CurrencyConverterProps) {
  const [amount, setAmount] = useState(1000);
  const exchangeRate = 1; // In a real app, fetch from API

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Currency Converter</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Amount (USD)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="p-4 bg-gray-50 rounded-md">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Local Currency</span>
            <span className="font-medium">${(amount * exchangeRate).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}