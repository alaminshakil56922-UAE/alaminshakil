
import React, { useState, useEffect } from 'react';
import { Expense, Roommate } from '../types';
import { CATEGORIES } from '../constants';

interface ExpenseFormProps {
  onAdd: (expense: Omit<Expense, 'id'>) => void;
  roommates: Roommate[];
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAdd, roommates }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    roommateName: '',
    amount: '',
    description: '',
    category: CATEGORIES[0]
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
      date: formData.date,
      roommateName: formData.roommateName,
      amount: parseFloat(formData.amount),
      description: formData.description,
      category: formData.category
    });

    setFormData({
      ...formData,
      amount: '',
      description: ''
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
        <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        নতুন বাজার খরচ এন্ট্রি
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">তারিখ</label>
            <input 
              type="date" 
              required
              value={formData.date}
              onChange={e => setFormData({...formData, date: e.target.value})}
              className="w-full px-4 py-2 bg-indigo-600 text-white font-bold border border-indigo-700 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition-all cursor-pointer shadow-sm [color-scheme:dark]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">কে খরচ করেছে</label>
            <select 
              value={formData.roommateName}
              onChange={e => setFormData({...formData, roommateName: e.target.value})}
              className="w-full px-4 py-2 bg-indigo-600 text-white font-bold border border-indigo-700 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition-all cursor-pointer shadow-sm"
            >
              {roommates.map(r => <option key={r.id} value={r.name} className="bg-white text-gray-900 font-normal">{r.name}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">ক্যাটাগরি</label>
          <select 
            value={formData.category}
            onChange={e => setFormData({...formData, category: e.target.value})}
            className="w-full px-4 py-2 bg-indigo-600 text-white font-bold border border-indigo-700 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition-all cursor-pointer shadow-sm"
          >
            {CATEGORIES.map(cat => <option key={cat} value={cat} className="bg-white text-gray-900 font-normal">{cat}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-1">
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">টাকার পরিমাণ</label>
            <input 
              type="number" 
              placeholder="0.00"
              required
              value={formData.amount}
              onChange={e => setFormData({...formData, amount: e.target.value})}
              className="w-full px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold text-blue-900"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-indigo-600 uppercase mb-1 tracking-tight">বিস্তারিত (ঐচ্ছিক)</label>
            <input 
              type="text" 
              placeholder="যেমন: আলু, পেঁয়াজ, ডিম..."
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-2 bg-indigo-50/50 border border-indigo-100 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-indigo-900 font-medium placeholder:text-indigo-300"
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-colors flex items-center justify-center space-x-2"
        >
          <span>যোগ করুন</span>
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
