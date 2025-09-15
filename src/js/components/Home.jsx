import React, { useState } from "react";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") return; 
    setTasks([...tasks, newTask]);
    setNewTask("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const removeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <div className="row">
        <h1 className="title">To-Do List</h1>
        <div className="input">
          <input
            type="text"
            size={50}
            placeholder="What needs to be done?"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={handleKeyDown} // 
          />
        </div>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <span>{task}</span>
              <button onClick={() => removeTask(index)}>X</button>
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
      </div>
    </div>
  );
}

export default Home;

