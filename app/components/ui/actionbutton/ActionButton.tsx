"use client";

import React from "react";

const ActionButton = ({
  text,
  onClick = () => {},
}: {
  text: string;
  onClick?: () => void;
}) => {
  return (
    <div>
      <button onClick={onClick} className="w-40 bg-amber-400 rounded-2xl p-2">
        {text}
      </button>
    </div>
  );
};

export default ActionButton;
