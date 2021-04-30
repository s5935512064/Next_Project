import { auth } from "../config/firebaseClient";
import { useRouter } from "next/router";

export default function emailLogin({ email, password }) {
  console.log("check");
  return auth.signInWithEmailAndPassword(email, password);
}