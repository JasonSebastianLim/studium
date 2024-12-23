import React, { useEffect, useState } from 'react';
import Papa, { ParseResult } from 'papaparse';
import { Line } from 'react-chartjs-2';
import Link from 'next/link';
import 'chart.js/auto';

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    fill: boolean;
    backgroundColor: string;
    borderColor: string;
    tension: number;
  }[];
}

const Analytics = () => {
  const [chartData, setChartData] = useState<ChartData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/path-to-your-data/time_management_data.csv');
      if (!response.body) {
        console.error('Response body is null');
        return;
      }

      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder('utf-8');
      const csv = decoder.decode(result.value);

      Papa.parse(csv, {
        header: true,
        complete: (result: ParseResult<any>) => {
          processChartData(result.data);
        },
      });
    };

    const processChartData = (data: Array<{ date: string; hours_worked: string }>) => {
      const monthlyData = data.reduce<Record<string, number>>((acc, entry) => {
        const date = new Date(entry.date);
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        const monthYear = `${month} ${year}`;

        acc[monthYear] = (acc[monthYear] || 0) + parseFloat(entry.hours_worked || '0');
        return acc;
      }, {});

      const labels = Object.keys(monthlyData);
      const values = Object.values(monthlyData);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Hours Worked per Month',
            data: values,
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)',
            tension: 0.1,
          },
        ],
      });
    };

    fetchData();
  }, []);

  return (
    <div className="pt-0 bg-gray-100 min-h-screen space-y-6">
       <header className="flex justify-between items-center bg-gradient-to-r from-purple-400 to-pink-500 rounded-b-lg p-4 shadow-sm z-20 relative">
        <div className="flex items-center">
          <img src="/assets/Logo.png" alt="Logo" className="h-8 w-8" />
        </div>
        <nav className="flex space-x-6">
          <Link href="/" className="text-white font-semibold hover:text-purple-400 transition duration-300">
            Home
          </Link>
          <Link href="/Schedule" className="text-white font-semibold hover:text-purple-400 transition duration-300">
            Schedule
          </Link>
          <Link href="/SoloStudy" className="text-white font-semibold hover:text-purple-400 transition duration-300">
            Solo Study
          </Link>
          <Link href="/analytics" className="text-purple font-semibold hover:text-purple-400 transition duration-300">
            Analytics
          </Link>
        </nav>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <div className="icon-placeholder bg-purple-200 text-purple-600 w-12 h-12 flex items-center justify-center rounded-full">
            {/* Add your streak milestone icon here */}
            📅
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Streak Milestone</h3>
            <p className="text-gray-600 mt-1">
              You’ve kept a <span className="font-bold">5-day streak</span> on average in the past month
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <div className="icon-placeholder bg-blue-200 text-blue-600 w-12 h-12 flex items-center justify-center rounded-full">
            {/* Add your study time icon here */}
            ⏳
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Study Time</h3>
            <p className="text-gray-600 mt-1">
              You’ve spent <span className="font-bold">3 hours a day</span> studying on average this week
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <div className="icon-placeholder bg-green-200 text-green-600 w-12 h-12 flex items-center justify-center rounded-full">
            {/* Add your motivation level icon here */}
            💡
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Motivation Level</h3>
            <p className="text-gray-600 mt-1">You have a good overall productivity rate</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Monthly Progress</h2>
          {chartData ? (
            <Line data={chartData} />
          ) : (
            <p className="text-gray-500">Loading data...</p>
          )}
        </div>
        <div className="flex flex-col gap-6">
          <div
            className="bg-gradient-to-r from-purple-400 to-pink-500 p-6 rounded-lg shadow-md text-center text-white"
          >
            <h3 className="text-lg font-semibold">Achievement Badge</h3>
            <p className="mt-2">3-day streak achiever</p>
            <p>80% daily goal completion</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-700">Productivity Score</h3>
            <p className="text-3xl font-extrabold text-purple-600 mt-2">87%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
