import React, { useState } from "react";
import styles from "./product.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../../firebase/context";

export default function ProductCard({
  bgColor,
  id,
  brand,
  name,
  price,
  sale_price,
  image,
  favorite,
  ...props
}) {

  const { user, loading } = useAuth();

  const router = useRouter();

  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: bgColor || "",
      }}
    >
      <div className={styles.imageContainer}>
        {image && <img className={styles.image} src={image} loading="lazy" />}
      </div>
      <div className={styles.textContainer}>
          <h4 className={styles.brandText}>{brand}</h4>
        <h4>{name}</h4>
        {sale_price ? (
          <div className={styles.priceContainer}>
            <div className={styles.discount}>
              {(((price - sale_price) / price) * 100) | 0}%
            </div>
            <div className={styles.prices}>
              <span className={styles.priceText}>{price}$</span>
              <span className={styles.salePriceText}>{sale_price}$</span>
            </div>
          </div>
        ) : (
          <span className={styles.price}>{price || 0}$</span>
        )}
      </div>
    </div>
  );
}
