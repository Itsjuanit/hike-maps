import React, { useRef } from "react";
import { FileUpload } from "primereact/fileupload";

function FileUploader({ onUpload }) {
  const fileUploadRef = useRef(null);

  const customBase64Uploader = async (event) => {
    const file = event.files[0];
    const fileName = file.name.replace(".gpx", "");
    const reader = new FileReader();

    reader.onload = (e) => {
      const gpxData = e.target.result;
      onUpload(gpxData, fileName);
      // Limpiamos el componente FileUpload
      if (fileUploadRef.current) {
        fileUploadRef.current.clear();
      }
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <FileUpload
        ref={fileUploadRef}
        name="gpxFile"
        accept=".gpx"
        customUpload
        uploadHandler={customBase64Uploader}
        mode="basic"
        chooseLabel="Subir ruta GPX"
      />
    </div>
  );
}

export default FileUploader;
