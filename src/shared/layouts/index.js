import React from "react";
import Sidebar from "./utils/Sidebar";

export default function layouts({ children }) {
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
}
