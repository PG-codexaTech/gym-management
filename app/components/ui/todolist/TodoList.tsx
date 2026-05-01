"use client";

import React, { useState } from "react";

const TodoList = () => {
  const [todo, setTodo] = useState([
    { id: 1, task: "task1", done: false },
    { id: 2, task: "task2", done: false },
  ]);

  const handleTodo = () => {
    const newItem = [
      {
        id: Date.now(),
        task: "New task",
        done: false,
      },
    ];
    setTodo(todo.concat(newItem));
  };

  const handleTodoRemove = (id: number) => {
    setTodo(todo.filter((item) => item.id !== id));
  };

  const toggleDone = (id: number) => {
    setTodo(
      todo.map((item) => {
        if (item.id === id) {
          return { ...item, done: !item.done };
        }
        return item;
      })
    );
  };

  return (
    <div className="text-white">
      {todo.map((item) => {
        return (
          <>
            <p
              key={item.id}
              style={{ textDecoration: item.done ? "line-through" : "none" }}
            >
              {item.task}
            </p>
            <button
              onClick={() => toggleDone(item.id)}
              className="w-40 bg-blue-500 rounded-2xl p-2"
            >
              {item.done ? "Undo" : "Done"}
            </button>
            <button
              onClick={() => handleTodoRemove(item.id)}
              className="w-40 bg-red-500 rounded-2xl p-2"
            >
              Remove
            </button>
          </>
        );
      })}
      <br />
      <button
        onClick={handleTodo}
        className="w-40 bg-green-500 rounded-2xl p-2 mt-5"
      >
        Update
      </button>
    </div>
  );
};

export default TodoList;
