"use client";

import React, { useMemo, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

interface Transaction {
  id: string;
  name: string;
  amount: string;
  date: string;
  paymentChannel: string;
  type: string;
  category?: string;
}

interface Props {
  transactions: Transaction[];
}

const TransactionChart = ({ transactions }: Props) => {
  const [maxXTicks, setMaxXTicks] = useState(10);

  useEffect(() => {
    const handleResize = () => {
      setMaxXTicks(window.innerWidth < 640 ? 4 : 10);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dailyTotals = useMemo(() => {
    const totals: Record<string, number> = {};

    transactions.forEach((tx) => {
      const day = new Date(tx.date).toISOString().split("T")[0];
      const amount = parseFloat(tx.amount) || 0;
      totals[day] = (totals[day] || 0) + amount;
    });

    const sortedDates = Object.keys(totals).sort();

    const cumulativeValues: number[] = [];
    let runningTotal = 0;
    sortedDates.forEach((date) => {
      runningTotal += totals[date];
      cumulativeValues.push(runningTotal);
    });

    return { labels: sortedDates, data: cumulativeValues };
  }, [transactions]);

  const data = {
    labels: dailyTotals.labels,
    datasets: [
      {
        label: "Cumulative Total",
        data: dailyTotals.data,
        fill: true,
        borderColor: "#296E85",
        backgroundColor: "rgba(41, 110, 133, 0.1)",
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: "#296E85",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index" as const, intersect: false },
    },
    scales: {
      x: {
        ticks: {
          color: "#555",
          maxTicksLimit: maxXTicks,
          maxRotation: 45,
          minRotation: 0,
        },
        grid: { color: "rgba(0,0,0,0.05)" },
      },
      y: {
        ticks: {
          color: "#555",

          callback: (value: any) => `$${Number(value).toLocaleString()}`,
        },
        grid: { color: "rgba(0,0,0,0.05)" },
      },
    },
  };

  return (
    <div className="w-full h-[400px] max-w-4xl mx-auto px-4 pb-20 md:pb-10">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        Cumulative Transactions Over Time
      </h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default TransactionChart;
