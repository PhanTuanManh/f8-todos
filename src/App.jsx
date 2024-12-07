// src/App.js
import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import TodoList from "./pages/TodoList";
import Header from "./components/Header";
import TodoForm from "./pages/TodoForm";

const App = () => {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<TodoList />} />
        <Route path="/todos/new" element={<TodoForm />} />
        <Route path="/todos/update/:id" element={<TodoForm />} />{" "}
      </Routes>
    </AuthProvider>
  );
};

export default App;
