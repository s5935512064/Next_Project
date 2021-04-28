import Head from 'next/head'
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {useAuth} from '../../firebase/context';
import { useRouter } from "next/router";
import styles from "./account.module.scss";

const schema = yup.object().shape({
    name: yup
      .string()
      .required("* Name is required.")
      .min(2, "* Name is too short"),
    surname: yup
      .string()
      .required("* Surname is required.")
      .min(2, "* Surname is too short"),
    email: yup.string().email().required("* Email is required."),
    phone: yup
      .string()
      .notRequired()
      .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g, {
        message: "Invalid Phone Number",
        excludeEmptyString: true,
      }),
  });

  const schema2 = yup.object().shape({
    currentPassword: yup
      .string()
      .required("* Current Password is required.")
      .min(8, "* Password is too short - should be 8 chars minimum."),
    newPassword: yup
      .string()
      .required("* New Password is required.")
      .min(8, "* Password is too short - should be 8 chars minimum."),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
  });

  export default function AccountPage() {
    const [passwordError, setError] = useState(null);
    const [photo, setPhoto] = useState(null);
    const { user, loading } = useAuth();
  
    const { register, handleSubmit, watch, formState: { errors }} = useForm({
      resolver: yupResolver(schema),
    });
  
    const {
      register: register2,
      handleSubmit: handleSubmit2,
      errors: errors2,
      getValues,
    } = useForm({
      resolver: yupResolver(schema2),
    });
  
    const onSubmit = ({ email, phone, name, surname }) => {
      updateUser({
        email,
        phone,
        name,
        surname,
        photo,
        finalEvent: () => window.location.reload(false),
      });
    };

    if (!user && !loading) useRouter().push("/login");
    return (
        <main className={styles.container}>
        <Head>
            <title>My Account</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
          <h1 className={styles.title}>My Account</h1>
          <div className={styles.content}>
            <div className={styles.accountContainer}>
              <h4>Account Details</h4>
              <form key="account-form" onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputContainer}>
                  <span>Name</span>
                  <Input
                    name="name"
                    defaultValue={user?.name}
                    noMargin
                    register={register}
                    placeholder="Name"
                    error={errors.name}
                  />
                </div>
                {errors.name && (
                  <span style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                    {errors.name.message}
                  </span>
                )}
                <div className={styles.inputContainer}>
                  <span>Surname</span>
                  <Input
                    name="surname"
                    defaultValue={user?.surname}
                    noMargin
                    register={register}
                    placeholder="Surname"
                    error={errors.surname}
                  />
                </div>
                {errors.surname && (
                  <span style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                    {errors.surname.message}
                  </span>
                )}
                <div className={styles.inputContainer}>
                  <span>Email</span>
                  <Input
                    name="email"
                    defaultValue={user?.email}
                    noMargin
                    register={register}
                    placeholder="E-mail"
                    error={errors.email}
                  />
                </div>
                {errors.email && (
                  <span style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                    {errors.email.message}
                  </span>
                )}
                <div className={styles.inputContainer}>
                  <span>Phone Number</span>
                  <Input
                    name="phone"
                    defaultValue={user?.phoneNumber}
                    noMargin
                    register={register}
                    error={errors.phone}
                  />
                </div>
                {errors.phone && (
                  <span style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                    {errors.phone.message}
                  </span>
                )}
                <div className={styles.inputContainer}>
                  <span>Profile Photo</span>
  
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
                <Button type="submit" name="update_button" value="Update">
                  Update
                </Button>
              </form>
            </div>
            <hr />
          </div>
        </main>
    );
  }
