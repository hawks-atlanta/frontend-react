import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App } from "./screens/App.tsx";
import "./global.css";
import { NavbarScreen } from "./components/Nav/Nav.tsx";
import { Login } from "./screens/Login.tsx";
import { Register } from "./screens/Register.tsx";
// import { UpdatePassword } from "./components/UpdatePassword/UpdatePassword.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <NavbarScreen />
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>

        {/* <Route path="/modal" element={<UpdatePassword />}></Route> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
