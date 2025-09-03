import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { unstableSetRender } from "antd";
import "./index.css";
import "antd/dist/reset.css";
import App from "./App.jsx";
import "@ant-design/v5-patch-for-react-19";
import { jwtDecode } from "jwt-decode";

unstableSetRender((node, container) => {
  container._reactRoot ||= createRoot(container);
  const root = container._reactRoot;
  root.render(node);
  return async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    root.unmount();
  };
});

let root = document.getElementById("root");
root = createRoot(root);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
