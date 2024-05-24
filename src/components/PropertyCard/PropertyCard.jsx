import { Link } from "react-router-dom";
import moment from "moment";
import { FavoriteButton } from "../FavoriteButton/FavoriteButton";
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
    announcementtype_id,
  } = props;

  return (
    <Link to={`/property/${announcement_id}`} className={styles.card}>
      <div
        className={styles.card__image}
        style={{
          backgroundImage: `url('${images[0]}')`,
        }}
      >
        <p
          className={`${styles.card__info} ${
            announcementtype_id === 1 ? styles.card__sale : styles.card__rent
          }`}
        >
          <span></span> {moment(creationdate).format("DD-MM-YYYY")}
        </p>
        <FavoriteButton
          announcementId={announcement_id}
          className={styles.favorite__btn}
        />
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
