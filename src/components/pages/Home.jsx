import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="p-d-flex p-jc-center p-ai-center" style={{ height: "100vh" }}>
      <Card
        title="Bienvenido a HikeMaps"
        subTitle="Visualiza tus rutas de senderismo en un mapa interactivo"
        footer={
          <Button label="Explorar Rutas" icon="pi pi-map" className="p-button-raised p-button-primary" onClick={() => navigate("/map")} />
        }
        className="p-shadow-5"
        style={{ maxWidth: "600px", textAlign: "center" }}
      >
        <p>
          Esta aplicación está diseñada para visualizar y explorar diferentes rutas de senderismo y hiking en un mapa real. Puedes subir tus
          propias rutas o navegar por las rutas disponibles.
        </p>
      </Card>
    </div>
  );
}

export default Home;
