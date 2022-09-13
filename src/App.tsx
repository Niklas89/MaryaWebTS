import React from "react";
import { Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Register from "./Register";

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
