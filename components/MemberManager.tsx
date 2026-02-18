
import React, { useState } from 'react';
import { Roommate, RoommateType } from '../types';

interface MemberManagerProps {
  roommates: Roommate[];
  onAdd: (r: Roommate) => void;
  onDelete: (id: string) => void;
}

const MemberManager: React.FC<MemberManagerProps> = ({ roommates, onAdd, onDelete }) => {
  const [name, setName] = useState('');
  const [joinDate, setJoinDate] = useState(new Date().toISOString().split('T')[0]);
  const [type, setType] = useState<RoommateType>('SHARED');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    onAdd({
      id: crypto.randomUUID(),
      name: name.toUpperCase(),
      joinDate,
      type
    });
    setName('');
  };

  return (
    <div className="bg-slate-100/80 p-6 rounded-2xl shadow-sm border border-slate-200">
      <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
        <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        মেম্বার ম্যানেজমেন্ট
      </h3>
      
      <form onSubmit={handleSubmit} className="mb-6 space-y-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1">নাম</label>
            <input 
              type="text" 
              placeholder="মেম্বারের নাম"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1">যোগদানের তারিখ</label>
            <input 
              type="date" 
              value={joinDate}
              onChange={e => setJoinDate(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4 py-1">
          <label className="flex items-center space-x-2 text-sm cursor-pointer group">
            <input type="radio" checked={type === 'SHARED'} onChange={() => setType('SHARED')} className="text-indigo-600 focus:ring-indigo-500" />
            <span className="text-slate-600 group-hover:text-indigo-600 transition-colors">শেয়ারড (Shared)</span>
          </label>
          <label className="flex items-center space-x-2 text-sm cursor-pointer group">
            <input type="radio" checked={type === 'INDEPENDENT'} onChange={() => setType('INDEPENDENT')} className="text-indigo-600 focus:ring-indigo-500" />
            <span className="text-slate-600 group-hover:text-indigo-600 transition-colors">ব্যক্তিগত (Independent)</span>
          </label>
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-bold hover:bg-indigo-700 transition-all shadow-md active:scale-[0.98]">
          নতুন মেম্বার যুক্ত করুন
        </button>
      </form>

      <div className="space-y-2">
        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">বর্তমান মেম্বার তালিকা</label>
        {roommates.map(r => (
          <div key={r.id} className="flex items-center justify-between p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-slate-200 hover:border-indigo-300 transition-all group">
            <div>
              <div className="font-bold text-slate-800">{r.name}</div>
              <div className="text-[10px] text-slate-400 uppercase font-medium">
                যোগদান: {r.joinDate} | <span className={r.type === 'SHARED' ? 'text-blue-500' : 'text-purple-500'}>{r.type}</span>
              </div>
            </div>
            <button 
              onClick={() => onDelete(r.id)}
              className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-md transition-all opacity-0 group-hover:opacity-100"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberManager;
