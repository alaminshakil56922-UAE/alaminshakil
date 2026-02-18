
import React, { useState, useEffect } from 'react';
import { Deposit, Roommate } from '../types';

interface DepositFormProps {
  onAdd: (deposit: Omit<Deposit, 'id'>) => void;
  roommates: Roommate[];
  currentMonth: string;
}

const DepositForm: React.FC<DepositFormProps> = ({ onAdd, roommates, currentMonth }) => {
  const [formData, setFormData] = useState({
    roommateName: '',
    amount: ''
  });

  useEffect(() => {
    if (roommates.length > 0 && !formData.roommateName) {
      setFormData(prev => ({ ...prev, roommateName: roommates[0].name }));
    }
  }, [roommates]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || parseFloat(formData.amount) <= 0 || !formData.roommateName) return;
    
    onAdd({
      roommateName: formData.roommateName,
      amount: parseFloat(formData.amount),
      month: currentMonth
    });

    setFormData({
      ...formData,
      amount: ''
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
        <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        টাকা জমা দিন (Deposit)
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">রুমমেট</label>
            <select 
              value={formData.roommateName}
              onChange={e => setFormData({...formData, roommateName: e.target.value})}
              className="w-full px-4 py-2 bg-indigo-600 text-white font-bold border border-indigo-700 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition-all cursor-pointer shadow-sm"
            >
              {roommates.map(r => <option key={r.id} value={r.name} className="bg-white text-gray-900 font-normal">{r.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">জমা টাকার পরিমাণ</label>
            <input 
              type="number" 
              placeholder="0.00"
              required
              value={formData.amount}
              onChange={e => setFormData({...formData, amount: e.target.value})}
              className="w-full px-4 py-2 bg-green-50 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition-all font-bold text-green-900"
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-colors flex items-center justify-center"
        >
          জমা করুন
        </button>
      </form>
    </div>
  );
};

export default DepositForm;
