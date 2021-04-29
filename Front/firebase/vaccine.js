import { firebase, auth, db } from "../config/firebaseClient";

function VaccineDatabase({ id, name, description, price, performance, photo, finalEvent }) {
  const currentUser = auth.currentUser.uid;
    
    if (photo) {
    return firebase
      .storage()
      .ref("vaccines/" + currentUser + (photo?.name || "0"))
      .put(photo)
      .then((doc) => {
        doc.ref.getDownloadURL().then((url) => {
          db.collection("Vaccine")
            .doc(currentUser)
            .set({
              name,
              description,
              price,
              performance,
              photoUrl: url,
            })
            .catch((e) => console.log(e))
            .finally(() => finalEvent());
        });
      }).catch((e) => console.log(e));
    }
}

export { VaccineDatabase };
