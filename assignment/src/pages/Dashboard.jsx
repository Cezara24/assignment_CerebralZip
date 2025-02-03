import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import FinancialSummary from "../components/dashboard/financialSummary/FinancialSummary";
import Comparison from "../components/dashboard/comparison/Comparison";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Card
      className="w-full min-h-fit grid grid-cols-5 grid-rows-5 gap-2 p-2"
      height="calc(100vh - 4rem)"
    >
      <div className="row-span-5 h-full w-full"></div>

      <Card
        className="
        row-span-5 col-span-3 
        bg-white p-8
        flex flex-col gap-8
      "
      >
        <FinancialSummary />
        <Comparison />
        <div className="w-full flex-[2] bg-blue-50"></div>
      </Card>

      <Card className="bg-white row-span-2"></Card>
      <Card className="bg-white row-span-2"></Card>
      <Card className="bg-white"></Card>
    </Card>
  );
}

export default Dashboard;
