"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import React from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  const accountNames = accounts.map((a) => a.name);
  const balances = accounts.map((a) => a.currentBalance);

  const data = {
    labels: accountNames,
    datasets: [
      {
        label: "Bank Balances",
        data: balances,
        backgroundColor: ["#7C3AED", "#9F7AEA", "#C4B5FD"],
        borderColor: "#fff",
        borderWidth: 3,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    cutout: "70%",
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        labels: {
          color: "#6B7280",
          font: {
            size: 15,
            family: "Inter, sans-serif",
          },
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: "#1F2937",
        titleColor: "#fff",
        bodyColor: "#E5E7EB",
        borderWidth: 1,
        borderColor: "#4B5563",
        padding: 10,
        displayColors: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="relative flex items-center justify-center w-[200px] h-[250px] mx-auto">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
