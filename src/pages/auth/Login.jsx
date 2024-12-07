// src/pages/auth/Login.js
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../../schemas/authSchemas"; // Import schema đăng nhập
import { useAuth } from "../../contexts/AuthContext"; // Import useAuth from context

const Login = () => {
  const [error, setError] = useState("");
  const { login } = useAuth(); // Lấy hàm login từ context
  const navigate = useNavigate();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema), // Sử dụng Zod schema cho validation
  });

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      // Gọi hàm login từ context để đăng nhập
      await login(email, password);
      navigate("/"); // Điều hướng đến trang TodoList sau khi đăng nhập thành công
    } catch (error) {
      setError("Login failed. Please try again.");
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input type="email" placeholder="Email" {...formRegister("email")} />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            {...formRegister("password")}
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
