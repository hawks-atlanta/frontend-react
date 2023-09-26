import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App } from "./screens/App.tsx";
import "./global.css";
// import { NavbarScreen } from "./components/Nav/Nav.tsx";
import { Login } from "./screens/Login.tsx";
import { Register } from "./screens/Register.tsx";
import { Homepage } from "./screens/Home.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      {/*<NavbarScreen />*/}
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/home" element={<Homepage />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
