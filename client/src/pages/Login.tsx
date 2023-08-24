import { FormEvent, useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { data } = await axios.post("auth/login", { email, password });
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.userId);
    navigate("/");
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
        <h1 className="text-white text-2xl mb-4">Login</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="Email"
            className="w-full bg-gray-700 rounded-md px-3 py-2 mb-2 text-white"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-gray-700 rounded-md px-3 py-2 mb-2 text-white"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-gray-900 text-white w-full py-2 rounded-md hover:bg-gray-700 transition duration-300"
          >
            Login
          </button>
        </form>
          <button
            className="underline text-blue-500 text-sm"
            onClick={()=>navigate("/register")}
          >
            Register
          </button>
      </div>
    </div>
  );
};

export default Login;

