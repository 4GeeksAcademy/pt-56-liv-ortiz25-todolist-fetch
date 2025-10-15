import React, { useEffect, useState } from "react";

function Home({ userInput }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const getTasks = async () => {
    try {
      const response = await fetch(`https://playground.4geeks.com/todo/users/${userInput}`);
      const data = await response.json();
      setTasks(data.todos || []);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  const addTask = async () => {
    if (newTask.trim() === "") return;

    try {
      const response = await fetch(`https://playground.4geeks.com/todo/todos/${userInput}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: newTask, is_done: false }),
      });

      if (response.ok) {
        setNewTask("");
        await getTasks(); 
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const removeTask = async (id) => {
    try {
      const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) await getTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const clearAllTasks = async () => {
    if (tasks.length === 0) return;
    try {
      await Promise.all(
        tasks.map((task) =>
          fetch(`https://playground.4geeks.com/todo/todos/${task.id}`, { method: "DELETE" })
        )
      );
      await getTasks();
    } catch (error) {
      console.error("Error deleting all tasks:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTask();
  };

  useEffect(() => {
    getTasks();
  }, [userInput]);

  return (
    <div className="container">
      <div className="row">
        <h1 className="title">Hello, {userInput}!</h1>
        <div className="input">
          <input
            type="text"
            size={50}
            placeholder="What needs to be done?"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <span>{task.label}</span>
              <button className="delete-btn" onClick={() => removeTask(task.id)}>
                X
              </button>
            </li>
          ))}
        </ul>

        {tasks.length > 0 ? (
          <div className="note">
            {tasks.length} item{tasks.length > 1 ? "s" : ""} left
          </div>
        ) : (
          <p className="empty">No tasks, add a task</p>
        )}

        {tasks.length > 0 && (
          <button className="clear-btn" onClick={clearAllTasks}>
            Delete all
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;
