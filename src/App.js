import React, {useState} from 'react';
import logo from "./logo.svg";
import "./App.css";


function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };
  const handleToggle = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };
  const handleEdit = (id, newText) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodos(updatedTodos);
  };
  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };
  return (
    <div className="App">
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {!editingTodoId && (
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id)}
              />
            )}
            {editingTodoId === todo.id ? (
              <input
                type="text"
                value={todo.text}
                onChange={(e) => handleEdit(todo.id, e.target.value)}
                onBlur={() => setEditingTodoId(null)} // Done editing
                autoFocus
              />
            ) : (
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.text}
              </span>
            )}
            <button onClick={() => setEditingTodoId(todo.id)}>
              {editingTodoId === todo.id
                ? "Save"
                : editingTodoId !== todo.id && !todo.completed
                ? "Edit"
                : null}
            </button>
            {editingTodoId !== todo.id && (
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
