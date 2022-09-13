
import { Route, Routes } from 'react-router-dom';
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import "./styles/App.css"


function App() {
  return (
    <main>
      <Navigation />
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
