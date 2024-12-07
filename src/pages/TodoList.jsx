// src/pages/TodoList.js
import { NavLink } from "react-router-dom";
import { getAll, removeById, updateById } from "../services/crudServices";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const TodoList = () => {
  const { state } = useAuth();
  const [usertodo, setUsertodo] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        const userTodoList = await getAll(`/todos?userId=${userId}`);
        setUsertodo(userTodoList || []);
      };
      fetchData();
    }
  }, [userId]);

  const handleRemoveTodo = async (id) => {
    if (confirm("Are you sure?")) {
      const res = await removeById("/todos", id);
      if (res.status === 200) {
        const newTodoList = usertodo.filter((item) => item.id !== id);
        setUsertodo(newTodoList);
      }
    }
  };

  const handleUpdateStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "pending" ? "done" : "pending";

    try {
      const res = await updateById("/todos", id, { status: newStatus });

      if (res.status === 200) {
        const updatedTodos = usertodo.map((todo) => {
          if (todo.id === id) {
            return { ...todo, status: newStatus };
          }
          return todo;
        });

        setUsertodo(updatedTodos);
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  if (!state.user && !userId) {
    return <div>Please login to view your Todo list.</div>;
  }

  return (
    <div>
      <h1>Todo List</h1>
      <NavLink to="/todos/new">Add New Todo</NavLink>
      <table>
        <thead>
          <tr className="text-center">
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usertodo.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No todos available
              </td>
            </tr>
          ) : (
            usertodo.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.priority}</td>
                <td>
                  <label
                    htmlFor={`status-${item.id}`}
                    onClick={() => handleUpdateStatus(item.id, item.status)}
                  >
                    <input
                      type="checkbox"
                      id={`status-${item.id}`}
                      checked={item.status === "done"}
                      readOnly
                    />
                    {item.status}
                  </label>
                </td>
                <td>
                  <button onClick={() => handleRemoveTodo(item.id)}>
                    Remove
                  </button>
                  <NavLink to={`/todos/update/${item.id}`}>Update</NavLink>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
