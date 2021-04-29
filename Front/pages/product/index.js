import Head from "next/head";
import styles from "./product.module.scss";
import { useAuth } from "../../firebase/context";
import { db } from "../../config/firebaseClient";
import ProductCard from "../../components/ProductCard/product-card";


export default function Product({ data, query }) {
  const { user, loading } = useAuth();
  console.log(user, loading);

  return (
      <div className={styles.container}>
        <Head>
          <title>Vaccine</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <div className={styles.header}>
            <h1 className={styles.title}>
              COVID-19 Vaccine
            </h1>
          </div>
          <div className={styles.products}>
            {!loading &&
              data.map((product) => {
                return (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    description={product.description}
                    image={product.photoUrl}
                    price={product.price}
                    performance={product.performance}
                  />
                );
              })}
          </div>
        </main>
      </div>
  );
}


Product.getInitialProps = async function ({ query }) {
  let data = {};
  let error = {};

  await db
    .collection("Vaccine")
    .get()
    .then(function (querySnapshot) {
      const products = querySnapshot.docs.map(function (doc) {
        return { id: doc.id, ...doc.data() };
      });
      data = products;
    })
    .catch((e) => (error = e));

  return {
    data,
    error,
    query,
  };
};
