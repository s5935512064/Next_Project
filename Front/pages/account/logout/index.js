import React from "react";

import { auth } from "../../../config/firebaseClient";
import { useRouter } from "next/router";

export default function Logout() {
  const router = useRouter();

  auth
    .signOut()
    .finally(() => typeof window !== "undefined" && router.push("/login"));
  return <div></div>;
}
