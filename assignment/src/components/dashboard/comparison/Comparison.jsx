import { useQuery } from "@tanstack/react-query";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { fetchComparisonData } from "../../../api/comparisonApi";
import ButtonBase from "../../ButtonBase";
import { PiCaretDownBold as CaretDown } from "react-icons/pi";

function Comparison({ className = "" }) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["comparison"],
    queryFn: fetchComparisonData,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  console.log("data: ", data)

  const months = data.map((item) => item.month);
  const thisYearData = data.map((item) => item.this_year);
  const lastYearData = data.map((item) => item.last_year);

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
    labels: months,
    datasets: [
      {
        label: "Last Year",
        data: lastYearData,
        backgroundColor: "rgba(103, 232, 249, 0.7)",
        hoverBackgroundColor: "rgba(34, 211, 238, 1)",
        borderRadius: 4,
        borderSkipped: false,
        categoryPercentage: 0.4,
        barPercentage: 0.8,
      },
      {
        label: "This Year",
        data: thisYearData,
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
          <ButtonBase>
            6 months
            <CaretDown className="font-bold text-gray-400"></CaretDown>
          </ButtonBase>
        </div>

        <div className="w-full h-full">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

export default Comparison;
