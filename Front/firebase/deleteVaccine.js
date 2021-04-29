import { firebase, auth, db } from "../config/firebaseClient";

function deleteVaccine({ id }){
  console.log(id)
  return db
    .collection("Vaccine")
    .doc(id)
    .delete({})
    .then(() => {
      console.log("Document successfully deleted!");
    }).catch((error) => {
      console.error("Error removing document: ", error);
    })
    .finally(() => window.location.reload(false)); // reload page
};

export {deleteVaccine};
