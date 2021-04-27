import Head from 'next/head'
import React, {useState} from 'react'
import firebaseClient from '../lib/firebaseClient'
import firebase from 'firebase/app'
import 'firebase/auth'
import styles from '../styles/Admin.module.css'
import { useToast } from "@chakra-ui/react"
// import {Box, Flex, Input, FormControl, FormHelperText, Stack, Button, Heading, useToast,} from "@chakra-ui/react"
// import { jsx } from '@emotion/react'

export default function Login(){
    firebaseClient();
    const toast = useToast()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginForm = () => (
        <div className={styles.gridContainer}>
            <div>
                Email:
            </div>
            <div>
                <input type="text"
                    name="email"
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                Password:
            </div>
            <div>
                <input type="password"
                    name="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)} />
            </div>
        </div>
    )

    return(
        <div className={styles.container}>
             <Head>
                <title>Login</title>
            </Head>
            <div className={styles.container}>
                <h1>Login</h1>
            <br/>
            <div>
            {loginForm()}
            <br/>
            </div>
            <div className="p-s">
            <button className="btn btn-success me-3" onClick={async () => {
                await firebase.auth().createUserWithEmailAndPassword(email,password).then(function(){
                    window.location.href = "/"
                }).catch(function(error){
                    const message = error.message;
                    toast({
                        title: "An error occured",
                        description: message,
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    })
                })
            }}>Creat Account</button>
            <button className="btn btn-success me-3" onClick={async () => {
                await firebase.auth().signInWithEmailAndPassword(email,password).then(function(){
                    window.location.href = "/"
                }).catch(function(error){
                    const message = error.message;
                     toast({
                        title: "An error occured",
                        description: message,
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    })
                })
            }}>Login</button>
            </div>
            </div>
        </div>
    )
}