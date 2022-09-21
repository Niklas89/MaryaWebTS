
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
import PersistLogin from './components/form/PersistLogin';
import "./styles/App.css";
import CardService from './components/service/CardService';
import Booking from './pages/Booking';

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
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/service/:id" element={<CardService />} />
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<Home />} />

          {/* protected routes*/}
          <Route element={<PersistLogin />}>
            {/*<Route element={<RequireAuth allowedRoles={[ROLES.Client]} />}>
            <Route path="/" element={<Home />} />
            </Route>*/}

            <Route element={<RequireAuth allowedRoles={[ROLES.Client]} />}>
              <Route path="profile" element={<Profile />} />
              <Route path="/booking" element={<Booking />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="admin" element={<Admin />} />
            </Route>
          </Route>
        </Route>
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
