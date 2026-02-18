
import React, { useState } from 'react';
import { Expense, Deposit } from '../types';
import CurrencyIcon from './CurrencyIcon';

interface HistoryTableProps {
  expenses: Expense[];
  deposits: Deposit[];
  onDeleteExpense: (id: string) => void;
  onDeleteDeposit: (id: string) => void;
}

const HistoryTable: React.FC<HistoryTableProps> = ({ 
  expenses, 
  deposits, 
  onDeleteExpense, 
  onDeleteDeposit 
}) => {
  const [activeTab, setActiveTab] = useState<'expenses' | 'deposits'>('expenses');

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex border-b border-gray-100">
        <button 
          onClick={() => setActiveTab('expenses')}
          className={`flex-1 py-4 text-sm font-bold transition-all ${activeTab === 'expenses' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/30' : 'text-gray-500 hover:text-gray-700'}`}
        >
          খরচের তালিকা
        </button>
        <button 
          onClick={() => setActiveTab('deposits')}
          className={`flex-1 py-4 text-sm font-bold transition-all ${activeTab === 'deposits' ? 'text-green-600 border-b-2 border-green-600 bg-green-50/30' : 'text-gray-500 hover:text-gray-700'}`}
        >
          জমার তালিকা
        </button>
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        {activeTab === 'expenses' ? (
          <div className="p-0">
            {expenses.length === 0 ? (
              <div className="p-8 text-center text-gray-400 italic">কোন খরচ রেকর্ড নেই</div>
            ) : (
              <table className="w-full text-left">
                <thead className="sticky top-0 bg-gray-50 shadow-sm z-10">
                  <tr>
                    <th className="px-4 py-2 text-xs font-semibold text-gray-500">তারিখ</th>
                    <th className="px-4 py-2 text-xs font-semibold text-gray-500">নাম</th>
                    <th className="px-4 py-2 text-xs font-semibold text-gray-500 text-right uppercase">টাকা</th>
                    <th className="px-4 py-2 text-xs font-semibold text-gray-500"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {expenses.map(exp => (
                    <tr key={exp.id} className="hover:bg-gray-50 group">
                      <td className="px-4 py-3 text-sm text-gray-600">{exp.date}</td>
                      <td className="px-4 py-3">
                        <div className="mb-0.5">
                          <span className="bg-indigo-600 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase shadow-sm">
                            {exp.roommateName}
                          </span>
                        </div>
                        <div className="text-[10px] text-gray-400 uppercase">{exp.category}</div>
                      </td>
                      <td className="px-4 py-3 text-sm font-bold text-gray-900 text-right">
                        <div className="flex items-center justify-end">
                          <CurrencyIcon className="w-3.5 h-3.5" />
                          {exp.amount.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button 
                          onClick={() => onDeleteExpense(exp.id)}
                          className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          title="মুছে ফেলুন"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ) : (
          <div className="p-0">
            {deposits.length === 0 ? (
              <div className="p-8 text-center text-gray-400 italic">কোন জমা রেকর্ড নেই</div>
            ) : (
              <table className="w-full text-left">
                <thead className="sticky top-0 bg-gray-50 shadow-sm z-10">
                  <tr>
                    <th className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">নাম</th>
                    <th className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase text-right">জমা টাকা</th>
                    <th className="px-4 py-2 text-xs font-semibold text-gray-500"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {deposits.map(dep => (
                    <tr key={dep.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <span className="bg-indigo-600 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase shadow-sm">
                          {dep.roommateName}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-bold text-green-600 text-right">
                        <div className="flex items-center justify-end">
                          <CurrencyIcon className="w-3.5 h-3.5" />
                          {dep.amount.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button 
                          onClick={() => onDeleteDeposit(dep.id)}
                          className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryTable;
