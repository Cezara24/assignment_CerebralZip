import PropTypes from "prop-types";
import Card from "../../Card";
import { FaArrowTrendUp as ArrowUp } from "react-icons/fa6";
import { FaArrowTrendDown as ArrowDown } from "react-icons/fa6";

function StatCard({ title, value = 0, currency = "", percentage, type = "up" }) {
  return (
    <Card className="bg-white w-full border-2 border-gray-200 shadow-sm p-4 flex flex-col gap-4">
      <h2 className="text-gray-500">{title}</h2>
      <div className="flex gap-2 items-center">
        <p className="font-semibold text-2xl">{`${currency}${value || 0}`}</p>
        <p
          className={`flex gap-1 items-center text-xs rounded-full border-2 px-2 py-1 ${type === "up" ? "border-green-200 bg-green-100 text-green-700" : "border-red-200 bg-red-100 text-red-700"}`}
        >
          {`+${percentage}%`} {type === "up" ?<ArrowUp /> : <ArrowDown />}
        </p>
      </div>
    </Card>
  );
}

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number,
  currency: PropTypes.string,
  percentage: PropTypes.number.isRequired,
  type: PropTypes.string,
};

export default StatCard;
