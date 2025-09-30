"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState<{ id: string, name: string }[]>([]);

  async function createNewTask() {
    await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "applicexation/json",
      },
      body: JSON.stringify({ name: newTask }),
    });
    laodTasks();
    setNewTask("");
  }
  function laodTasks() {
    fetch("http://localhost:3000/tasks").then((res) => res.json()).then((data) => {
      setTasks(data);
    });
  }
  useEffect(() => {
    laodTasks();
  }, [])

  return (
    <div className="m-auto w-[1000px] mt-10">
      <div className="flex gap-3">
        <input className="input" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
        <button className="btn btn-secondary rounded-xl" onClick={createNewTask}>Add</button>
      </div>
      {tasks.map((task) => (
        <div className="card mt-4 p-4 border border-amber-100" key={task.id}>
          {task.name}
        </div>
      ))}
    </div>
  );
}
