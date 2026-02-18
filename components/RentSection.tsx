
import React, { useState } from 'react';
import { RentMember, RentPayment } from '../types';
import CurrencyIcon from './CurrencyIcon';

interface RentSectionProps {
  currentMonth: string;
  members: RentMember[];
  payments: RentPayment[];
  onAddMember: (name: string) => void;
  onDeleteMember: (id: string) => void;
  onAddPayment: (memberId: string, amount: number) => void;
  onDeletePayment: (id: string) => void;
}

const RentSection: React.FC<RentSectionProps> = ({
  currentMonth,
  members,
  payments,
  onAddMember,
  onDeleteMember,
  onAddPayment,
  onDeletePayment
}) => {
  const [newMemberName, setNewMemberName] = useState('');
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const [rentAmount, setRentAmount] = useState('');

  const monthlyPayments = payments.filter(p => p.month === currentMonth);

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;
    onAddMember(newMemberName.toUpperCase());
    setNewMemberName('');
  };

  const handleAddPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMemberId || !rentAmount) return;
    onAddPayment(selectedMemberId, parseFloat(rentAmount));
    setRentAmount('');
  };

  return (
    <div className="mt-12 bg-white rounded-2xl shadow-md border-t-4 border-purple-600 overflow-hidden">
      <div className="p-6 bg-purple-50 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-purple-100">
        <div>
          <h2 className="text-2xl font-bold text-purple-900 flex items-center">
            <svg className="w-7 h-7 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            রুম ভাড়া ম্যানেজমেন্ট (Room Rent)
          </h2>
          <p className="text-purple-600 text-sm font-medium mt-1">এটি বাজার খরচের হিসাব থেকে সম্পূর্ণ আলাদা</p>
        </div>
        <div className="mt-4 sm:mt-0 bg-purple-600 text-white px-4 py-2 rounded-lg font-bold shadow-sm">
          মাস: {currentMonth}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
        {/* Member List & Management */}
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">ভাড়া মেম্বার লিস্ট</h3>
            <div className="space-y-2">
              {members.map(m => (
                <div key={m.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 group">
                  <span className="font-bold text-gray-700">{m.name}</span>
                  <button 
                    onClick={() => onDeleteMember(m.id)}
                    className="p-1 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={handleAddMember} className="pt-4 border-t border-gray-100">
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">নতুন মেম্বার নাম</label>
            <div className="flex space-x-2">
              <input 
                type="text" 
                value={newMemberName}
                onChange={e => setNewMemberName(e.target.value)}
                placeholder="নাম লিখুন"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button type="submit" className="bg-purple-600 text-white px-3 py-2 rounded-lg text-sm font-bold hover:bg-purple-700 transition-colors">
                যোগ
              </button>
            </div>
          </form>
        </div>

        {/* Payment Entry */}
        <div className="p-6 bg-gray-50/30">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">ভাড়া এন্ট্রি করুন</h3>
          <form onSubmit={handleAddPayment} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">মেম্বার নির্বাচন</label>
              <select 
                value={selectedMemberId}
                onChange={e => setSelectedMemberId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                required
              >
                <option value="">নির্বাচন করুন</option>
                {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">ভাড়ার পরিমাণ</label>
              <input 
                type="number" 
                value={rentAmount}
                onChange={e => setRentAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 bg-white font-bold"
                required
              />
            </div>
            <button type="submit" className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 shadow-md transition-all active:scale-95">
              ভাড়া জমা করুন
            </button>
          </form>
          
          <div className="mt-8 p-4 bg-white border border-purple-100 rounded-xl">
            <h4 className="text-xs font-bold text-purple-700 mb-2 uppercase">এই মাসের মোট সংগৃহীত ভাড়া</h4>
            <div className="text-2xl font-black text-purple-900 flex items-center">
              <CurrencyIcon className="w-6 h-6" />
              {monthlyPayments.reduce((sum, p) => sum + p.amount, 0).toFixed(2)}
            </div>
          </div>
        </div>

        {/* Status Report */}
        <div className="p-6 overflow-x-auto">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">ভাড়া স্ট্যাটাস ({currentMonth})</h3>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-2 text-[10px] font-bold text-gray-400 uppercase">নাম</th>
                <th className="pb-2 text-[10px] font-bold text-gray-400 uppercase text-right">পরিমাণ</th>
                <th className="pb-2 text-[10px] font-bold text-gray-400 uppercase text-center">অবস্থা</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {members.map(m => {
                const payment = monthlyPayments.find(p => p.memberId === m.id);
                return (
                  <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 text-sm font-bold text-gray-700">{m.name}</td>
                    <td className="py-3 text-sm text-right font-medium text-gray-900">
                      {payment ? (
                        <div className="flex items-center justify-end">
                          <CurrencyIcon className="w-3.5 h-3.5" />
                          {payment.amount.toFixed(2)}
                        </div>
                      ) : '---'}
                    </td>
                    <td className="py-3 text-center">
                      {payment ? (
                        <span className="px-2 py-1 rounded-md bg-green-100 text-green-700 text-[10px] font-bold uppercase">
                          Paid
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-md bg-red-100 text-red-700 text-[10px] font-bold uppercase">
                          Unpaid
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {monthlyPayments.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-100">
              <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-2">সাম্প্রতিক ট্রানজেকশন</h4>
              <div className="space-y-1">
                {monthlyPayments.slice().reverse().slice(0, 3).map(p => (
                  <div key={p.id} className="flex justify-between items-center text-[10px] text-gray-500">
                    <span>{p.memberName}</span>
                    <button onClick={() => onDeletePayment(p.id)} className="text-red-300 hover:text-red-500">মুছুন</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RentSection;
