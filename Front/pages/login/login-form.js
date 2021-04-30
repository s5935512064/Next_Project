import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Link from "next/link";
import emailLogin from "../../firebase/login";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react"
import { auth } from "../../config/firebaseClient";


const schema = yup.object().shape({
  email: yup.string().email().required("* Email is required."),
  password: yup
    .string()
    .required("* Password is required.")
    .min(8, "* Password is too short - should be 8 chars minimum."),
});

export default function LoginForm() {
  const [loginError, setLoginError] = useState();
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    emailLogin({ email: data.email, password: data.password }).catch((e) =>
      setLoginError(e.message)
    );
  };

  auth.onAuthStateChanged(function (user) {
    if (user) {
      console.log(user);
      typeof window !== "undefined" && router.push("/");
    }
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Input
        name="email"
        register={register}
        placeholder="E-mail"
        error={errors.email}
      />
      {errors.email && (
        <span style={{ color: "red", marginTop: 4, fontSize: 14 }}>
          {errors.email.message}
        </span>
      )}

      <Input
        name="password"
        register={register}
        placeholder="Password"
        type="password"
        error={errors.password}
      />
      {errors.password && (
        <span style={{ color: "red", marginTop: 4, fontSize: 14 }}>
          {errors.password.message}
        </span>
      )}
      
      <Checkbox>Remember Me</Checkbox>
      <Button type="submit">Login</Button>
      {loginError && (
        <span
          style={{
            color: "red",
            marginTop: -10,
            fontSize: 14,
            marginBottom: 10,
          }}
        >
          {loginError}
        </span>
      )}
      <span style={{ fontWeight: "bold", marginBottom: 60 }}>
        <Link href="/forgot-password">Forgot Password?</Link>
      </span>

    </form>
  );
}
