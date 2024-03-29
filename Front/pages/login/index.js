import Head from 'next/head'
import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./login.module.scss";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";
import { auth } from "../../config/firebaseClient";

export default function LoginPage() {
  const [page, setPage] = useState("login");
  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <a className={styles.logo}>PSU Care Covid-19</a>
      <div className={styles.content}>
        <div className={styles.switchContainer}>
          <button
            className={styles.switchButton}
            onClick={() => setPage("login")}
            style={{ backgroundColor: page === "login" ? "white" : "#f6f6f6" }}
          >
            <span>Login</span>
          </button>
          <button
            className={styles.switchButton}
            onClick={() => setPage("register")}
            style={{
              backgroundColor: page === "register" ? "white" : "#f6f6f6",
            }}
          >
            <span>Register</span>
          </button>
        </div>
        {page === "login" ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
}