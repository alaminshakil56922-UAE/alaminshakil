
import React, { useState, useEffect, useMemo } from 'react';
import { Roommate, Expense, Deposit, RoommateStat, RentMember, RentPayment } from './types';
import SummaryCards from './components/SummaryCards';
import ExpenseForm from './components/ExpenseForm';
import DepositForm from './components/DepositForm';
import ReportTable from './components/ReportTable';
import HistoryTable from './components/HistoryTable';
import MonthPicker from './components/MonthPicker';
import MemberManager from './components/MemberManager';
import RentSection from './components/RentSection';
import { supabase } from './supabase';

const App: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  });

  const [loading, setLoading] = useState(true);
  const [roommates, setRoommates] = useState<Roommate[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [rentMembers, setRentMembers] = useState<RentMember[]>([]);
  const [rentPayments, setRentPayments] = useState<RentPayment[]>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: rms } = await supabase.from('roommates').select('*').order('name');
      setRoommates(rms || []);

      const { data: rmems } = await supabase.from('rent_members').select('*').order('name');
      setRentMembers(rmems || []);

      const { data: rpay } = await supabase.from('rent_payments').select('*');
      setRentPayments(rpay || []);

      await fetchMonthData(currentMonth);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMonthData = async (month: string) => {
    const start = `${month}-01`;
    const end = `${month}-31`;

    const { data: exps } = await supabase
      .from('expenses')
      .select('*')
      .gte('date', start)
      .lte('date', end)
      .order('date', { ascending: false });
    
    const { data: deps } = await supabase
      .from('deposits')
      .select('*')
      .eq('month', month);

    // Map database snake_case fields back to camelCase for the UI
    setExpenses(exps?.map(e => ({
      id: e.id,
      date: e.date,
      roommateName: e.roommate_name,
      amount: Number(e.amount),
      description: e.description,
      category: e.category
    })) || []);

    setDeposits(deps?.map(d => ({
      id: d.id,
      roommateName: d.roommate_name,
      amount: Number(d.amount),
      month: d.month
    })) || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchMonthData(currentMonth);
  }, [currentMonth]);

  const calculatedStats = useMemo(() => {
    const stats: Record<string, RoommateStat> = {};
    roommates.forEach(r => {
      stats[r.name] = {
        totalSpent: 0,
        totalDeposit: 0,
        totalDue: 0,
        balance: 0,
        isShared: r.type === 'SHARED',
        joinDate: r.joinDate
      };
    });

    deposits.forEach(d => {
      if (stats[d.roommateName]) stats[d.roommateName].totalDeposit += Number(d.amount);
    });

    expenses.forEach(exp => {
      if (stats[exp.roommateName]) stats[exp.roommateName].totalSpent += Number(exp.amount);
      const activeShared = roommates.filter(r => r.type === 'SHARED' && r.joinDate <= exp.date);
      if (activeShared.length > 0) {
        const share = Number(exp.amount) / activeShared.length;
        activeShared.forEach(m => { if (stats[m.name]) stats[m.name].totalDue += share; });
      }
    });

    Object.keys(stats).forEach(name => {
      stats[name].balance = (stats[name].totalSpent + stats[name].totalDeposit) - stats[name].totalDue;
    });
    return stats;
  }, [roommates, expenses, deposits]);

  const totalGlobalExpense = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
  const sharedCount = roommates.filter(r => r.type === 'SHARED').length;
  const avgShared = sharedCount > 0 ? (totalGlobalExpense / sharedCount) : 0;

  const handleAddExpense = async (e: Omit<Expense, 'id'>) => {
    const { error } = await supabase.from('expenses').insert([{
      date: e.date,
      roommate_name: e.roommateName,
      amount: e.amount,
      description: e.description,
      category: e.category
    }]);
    
    if (error) {
      console.error(error);
      alert('খরচ যোগ করতে সমস্যা হয়েছে: ' + error.message);
    } else {
      fetchMonthData(currentMonth);
    }
  };

  const handleAddDeposit = async (d: Omit<Deposit, 'id'>) => {
    const { error } = await supabase.from('deposits').insert([{
      roommate_name: d.roommateName,
      amount: d.amount,
      month: d.month
    }]);

    if (error) {
      console.error(error);
      alert('জমা যোগ করতে সমস্যা হয়েছে: ' + error.message);
    } else {
      fetchMonthData(currentMonth);
    }
  };

  const handleAddRoommate = async (r: Roommate) => {
    const { error } = await supabase.from('roommates').insert([r]);
    if (error) alert('মেম্বার যোগ হয়নি: ' + error.message);
    else fetchData();
  };

  const handleDeleteRoommate = async (id: string) => {
    if (!window.confirm('মুছে ফেলতে চান?')) return;
    const { error } = await supabase.from('roommates').delete().eq('id', id);
    if (!error) fetchData();
  };

  const handleAddRentMember = async (name: string) => {
    const { error } = await supabase.from('rent_members').insert([{ name: name.toUpperCase() }]);
    if (error) alert('এরর: ' + error.message);
    else fetchData();
  };

  const handleDeleteRentMember = async (id: string) => {
    if (!window.confirm('মুছে ফেলতে চান?')) return;
    const { error } = await supabase.from('rent_members').delete().eq('id', id);
    if (!error) fetchData();
  };

  const handleAddRentPayment = async (memberId: string, amount: number) => {
    const member = rentMembers.find(m => m.id === memberId);
    if (!member) return;
    const { error } = await supabase.from('rent_payments').upsert([{ 
      member_id: memberId, 
      member_name: member.name, 
      amount, 
      month: currentMonth 
    }], { onConflict: 'member_id, month' });

    if (error) alert('ভাড়া জমা হয়নি: ' + error.message);
    else fetchData();
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
        <p className="text-slate-500 font-bold animate-pulse">ডেটা লোড হচ্ছে...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pb-12 bg-slate-50">
      <nav className="bg-indigo-700 text-white shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-xl font-black tracking-tighter uppercase">ROOM NO 3</span>
          </div>
          <MonthPicker value={currentMonth} onChange={setCurrentMonth} />
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        <SummaryCards totalExpense={totalGlobalExpense} averageExpense={avgShared} deposits={deposits} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <ExpenseForm onAdd={handleAddExpense} roommates={roommates} />
            <DepositForm onAdd={handleAddDeposit} roommates={roommates} currentMonth={currentMonth} />
            <MemberManager roommates={roommates} onAdd={handleAddRoommate} onDelete={handleDeleteRoommate} />
          </div>

          <div className="space-y-8">
            <ReportTable roommateStats={calculatedStats} />
            <HistoryTable 
              expenses={expenses} 
              deposits={deposits} 
              onDeleteExpense={async (id) => { 
                const { error } = await supabase.from('expenses').delete().eq('id', id); 
                if (!error) fetchMonthData(currentMonth);
              }} 
              onDeleteDeposit={async (id) => { 
                const { error } = await supabase.from('deposits').delete().eq('id', id);
                if (!error) fetchMonthData(currentMonth);
              }}
            />
          </div>
        </div>

        <RentSection 
          currentMonth={currentMonth}
          members={rentMembers}
          payments={rentPayments}
          onAddMember={handleAddRentMember}
          onDeleteMember={handleDeleteRentMember}
          onAddPayment={handleAddRentPayment}
          onDeletePayment={async (id) => { await supabase.from('rent_payments').delete().eq('id', id); fetchData(); }}
        />
      </main>

      <footer className="mt-12 text-center text-slate-400 text-xs py-8">
        <p>© {new Date().getFullYear()} ROOM NO 3 | Cloud Sync Enabled (Supabase)</p>
      </footer>
    </div>
  );
};

export default App;
