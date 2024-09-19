// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import MapPage from "./components/pages/MapPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/map" element={<MapPage />} />
    </Routes>
  );
}

export default App;
