
import React from "react";
import { Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Layout from './pages/Layout';
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import RequireAuth from './components/RequireAuth';
import "./styles/App.css"

const ROLES = {
  'Client': 1,
  'Partner': 2,
  'Admin': 3
}

function App() {
  return (
    <main>
      <Routes>
          {/* public routes */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />

          {/* protected routes*/}
          <Route element={<RequireAuth allowedRoles={[ROLES.Client]} />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Client]} />}>
            <Route path="profile" element={<Profile />} />
          </Route>
      </Routes>
    </main>
  );
}

export default App;
