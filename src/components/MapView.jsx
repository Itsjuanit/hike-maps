import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import L from "leaflet";

function MapView({ routes }) {
  const mapRef = useRef();

  useEffect(() => {
    if (routes && routes.length > 0 && mapRef.current) {
      const map = mapRef.current;
      const bounds = L.latLngBounds([]);
      routes.forEach((route) => {
        const geoJsonLayer = L.geoJSON(route.geoJson);
        bounds.extend(geoJsonLayer.getBounds());
      });
      if (bounds.isValid()) {
        map.fitBounds(bounds); // Asegurarse de que los bounds sean válidos
      }
    }
  }, [routes]);

  return (
    <MapContainer
      center={[-31.5375, -68.5364]}
      zoom={10}
      style={{ height: "60vh", width: "100%" }}
      whenCreated={(mapInstance) => {
        mapRef.current = mapInstance;
      }}
    >
      <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {routes &&
        routes.map((route) => (
          <GeoJSON
            key={route.id}
            data={route.geoJson}
            style={() => ({
              color: route.color,
              weight: 5,
              opacity: 0.8,
            })}
            onEachFeature={(feature, layer) => {
              layer.bindTooltip(route.name, {
                permanent: false,
                direction: "top",
                offset: [0, -10],
              });
            }}
          />
        ))}
    </MapContainer>
  );
}

export default MapView;
