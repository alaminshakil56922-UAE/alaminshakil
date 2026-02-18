
import React from 'react';
import { RoommateStat } from '../types';
import CurrencyIcon from './CurrencyIcon';

interface ReportTableProps {
  roommateStats: Record<string, RoommateStat>;
}

const ReportTable: React.FC<ReportTableProps> = ({ roommateStats }) => {
  const names = Object.keys(roommateStats);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50/50 gap-2">
        <h3 className="text-lg font-bold text-gray-800">মাসিক রিপোর্ট (সারসংক্ষেপ)</h3>
        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded border border-indigo-100 uppercase tracking-tight">
          ব্যালেন্স = (বাজার + জমা) - খরচের ভাগ
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">রুমমেট</th>
              <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">বাজার খরচ</th>
              <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">জমা টাকা</th>
              <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">খরচের ভাগ</th>
              <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">ব্যালেন্স</th>
              <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-center">অবস্থা</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {names.map(name => {
              const stats = roommateStats[name];
              const isOwed = stats.balance >= 0;
              
              return (
                <tr key={name} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4">
                    <span className="inline-block bg-indigo-600 text-white px-2 py-0.5 rounded text-xs font-bold shadow-sm mb-1">
                      {name}
                    </span>
                    {!stats.isShared && <div className="text-[8px] text-indigo-500 font-black uppercase">Independent</div>}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-700">
                    <div className="flex items-center">
                      <CurrencyIcon className="w-3.5 h-3.5" />
                      {stats.totalSpent.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-green-600">
                    <div className="flex items-center">
                      <CurrencyIcon className="w-3.5 h-3.5" />
                      {stats.totalDeposit.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-red-400">
                    <div className="flex items-center">
                      <CurrencyIcon className="w-3.5 h-3.5" />
                      {stats.totalDue.toFixed(2)}
                    </div>
                  </td>
                  <td className={`px-4 py-4 text-base font-black ${isOwed ? 'text-green-600' : 'text-red-600'}`}>
                    <div className="flex items-center">
                      <span>{isOwed ? '+' : ''}</span>
                      <CurrencyIcon className="w-4 h-4" />
                      {Math.abs(stats.balance).toFixed(2)}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    {isOwed ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 uppercase">
                        পাবে
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 uppercase">
                        দিবে
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="p-4 bg-gray-50 text-gray-500 text-[10px] italic">
        * নোট: বাজার খরচ এবং জমা টাকার যোগফল থেকে খরচের ভাগ বিয়োগ করে ব্যালেন্স বের করা হয়েছে।
      </div>
    </div>
  );
};

export default ReportTable;
