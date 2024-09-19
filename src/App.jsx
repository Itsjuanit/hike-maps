import React, { useState, useEffect } from "react";
import FileUploader from "./components/FileUploader";
import MapView from "./components/MapView";
import RoutesList from "./components/RoutesList";
import { parseGpxToGeoJson } from "./utils";
import { uploadFileToStorage, saveRouteMetadata } from "./firebaseFunction";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function App() {
  const [routes, setRoutes] = useState([]);
  const [selectedRoutes, setSelectedRoutes] = useState([]);
  const [loading, setLoading] = useState(false); // Estado de loading
  const [uploading, setUploading] = useState(false); // Estado de uploading

  // Cargar todas las rutas al iniciar la aplicación
  useEffect(() => {
    const fetchRoutes = async () => {
      setLoading(true); // Inicia el loading
      try {
        const querySnapshot = await getDocs(collection(db, "routes"));
        const fetchedRoutes = querySnapshot.docs.map((doc, index) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            geoJson: JSON.parse(data.geoJson),
            color: data.color || getRandomColor(),
          };
        });
        setRoutes(fetchedRoutes);
        setSelectedRoutes(fetchedRoutes); // Por defecto, todas las rutas están seleccionadas
      } catch (error) {
        console.error("Error al cargar rutas:", error);
      } finally {
        setLoading(false); // Finaliza el loading
      }
    };
    fetchRoutes();
  }, []);

  const handleUpload = async (gpxData, fileName) => {
    setUploading(true); // Inicia el estado de uploading
    try {
      const geoJson = parseGpxToGeoJson(gpxData);
      const color = getRandomColor();

      await uploadFileToStorage(gpxData, fileName); // Sube el archivo a Firebase
      await saveRouteMetadata(fileName, geoJson, color); // Guarda los metadatos en Firestore

      const newRoute = {
        id: Date.now().toString(),
        name: fileName,
        geoJson: geoJson,
        color: color,
      };
      setRoutes((prevRoutes) => [...prevRoutes, newRoute]);
      setSelectedRoutes((prevSelected) => [...prevSelected, newRoute]);
    } catch (error) {
      console.error("Error al subir la ruta:", error);
    } finally {
      setUploading(false); // Finaliza el estado de uploading
    }
  };

  const handleRouteSelectionChange = (updatedSelectedRoutes) => {
    setSelectedRoutes(updatedSelectedRoutes);
  };

  if (loading) {
    return <div>Cargando rutas...</div>;
  }

  return (
    <div>
      <FileUploader onUpload={handleUpload} />
      {uploading && <p>Subiendo ruta...</p>}
      <RoutesList routes={routes} selectedRoutes={selectedRoutes} onSelectionChange={handleRouteSelectionChange} />
      <MapView routes={selectedRoutes} />
    </div>
  );
}

export default App;
