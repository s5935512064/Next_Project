import { auth } from "../config/firebaseClient";

export default function emailLogin({ email, password }) {
  return auth.signInWithEmailAndPassword(email, password);
}
