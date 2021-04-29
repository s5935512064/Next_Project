import { firebase, auth, db } from "../config/firebaseClient";

const deleteVaccine = ({ id }) => {
  return db
    .collection("Vaccine")
    .doc(id)
    .delete()
    .then(() => {
      db.collection("Vaccine")
        .doc(id)
        .update({
          product: firebase.firestore.FieldValue.arrayRemove(id),
        })
        .finally(() => window.location.reload(false)); // reload page
    });
};

export { deleteVaccine};
