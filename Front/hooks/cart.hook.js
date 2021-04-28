import { db, auth } from "../config/firebaseClient";
import { useState, useEffect } from "react";
import Link from 'next/link';

const useCart = (id) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFromFirestore() {
      auth.currentUser &&
        db
          .collection("Users")
          .doc(auth.currentUser?.uid)
          .onSnapshot(snap => {
            const collections = snap.docs.map(doc => ({
              ...doc.data().cart
            }));
            setData(collections);
          });
    }

    fetchFromFirestore();
  }, [auth.currentUser]);

  return {
    data,
    loading,
    error,
  };
};

const useCartOnce = (id) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log("once");

  useEffect(() => {
    async function fetchFromFirestore() {
      console.log("once inner");

      db.collection("Users")
        .doc(auth.currentUser?.uid)
        .get()
        .then(function (doc) {
          setData(doc.data().cart);
          setLoading(false);
        })
        .catch((e) => setError(e));
    }
    auth.currentUser?.uid && fetchFromFirestore();
  }, [auth.currentUser]);

  return {
    data,
    loading,
    error,
  };
};

export { useCart, useCartOnce };
