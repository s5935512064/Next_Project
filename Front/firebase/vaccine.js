import { firebase, auth, db } from "../config/firebaseClient";

function VaccineDatabase({ id, name, description, price, performance, photo, finalEvent }) {
    if (photo) {
    return firebase
      .storage()
      .ref("vaccines/" + id + (photo?.name || "0"))
      .put(photo)
      .then((doc) => {
        doc.ref.getDownloadURL().then((url) => {
          db.collection("Vaccine")
            .doc(id)
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
