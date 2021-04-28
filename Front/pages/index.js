import Head from 'next/head'
import React from 'react'
import Link from 'next/link'
import {useAuth} from '../firebase/context'
import { db } from "../config/firebaseClient";


export default function Home() {

  const auth = useAuth();

  return (
    <div className="container">
      <Head>
        <title>PSU Care Covid-19</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
  
      </main>
    </div>
  )
}
