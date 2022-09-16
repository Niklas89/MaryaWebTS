
import { Route, Routes } from 'react-router-dom';
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Layout from './pages/Layout';
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Footer from './components/parts/Footer';
import Navigation from './components/parts/Navigation';
import RequireAuth from './components/RequireAuth';
import "./styles/App.css";
import CardService from './components/service/CardService';

const ROLES = {
  "Client": 1,
  "Partner": 2,
  "Admin": 1
}

function App() {
  return (
    <main>
      <Navigation />
      <Routes>
        {/* public routes */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/service/:id" element={<CardService />} />

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
      <Footer />
    </main>
  );
}

export default App;
