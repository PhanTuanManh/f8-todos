// src/pages/TodoForm.js
import { useState, useEffect } from "react";
import { createNew, getById, updateById } from "../services/crudServices";
import { useNavigate, useParams } from "react-router-dom";

const TodoForm = () => {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    priority: "",
    status: "pending",
    userId: localStorage.getItem("userId"),
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchTodo = async () => {
        const data = await getById("/todos", id);
        setTodo(data);
      };
      fetchTodo();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      const updatedTodo = await updateById("/todos", id, todo);
      if (updatedTodo) {
        navigate("/");
      }
    } else {
      const newTodo = await createNew("/todos", todo);
      if (newTodo) {
        navigate("/");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo({
      ...todo,
      [name]: value,
    });
  };

  return (
    <div>
      <h1>{id ? "Update Todo" : "Add New Todo"}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={todo.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={todo.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Priority</label>
          <select
            name="priority"
            value={todo.priority}
            onChange={handleChange}
            required
          >
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label>Status</label>
          <select
            name="status"
            value={todo.status}
            onChange={handleChange}
            required
          >
            <option value="pending">Pending</option>
            <option value="done">Done</option>
            <option value="doing">Doing</option>
          </select>
        </div>
        <button type="submit">{id ? "Update Todo" : "Add Todo"}</button>
      </form>
    </div>
  );
};

export default TodoForm;
