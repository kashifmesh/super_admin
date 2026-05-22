import React from "react";
import { Spin } from "antd";
import "./Loader.css"
const Loader = ({ height = "100vh" }) => {
  return (
    <div className="loader-container" style={{ height }}>
      <Spin size="large" />
    </div>
  );
};

export default Loader;