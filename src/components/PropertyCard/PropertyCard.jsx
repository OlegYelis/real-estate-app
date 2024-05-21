import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import moment from "moment";
import styles from "./PropertyCard.module.css";

export const PropertyCard = (props) => {
  const {
    announcement_id,
    address,
    area,
    baths,
    beds,
    creationdate,
    images,
    price,
    regionname,
    cityname,
  } = props;

  return (
    <Link to={`/search/${announcement_id}`} className={styles.card}>
      <div
        className={styles.card__image}
        style={{
          backgroundImage: `url('${images[0]}')`,
        }}
      >
        <p className={`${styles.card__info} ${styles.card__sale}`}>
          <span></span> {moment(creationdate).format("DD-MM-YYYY")}
        </p>
        <Button className={styles.favorite__btn}>
          <svg className={styles.favorite__icon} width="18px" height="18px">
            <use href="/images/icons.svg#icon-heart"></use>
          </svg>
        </Button>
        <div className={styles.price__wrap}>
          <p className={styles.card__price}>${Math.floor(price)}</p>
        </div>
      </div>

      <div className={styles.card__footer}>
        <p className={styles.card__address}>
          {regionname}, {cityname},<br />
          {address}
        </p>
        <div className={styles.descr}>
          <p className={styles.descr__txt}>
            <svg className={styles.descr__icon} width="18px" height="18px">
              <use href="/images/icons.svg#icon-bed"></use>
            </svg>
            {beds} {beds > 1 ? "ліжка" : "ліжко"}
          </p>
          <p className={styles.descr__txt}>
            <svg className={styles.descr__icon} width="18px" height="18px">
              <use href="/images/icons.svg#icon-bath"></use>
            </svg>
            {baths} {baths > 1 ? "ванни" : "ванна"}
          </p>
          <p className={styles.descr__txt}>
            <svg className={styles.descr__icon} width="18px" height="18px">
              <use href="/images/icons.svg#icon-area"></use>
            </svg>
            {Math.floor(area)} м
            <sup>
              <small>2</small>
            </sup>
          </p>
        </div>
      </div>
    </Link>
  );
};
