import React from "react";
import { Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </main>
  );
}

export default App;
