import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Accordion, AccordionTab } from "primereact/accordion";

function RoutesList({ routes, selectedRoutes, onSelectionChange }) {
  const onSelectionChangeHandler = (e) => {
    onSelectionChange(e.value);
  };

  return (
    <>
      <h3 style={{ color: "#212121" }}>Rutas Disponibles</h3>
      <Accordion activeIndex={0}>
        <AccordionTab header="Rutas">
          <DataTable
            value={routes}
            selection={selectedRoutes}
            onSelectionChange={onSelectionChangeHandler}
            selectionMode="multiple"
            dataKey="id"
            paginator
            rows={5}
            responsiveLayout="scroll"
          >
            <Column selectionMode="multiple" headerStyle={{ width: "3em" }}></Column>
            <Column field="name" header="Nombre"></Column>
          </DataTable>
        </AccordionTab>
      </Accordion>
    </>
  );
}

export default RoutesList;
