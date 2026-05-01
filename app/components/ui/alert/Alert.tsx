"use client";

import React, { ReactNode } from "react";
import style from "./Alert.module.css";
import ActionButton from "../actionbutton/ActionButton";

type AlertProps = {
  children: ReactNode;
  type?: string;
};

const Alert = ({ children, type = "success" }: AlertProps) => {
  const handleClick = () => {
    console.log("clicked");
  };
  const handleSubscription = () => {
    console.log("handleSubscription clicked");
  };
  return (
    <>
      <ActionButton text="Subscribe" onClick={handleSubscription} />

      {/* <div
      style={{
        color: "#fff",
        backgroundColor: type === "success" ? "#10bfdd" : "#ef4444",
        padding: "10px",
      }}
    >
      {children}
    </div> */}
      <button
        onClick={handleClick}
        style={{
          color: "#fff",
          backgroundColor: "#10bfdd",
          padding: "10px",
        }}
      >
        Click
      </button>

      <div className={`${style.alert} ${style[type]}`}>{children}</div>
    </>
  );
};

export default Alert;
