import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFinancialSummary } from "../../../store/slices/financialSummarySlice";
import ButtonBase from "../../ButtonBase";
import StatCard from "./StatCard";
import { PiCaretDownBold as CaretDown } from "react-icons/pi";

function FinancialSummary({ className = "" }) {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.financialSummary);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchFinancialSummary());
    }
  }, [status, dispatch]);

  return (
    <div className={`flex flex-col gap-8 ${className}`}>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold">Dashboard</h1>
        <div className="flex gap-4 items-center">
          <p>Compare to</p>
          <ButtonBase>
            Last year
            <CaretDown className="font-bold text-gray-400"></CaretDown>
          </ButtonBase>
        </div>
      </div>

      {
        <div className="flex gap-2">
          <StatCard title="Purchases" value={data?.purchases} percentage={32} />
          <StatCard title="Revenue" value={data?.revenue} currency={"$"} percentage={49} />
          <StatCard title="Refunds" value={data?.refunds} currency={"$"} percentage={7} type="down" />
        </div>
      }
    </div>
  );
}

export default FinancialSummary;
