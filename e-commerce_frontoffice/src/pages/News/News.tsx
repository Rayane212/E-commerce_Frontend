import React from "react";
import Main from "../../components/main/Main";
import Sidebar from "../../components/sidebar/Sidebar";
import "./News.css";

export default function News() {
  return (
    <div className="body">
      <Sidebar />
      <Main />
    </div>
  );
}
