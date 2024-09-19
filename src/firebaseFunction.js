// firebaseFunctions.js
import { ref, uploadString } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from "./firebaseConfig";

// Función para subir el archivo GPX a Firebase Storage
export async function uploadFileToStorage(gpxData, fileName) {
  const storageRef = ref(storage, `routes/${fileName}.gpx`);
  await uploadString(storageRef, gpxData, "raw", { contentType: "application/gpx+xml" });
}

// Función para guardar los metadatos de la ruta en Firestore
export async function saveRouteMetadata(fileName, geoJson) {
  await addDoc(collection(db, "routes"), {
    name: fileName,
    timestamp: Date.now(),
    geoJson: JSON.stringify(geoJson), // Serializamos el objeto a cadena JSON
  });
}
