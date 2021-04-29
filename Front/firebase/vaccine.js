import { auth, db } from "../config/firebaseClient";

function VaccineDatabase({ id, name, description, price, performance}) {
  return db.collection("Vaccine").doc(id).set({
    name,
    description,
    price,
    performance,
    photoUrl: null,
  });
}

export { VaccineDatabase};
