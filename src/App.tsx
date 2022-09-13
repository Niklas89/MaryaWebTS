
import React from "react";
import { Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Register from "./Register";
 import Footer from './components/Footer';
import Navigation from './components/Navigation';
import "./styles/App.css"

function App() {
  return (
    <main className="App">
      < Navbar />
      <Routes>
        <Route path="/" element={<Register />} />
      </Routes>
    </main>
  );
}

export default App;
