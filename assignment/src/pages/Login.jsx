import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "../api/authApi";
import ButtonBase from "../components/ButtonBase";
import Input from "../components/Input";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const storedUsername = useSelector((state) => state.auth.username);
  const storedPassword = useSelector((state) => state.auth.password);

  const { mutate: handleLogin, isLoading } = useMutation({
    mutationFn: loginRequest,
    onSuccess: () => {
      dispatch(login({ username, password }));
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  useEffect(() => {
    if (storedUsername && storedPassword) {
      navigate("/dashboard");
    }
  }, [storedUsername, storedPassword, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ username, password });
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (error) setError("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white px-6 py-18 rounded-3xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-32">Salesway</h2>

        <form onSubmit={handleSubmit} className=" flex flex-col items-center">
          <Input
            id="username"
            type="text"
            value={username}
            onChange={handleInputChange(setUsername)}
            placeholder="Username"
            required
          />

          <Input
            id="password"
            type="password"
            value={password}
            onChange={handleInputChange(setPassword)}
            placeholder="Password"
            required
            className="mb-4"
          />

          <div className="relative w-full">
            {error && (
              <p
                className="
                absolute top-0 
                w-full text-red-500 text-sm text-center
                "
              >
                {error}
              </p>
            )}

            <ButtonBase type="submit" className="w-full mt-8">
              Login
            </ButtonBase>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
