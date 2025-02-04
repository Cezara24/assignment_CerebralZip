import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPerformanceScoreData } from "../../../store/slices/performanceScoreSlice";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Card from "../../Card";
import ButtonBase from "../../ButtonBase";

ChartJS.register(ArcElement, Tooltip, Legend);

function PerformanceScore({ className = "" }) {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector(
    (state) => state.performanceScore || {}
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPerformanceScoreData());
    }
  }, [status, dispatch]);

  const score = data.score;
  const maxScore = 100;
  const percentage = (score / maxScore) * 100;
  const patternData = Array(50).fill([1, 2]).flat();

  if (error) return <p>Error: {error}</p>;

  const chartData = {
    labels: [`${percentage} points from 100`, "Remaining"],
    datasets: [
      {
        cutout: "75%",
        radius: "100%",
        data: [percentage, 100 - percentage],
        backgroundColor: ["#1e88e5", "#e0e0e0"],
        hoverBackgroundColor: ["#1d4ed8", "#e0e0e0"],
        borderWidth: 0,
        rotation: -90,
        circumference: 180,
        borderRadius: [50, 50],
      },
      {
        cutout: "75%",
        radius: "100%",
        data: 100,
        backgroundColor: "#ef4444",
        hoverBackgroundColor: "transparent",
        borderWidth: 0,
        rotation: -90,
        circumference: 180,
        borderRadius: 0,
      },
      {
        cutout: "80%",
        radius: "100%",
        data: patternData,
        backgroundColor: ["#e0e0e0", "transparent"],
        hoverBackgroundColor: ["#e0e0e0", "transparent"],
        borderWidth: 0,
        rotation: -90,
        circumference: 180,
        borderRadius: 0,
        animations: {
          colors: false,
          numbers: false,
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        filter: (tooltipItem) => {
          return tooltipItem.datasetIndex === 0 && tooltipItem.dataIndex === 0;
        },
        titleFont: { size: 16 },
        bodyFont: { size: 14 },
        callbacks: {
          label: () => "",
        },
      },
    },
  };

  return (
    <Card className="w-full h-full bg-white row-span-2 p-8 flex flex-col gap-1 justify-between">
      <div className="w-full flex flex-col items-center">
        <div className="relative w-60 h-30 mb-8">
          <Doughnut data={chartData} options={options} />
          <div className="absolute inset-x-0 -bottom-8 flex flex-col gap-1 items-center justify-center">
            <p className="text-5xl font-semibold text-gray-900">{score}</p>
            <p className="text-gray-500 text-sm">of 100 points</p>
          </div>
        </div>
      </div>

      <div className="w-full h-1 min-h-1 bg-gray-200"></div>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">{data.title}</h2>
        <p className="text-gray-500">{data.message}</p>
      </div>
      <ButtonBase>Improve your score</ButtonBase>
    </Card>
  );
}

export default PerformanceScore;
