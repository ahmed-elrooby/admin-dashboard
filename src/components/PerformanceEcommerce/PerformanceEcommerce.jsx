"use client";

import { FaEllipsisH } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", sales: 4000, returns: 240 },
  { name: "Feb", sales: 3000, returns: 139 },
  { name: "Mar", sales: 5000, returns: 980 },
  { name: "Apr", sales: 6000, returns: 390 },
  { name: "May", sales: 8000, returns: 480 },
  { name: "Jun", sales: 7000, returns: 380 },
  { name: "Jul", sales: 9000, returns: 430 },
  { name: "Aug", sales: 7500, returns: 350 },
  { name: "Sep", sales: 8200, returns: 290 },
  { name: "Oct", sales: 9100, returns: 300 },
  { name: "Nov", sales: 8800, returns: 270 },
  { name: "Dec", sales: 9400, returns: 310 },
];

const PerformanceEcommerce = () => {
  return (
    <div className=" rounded-xl w-full h-full p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">E-commerce Performance</h1>
        <FaEllipsisH className="text-gray-500" />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
            tickMargin={20}
          />
          <Tooltip />
          <Legend
            align="center"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
          />
          <Line type="monotone" dataKey="sales" stroke="#83A6ED" strokeWidth={5} />
          <Line type="monotone" dataKey="returns" stroke="#F44336" strokeWidth={5} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceEcommerce;
