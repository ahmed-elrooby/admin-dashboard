"use client";
import React from "react";
import { FaEllipsisH } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// بيانات المبيعات
const salesData = [
  { day: "Mon", completed: 250, canceled: 10, revenue: 500 },
  { day: "Tue", completed: 140, canceled: 40, revenue: 700 },
  { day: "Wed", completed: 240, canceled: 8, revenue: 800 },
  { day: "Thu", completed: 100, canceled: 100, revenue: 600 },
  { day: "Fri", completed: 300, canceled: 3, revenue: 900 },
  { day: "Sat", completed: 1200, canceled: 77, revenue: 400 },
  { day: "Sun", completed: 330, canceled: 150, revenue: 300 },
];

// مكون CustomTooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="dark:bg-[#171717] bg-white p-2 border border-gray-300 rounded shadow-md">
        <p className="font-bold">{`${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm">
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const SalesChart = () => {
  return (
    <div className="rounded-lg p-4 h-full  ">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold capitalize">Sales Statistics</h1>
        <FaEllipsisH className="text-gray-500" />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={salesData}
          margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="completed" fill="#83A6ED" barSize={50} name="Completed Orders" />
          <Bar dataKey="canceled" fill="#8DD1E1" barSize={50} name="Canceled Orders" />
          <Bar dataKey="revenue" fill="#82CA9D" barSize={50} name="Revenue ($)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
