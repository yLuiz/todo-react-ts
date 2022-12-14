import React from "react";
import styles from './Footer.module.css';

export default function Footer () {
  return (
    <footer className={styles.footer}>
      <p>
        <span>React + TS TODO</span> &copy; 2022
      </p>
    </footer>
  );
}