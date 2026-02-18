
import React, { useState } from 'react';
import { Roommate } from '../types';

interface DataCleanupProps {
  roommates: Roommate[];
  onBulkDelete: (type: 'expenses' | 'deposits', date?: string, name?: string) => void;
}

const DataCleanup: React.FC<DataCleanupProps> = ({ roommates, onBulkDelete }) => {
  const [filterDate, setFilterDate] = useState('');
  const [filterName, setFilterName] = useState('');

  return (
    <div className="bg-slate-100/80 p-6 rounded-2xl shadow-sm border border-slate-200">
      <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
        <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        ডেটা ক্লিনআপ (Bulk Delete)
      </h3>
      
      <div className="space-y-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1">তারিখ অনুযায়ী</label>
            <input 
              type="date" 
              value={filterDate}
              onChange={e => setFilterDate(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition-all"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1">মেম্বার অনুযায়ী</label>
            <select 
              value={filterName}
              onChange={e => setFilterName(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition-all"
            >
              <option value="">সকল মেম্বার</option>
              {roommates.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button 
            disabled={!filterDate && !filterName}
            onClick={() => onBulkDelete('expenses', filterDate || undefined, filterName || undefined)}
            className="w-full bg-red-600 text-white py-2 rounded-lg font-bold hover:bg-red-700 transition-all shadow-md active:scale-[0.98] disabled:bg-gray-300 disabled:cursor-not-allowed text-xs sm:text-sm"
          >
            খরচ মুছুন (Expenses)
          </button>
          <button 
            disabled={!filterName}
            onClick={() => onBulkDelete('deposits', undefined, filterName || undefined)}
            className="w-full bg-orange-600 text-white py-2 rounded-lg font-bold hover:bg-orange-700 transition-all shadow-md active:scale-[0.98] disabled:bg-gray-300 disabled:cursor-not-allowed text-xs sm:text-sm"
          >
            জমা মুছুন (Deposits)
          </button>
        </div>
        <p className="text-[10px] text-red-500 italic font-medium">
          * সতর্কবার্তা: এখান থেকে মুছে ফেলা ডাটা আর ফিরে পাওয়া সম্ভব নয়।
        </p>
      </div>
    </div>
  );
};

export default DataCleanup;
