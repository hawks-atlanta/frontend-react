import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App } from "./screens/App.tsx";
import "./global.css";
import { NavbarScreen } from "./components/Nav/Nav.tsx";
import { Login } from "./screens/Login.tsx";
import { Register } from "./screens/Register.tsx";

import { FilePage } from "./screens/FilePage.tsx";
import { Toaster } from "react-hot-toast";
import { AuthMiddleware } from "./screens/middlewares/AuthMiddleware.tsx";
import { FilesContextProvider, AuthContextProvider } from "./context/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <Toaster position="bottom-right" />
        <NavbarScreen />
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route
            path="/login"
            element={
              <AuthMiddleware mustBeAuthenticated={false}>
                <Login />
              </AuthMiddleware>
            }
          ></Route>
          <Route
            path="/register"
            element={
              <AuthMiddleware mustBeAuthenticated={false}>
                <Register />
              </AuthMiddleware>
            }
          ></Route>
          <Route
            path="/files"
            element={
              <AuthMiddleware mustBeAuthenticated={true}>
                <FilesContextProvider>
                  <FilePage />
                </FilesContextProvider>
              </AuthMiddleware>
            }
          ></Route>
          <Route
            path="/shared"
            element={
              <AuthMiddleware mustBeAuthenticated={true}>
                <FilesContextProvider>
                  <FilePage />
                </FilesContextProvider>
              </AuthMiddleware>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);
