import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./header.module.scss";
import ArrowIcon from "../Icons/arrow";
import {useAuth} from '../../firebase/context';
import { db, auth } from "../../config/firebaseClient";
import { useRouter } from "next/router";

export default function Header(){
    const [showHeader, setShowHeader] = useState({
      transform: "translate3d(100vw, 0, 0)",
    });

  
    const router = useRouter();
  
    const { user } = useAuth();


    return (
        <nav className={styles.container}>
          <div className={styles.logoContainer}>
            <Link href="/">
              <a className={styles.logo}>PSU Care <span style={{color:"red"}}>Covid-19</span></a>
            </Link>
        </div>
        <div className={styles.rightMenu}>
            <div className={styles.menuContent} style={showHeader}>
            {user ? (
                <>
                <Link href="/vaccine">Add Vaccine</Link>
                <Link href="/account">My Account</Link>
                <Link href="/account/logout">Logout</Link>
                </>
            ) : (
                <>
                <Link href="/">Home</Link>
                <Link href="/product">Vaccine</Link>
                <Link href="/login">Login</Link>
                <Link href="/login">Register</Link>
                </>
            )}
            </div>
            <div
            className={styles.background}
            style={showHeader}
            onClick={() =>
                setShowHeader({ transform: "translate3d(100vw, 0, 0)" })
            }
            />
            </div>
      <div className={styles.rightContent}>
        <Link href="/account">
          <div className={styles.profileContainer}>
            <img
              src={user?.photoUrl || "https://picsum.photos/200/200"}
              className={styles.profilePhoto}
              loading="lazy"
            />
            <span>
              Hello{" "}
              <span style={{ fontWeight: "normal" }}>
                {user?.name || "Guest"}
              </span>
            </span>
            <ArrowIcon width={10} height={10} className={styles.arrowIcon} />
            <div className={styles.dropdown}>
              <div className={styles.arrowUp} />
              <div className={styles.dropdownMenu}>
                {user ? (
                  <>
                    <Link href="/vaccine">Add Vaccine</Link>
                    <Link href="/account">My Account</Link>
                    <Link href="/account/logout">Logout</Link>
                  </>
                ) : (
                  <>
                    <Link href="/">Home</Link>
                    <Link href="/product">Vaccine</Link>
                    <Link href="/login">Login</Link>
                    <Link href="/login">Register</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </nav>
  );
}