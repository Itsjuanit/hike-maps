// pages/MapPage.jsx
import React, { useState, useEffect } from "react";
import FileUploader from "../FileUploader";
import MapView from "../MapView";
import RoutesList from "../RoutesList";
import { parseGpxToGeoJson } from "../../utils";
import { uploadFileToStorage, saveRouteMetadata } from "../../firebaseFunction";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function MapPage() {
  const [routes, setRoutes] = useState([]);
  const [selectedRoutes, setSelectedRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Cargar todas las rutas al iniciar la aplicación
  useEffect(() => {
    const fetchRoutes = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "routes"));
        const fetchedRoutes = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            geoJson: JSON.parse(data.geoJson),
            color: data.color || getRandomColor(),
          };
        });
        setRoutes(fetchedRoutes);
        setSelectedRoutes(fetchedRoutes);
      } catch (error) {
        console.error("Error al cargar rutas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoutes();
  }, []);

  const handleUpload = async (gpxData, fileName) => {
    setUploading(true);
    try {
      const geoJson = parseGpxToGeoJson(gpxData);
      const color = getRandomColor();

      await uploadFileToStorage(gpxData, fileName);
      await saveRouteMetadata(fileName, geoJson, color);

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
      setUploading(false);
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

export default MapPage;
