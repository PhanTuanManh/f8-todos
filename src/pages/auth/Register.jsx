// src/pages/Register.js
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "../../schemas/authSchemas"; // Import schema đăng ký
import { useAuth } from "../../contexts/AuthContext"; // Import useAuth từ context

const Register = () => {
  const [error, setError] = useState("");
  const { register } = useAuth(); // Lấy hàm register từ context
  const navigate = useNavigate();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema), // Sử dụng Zod schema cho validation
  });

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      // Gọi hàm register từ context để đăng ký người dùng
      await register(email, password);
      navigate("/login"); // Điều hướng đến trang TodoList sau khi đăng ký thành công
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
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

        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            {...formRegister("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>
          )}
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
