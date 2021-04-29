import { firebase, auth, db } from "../config/firebaseClient";

function updateUser({ email, name, surname, phoneNumber, photo, finalEvent }) {
  const currentUser = auth.currentUser.uid;
  // console.log(email)
  if (photo) {
    return firebase
      .storage()
      .ref("images/" + currentUser + (photo?.name || "0"))
      .put(photo)
      .then((doc) => {
        doc.ref.getDownloadURL().then((url) => {
          db.collection("Users")
            .doc(currentUser)
            .update({
              name,
              surname,
              email,
              phoneNumber,
              photoUrl: url,
            })
            .catch((e) => console.log(e))
            .finally(() => finalEvent());
        });
      })
      .catch((e) => console.log(e));
  }

  return db
    .collection("Users")
    .doc(currentUser)
    .update({
      name,
      surname,
      email,
      phoneNumber,
    });
}

export { updateUser };
