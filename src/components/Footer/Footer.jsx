import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import { NavBar } from "../NavBar/NavBar";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          HomeNest
        </Link>

        <NavBar position="footer" />
      </div>
    </footer>
  );
};
