import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useSelector } from "react-redux";
import "./App.css";

function App() {
  const username = useSelector((state) => state.auth.username);
  const password = useSelector((state) => state.auth.password);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={username && password ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="*"
          element={<Navigate to={username && password ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
