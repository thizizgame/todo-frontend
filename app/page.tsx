"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState<{ id: string, name: string, mode: boolean }[]>([]);

  async function createNewTask() {
    await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newTask, mode: false },),
    });
    laodTasks();
    setNewTask("");
  }
  async function deleteTask(id: string) {
    if (confirm("u sure")) {
      await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
      });
      laodTasks();
    }
  }
  async function editTask(task: { id: string, name: string }) {
    const newName = prompt("Edit", task.name)
    if (newName) {
      await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newName }),
      });
      laodTasks();
    }
  }
  function laodTasks() {
    fetch("http://localhost:3000/tasks").then((res) => res.json()).then((data) => {
      setTasks(data);
    });
  }
  useEffect(() => {
    laodTasks();
  }, [])
  async function handleCheck(task: { id: string, name: string, mode: boolean }) {
    const newMode = !task.mode;

    await fetch(`http://localhost:3000/toggle/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mode: newMode }),
    });
    laodTasks();

  }
  return (
    <div className="m-auto w-[700px] mt-10">
      <div className="flex gap-3">
        <input className="input w-155 mb-10" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
        <button disabled={!newTask} className="btn btn-secondary rounded-xl btn-xs p-5" onClick={createNewTask} >Add</button>
      </div>
      <ul className="list bg-base-100 rounded-box shadow-md">
        {tasks.map((task) => (
          <li key={task.id} className="list-row flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <input onChange={() => handleCheck(task)} type="checkbox" />
              {task.name}
            </div>

            <div>
              <button disabled={task.mode} className="btn btn-accent rounded-xl w-20  btn-soft btn-xs" onClick={() => editTask(task)}>Edit</button>
              <button disabled={!task.mode} className="btn btn-error rounded-xl w-20  btn-soft btn-xs" onClick={() => deleteTask(task.id)}>Delete</button>
            </div>

          </li>
        ))}
      </ul>

    </div>
  );
}
