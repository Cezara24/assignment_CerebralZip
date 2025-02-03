import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFinancialSummaryData } from "../../../store/slices/financialSummarySlice";
import ButtonBase from "../../ButtonBase";
import StatCard from "./StatCard";

function FinancialSummary({ className = "" }) {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector(
    (state) => state.financialSummary
  );

  const [selectedOption, setSelectedOption] = useState("Last year");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchFinancialSummaryData());
    }
  }, [status, dispatch]);

  return (
    <div className={`w-full flex-[1] flex flex-col gap-8 ${className}`}>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold">Dashboard</h1>
        <div className="flex gap-4 items-center">
          <p>Compare to</p>
          <ButtonBase
            multipleOptions
            options={[
              "Last year",
              "Last month",
              "Last week",
            ]}
            defaultOption={selectedOption}
            onClick={setSelectedOption}
          />
        </div>
      </div>

      {
        <div className="flex gap-2">
          <StatCard title="Purchases" value={data?.purchases} percentage={32} />
          <StatCard
            title="Revenue"
            value={data?.revenue}
            currency={"$"}
            percentage={49}
          />
          <StatCard
            title="Refunds"
            value={data?.refunds}
            currency={"$"}
            percentage={7}
            type="down"
          />
        </div>
      }
    </div>
  );
}

export default FinancialSummary;
