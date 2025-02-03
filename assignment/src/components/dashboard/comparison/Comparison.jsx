import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { fetchComparisonData } from "../../../api/comparisonApi";
import ButtonBase from "../../ButtonBase";

function Comparison({ className = "" }) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["comparison"],
    queryFn: fetchComparisonData,
  });

  const [selectedMonths, setSelectedMonths] = useState("6 months");

  if (isLoading) return <></>;
  if (error) return <p>Error loading data</p>;

  const months = data.map((item) => item.month);
  const thisYearData = data.map((item) => item.this_year);
  const lastYearData = data.map((item) => item.last_year);

  const monthOptions = months
  .map((_, index) => `${months.length - index} months`)
  .slice(0, months.length);

  const selectedMonthsCount = parseInt(selectedMonths.split(" ")[0], 10);
  const filteredMonths = months.slice(-selectedMonthsCount);
  const filteredThisYearData = thisYearData.slice(-selectedMonthsCount);
  const filteredLastYearData = lastYearData.slice(-selectedMonthsCount);

  const allData = [...thisYearData, ...lastYearData];
  const maxValue = Math.max(...allData);
  const stepSize = maxValue / 4;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        reverse: true,
        labels: {
          font: {
            size: 16,
          },
          color: "#111827",
          usePointStyle: true,
          pointStyle: "rectRounded",
          boxWidth: 12,
          boxHeight: 12,
        },
      },
      tooltip: {
        titleFont: { size: 16 },
        bodyFont: { size: 14 },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: {
          font: {
            size: 16,
          },
          color: "#4b5563",
        },
      },
      y: {
        border: { display: false },
        ticks: {
          font: {
            size: 16,
          },
          color: "#4b5563",
          stepSize: stepSize,
          callback: (value) => (value === 0 ? "0" : `${value / 1000}k`),
        },
        beginAtZero: true,
        max: maxValue,
      },
    },
  };

  const chartData = {
    labels: filteredMonths,
    datasets: [
      {
        label: "Last Year",
        data: filteredLastYearData,
        backgroundColor: "rgba(103, 232, 249, 0.7)",
        hoverBackgroundColor: "rgba(34, 211, 238, 1)",
        borderRadius: 4,
        borderSkipped: false,
        categoryPercentage: 0.4,
        barPercentage: 0.8,
      },
      {
        label: "This Year",
        data: filteredThisYearData,
        backgroundColor: "rgba(37, 99, 235, 0.7)",
        hoverBackgroundColor: "rgba(29, 78, 216, 1)",
        borderRadius: 4,
        borderSkipped: false,
        categoryPercentage: 0.4,
        barPercentage: 0.8,
      },
    ],
  };

  return (
    <div className={`w-full h-full flex-[2] ${className}`}>
      <div className="h-full flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Comparison</h2>
          <ButtonBase
            multipleOptions
            options={monthOptions}
            defaultOption={selectedMonths}
            onClick={setSelectedMonths}
          />
        </div>

        <div className="w-full h-full">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

export default Comparison;
