import { Link } from "react-router-dom";
import styles from "./PropertyCard.module.css";
import { Button } from "../Button/Button";

export const PropertyCard = () => {
  return (
    <Link to="/" className={styles.card}>
      <div
        className={styles.card__image}
        style={{
          backgroundImage: `url('https://i.ibb.co/VSBs3dZ/proekt-doma-q6.jpg')`,
        }}
      >
        <p className={`${styles.card__info} ${styles.card__sale}`}>
          <span></span> For Sale
        </p>
        <Button className={styles.favorite__btn}>
          <svg className={styles.favorite__icon} width="18px" height="18px">
            <use href="/images/icons.svg#icon-heart"></use>
          </svg>
        </Button>
        <div className={styles.price__wrap}>
          <p className={styles.card__price}>$359,900</p>
        </div>
      </div>

      <div className={styles.card__footer}>
        <p className={styles.card__address}>
          1413 Las Palmas Ave, Billings,
          <br /> MT 59105
        </p>
        <div className={styles.descr}>
          <p className={styles.descr__txt}>
            <svg className={styles.descr__icon} width="18px" height="18px">
              <use href="/images/icons.svg#icon-bed"></use>
            </svg>
            3 ліжка
          </p>
          <p className={styles.descr__txt}>
            <svg className={styles.descr__icon} width="18px" height="18px">
              <use href="/images/icons.svg#icon-bath"></use>
            </svg>
            2 ванни
          </p>
          <p className={styles.descr__txt}>
            <svg className={styles.descr__icon} width="18px" height="18px">
              <use href="/images/icons.svg#icon-area"></use>
            </svg>
            1500 м
            <sup>
              <small>2</small>
            </sup>
          </p>
        </div>
      </div>
    </Link>
  );
};
