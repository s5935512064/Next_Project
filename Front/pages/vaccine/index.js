import Head from 'next/head'
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useAuth} from '../../firebase/context';
import { db } from "../../config/firebaseClient";
import { useRouter } from "next/router";
import styles from "./vaccine.module.scss";
import Input from "../../components/Input";
import Button1 from "../../components/Button";
import { VaccineDatabase } from "../../firebase/vaccine";
import { Spinner, Table,Thead,Tbody,Tfoot,Tr,Th,Td,TableCaption,Button } from "@chakra-ui/react"
import {deleteVaccine} from "../../firebase/deleteVaccine";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("* Name is required.")
    .min(2, "* Name is too short"),
  description: yup
    .string()
    .required("* Description is required.")
    .min(2, "* Description is too short"),
  price: yup
    .string()
    .required("* Price is required.")
    .min(1, "* Price should be 1 USD minimum."),
  performance: yup
    .string()
    .required("* Performance is required.")
    .min(1, "* Performance should be guarantee your vaccine."),
});

export default function Vaccine({ data, query }) {
    const { user, loading } = useAuth();
    const [photo, setPhoto] = useState(null);
    const [addVaccineError, setAddVaccineError] = useState();
    const { id, name, description,image,price,performance } = data

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = ({ name, description, price, performance }) =>
        VaccineDatabase({
          name,
          description,
          price,
          performance,
          photo,
          finalEvent: () => window.location.reload(false),
        })
          .then(() =>
          setAddVaccineError(
              "You have add vaccine succesfully."
            )
          )
          .catch((e) => setAddVaccineError(e.message));

    const onSubmit2 = async (id) => {
            // console.log(id)
            deleteVaccine({
            id,
            finalEvent: () => window.location.reload(false),
          })}


    
    if (!user && !loading) useRouter().push("/login");
    if (loading) return <div><Spinner /></div>        

  return (
    <div className={styles.container}>
        <Head>
        <title>Add Vaccine </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <a className={styles.title}>Add a COVID-19 Vaccines.</a>
      <div className={styles.content}>
      <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", flexDirection: "column", paddingTop: 5 }}
    >
       <div className={styles.inputContainer}>
          <span>Name</span>
      <Input
        name="name"
        register={register}
        placeholder="Vaccine Name"
        error={errors.name}
      />
      </div>
      {errors.name && (
        <span style={{ color: "red", marginTop: 1, fontSize: 14 }}>
          {errors.name.message}
        </span>
      )}
       <div className={styles.inputContainer}>
          <span>Detail</span>
      <Input
        name="description"
        register={register}
        placeholder="Vaccine Detail"
        error={errors.description}
      />
      </div>
      {errors.description && (
        <span style={{ color: "red", marginTop: 1, fontSize: 14 }}>
          {errors.description.message}
        </span>
      )}
       <div className={styles.inputContainer}>
          <span>Price</span>
      <Input
        name="price"
        register={register}
        placeholder="Price"
        type="number"
        error={errors.price}
      />
      </div>
      {errors.price && (
        <span style={{ color: "red", marginTop: 1, fontSize: 14 }}>
          {errors.price.message}
        </span>
      )}
       <div className={styles.inputContainer}>
          <span>Efficiency</span>
          <Input
        name="performance"
        register={register}
        placeholder="Performance"
        type="number"
        error={errors.performance}
      />
                
      </div>
     
      {errors.performance && (
        <span style={{ color: "red", marginTop: 1, fontSize: 14 }}>
          {errors.performance.message}
        </span>
      )}
       <div className={styles.inputContainer}>
                  <span>Photo</span>
                  <label className={styles.uploadButton}>
                    <input
                      type="file"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                    {photo?.name || "Select File"}
                  </label>
                </div>


      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}

      {addVaccineError && (
        <span
          style={{
            color: "green",
            marginTop: 10,
            fontSize: 14,
            marginBottom: -10,
          }}
        >
          {addVaccineError}
        </span>
      )}

      <Button1 type="submit">Add a Vaccine</Button1>
    </form>
    <div className={styles.vaccineContainer}>
    <div className={styles.products}>
                  <Table variant="simple">
                    <TableCaption>Manage COVID-19 Vaccine</TableCaption>
                    <Thead>
                      <Tr>
                        <Th>Name</Th>
                        <Th isNumeric>Efficiency</Th>
                        <Th isNumeric>Price</Th>
                        <Th>Status</Th>
                      </Tr>
                    </Thead>    
              {!loading &&
               data.map((product, key) => {
                return (
                        <Tbody key={key}>
                        <Tr>
                        <Td>{product.name}</Td>
                        <Td isNumeric>{product.performance}%</Td>
                        <Td isNumeric>{product.price}$</Td>
                        <Td ><Button type="submit" colorScheme="red" onClick={() => onSubmit2(product.id)}>Delete</Button></Td>
                        </Tr>
                        </Tbody>
                      );
                      })}
                  </Table>
          </div>
    </div>
    </div>
   

    </div>
  );
}

Vaccine.getInitialProps = async function ({ query }) {
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
