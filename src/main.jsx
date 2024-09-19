// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Importa BrowserRouter
import App from "./App";

// Estilos de PrimeReact
import "primereact/resources/themes/saga-blue/theme.css"; // O el tema que prefieras
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

// Estilos de Leaflet
import "leaflet/dist/leaflet.css";

// Estilos globales
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
