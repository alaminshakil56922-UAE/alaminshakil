
import React, { useEffect, useRef, useState } from 'react';
import Chart from 'https://esm.sh/chart.js/auto';
import { supabase } from '../supabase';

const ExpenseChart: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const [chartData, setChartData] = useState<{month: string, expense: number, deposit: number}[]>([]);

  const fetchHistory = async () => {
    try {
      // Fetch all expenses and deposits to aggregate by month
      const { data: exps } = await supabase.from('expenses').select('date, amount');
      const { data: deps } = await supabase.from('deposits').select('month, amount');

      const monthly: Record<string, {expense: number, deposit: number}> = {};

      exps?.forEach(e => {
        const m = e.date.substring(0, 7); // YYYY-MM
        if (!monthly[m]) monthly[m] = { expense: 0, deposit: 0 };
        monthly[m].expense += Number(e.amount);
      });

      deps?.forEach(d => {
        if (!monthly[d.month]) monthly[d.month] = { expense: 0, deposit: 0 };
        monthly[d.month].deposit += Number(d.amount);
      });

      const formatted = Object.entries(monthly)
        .map(([month, val]) => ({ month, ...val }))
        .sort((a, b) => a.month.localeCompare(b.month))
        .slice(-6);

      setChartData(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    if (!canvasRef.current || chartData.length === 0) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: chartData.map(d => {
          const [y, m] = d.month.split('-');
          const names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          return `${names[parseInt(m)-1]} ${y}`;
        }),
        datasets: [
          {
            label: 'মোট খরচ',
            data: chartData.map(d => d.expense),
            backgroundColor: 'rgba(79, 70, 229, 0.8)',
            borderRadius: 6,
          },
          {
            label: 'মোট জমা',
            data: chartData.map(d => d.deposit),
            backgroundColor: 'rgba(16, 185, 129, 0.8)',
            borderRadius: 6,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true } }
      }
    });

    return () => chartRef.current?.destroy();
  }, [chartData]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <h3 className="text-lg font-bold text-gray-800 mb-6">খরচের মাসিক ট্রেন্ড (গত ৬ মাস)</h3>
      <div className="h-[300px] w-full">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

export default ExpenseChart;
