"use client";

import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  console.log("Render");
  const handleCount = () => {
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 5);
    setCount((prev) => prev + 10);
    console.log("After count => ", count);
  };
  return (
    <div>
      <button
        onClick={handleCount}
        className="w-40 bg-green-500 rounded-2xl p-2"
      >
        Count: {count}
      </button>
    </div>
  );
};

export default Counter;
