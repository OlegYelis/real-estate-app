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

        <p className={styles.social__heading}>Наші соціальні мережі</p>

        <ul className={styles.social}>
          <li>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.social__link}
            >
              <svg className={styles.social__icon} width="14px" height="14px">
                <use href="/images/icons.svg#icon-twitter"></use>
              </svg>
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.social__link}
            >
              <svg className={styles.social__icon} width="14px" height="14px">
                <use href="/images/icons.svg#icon-facebook"></use>
              </svg>
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.social__link}
            >
              <svg className={styles.social__icon} width="14px" height="14px">
                <use href="/images/icons.svg#icon-instagram"></use>
              </svg>
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.social__link}
            >
              <svg className={styles.social__icon} width="14px" height="14px">
                <use href="/images/icons.svg#icon-youtube"></use>
              </svg>
            </a>
          </li>
        </ul>

        <p className={styles.copyright}>
          Всі права захищені &#34;HomeNest&#34; Copyright &#169; 2024
        </p>
      </div>
    </footer>
  );
};
