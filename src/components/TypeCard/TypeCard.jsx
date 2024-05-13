import { Link } from "react-router-dom";
import styles from "./TypeCard.module.css";

export const TypeCard = ({ linkTo, img, alt, title, description }) => {
  return (
    <Link to={`/search${linkTo}`} className={styles.card}>
      <img className={styles.card__img} src={img} alt={alt} width="200" />
      <p className={styles.card__title}>{title}</p>
      <p className={styles.card__txt}>{description}</p>
    </Link>
  );
};
