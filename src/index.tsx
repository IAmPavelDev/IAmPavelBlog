import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Blog from "./components/Blog/Blog";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/admin" element={<AdminPanel />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
