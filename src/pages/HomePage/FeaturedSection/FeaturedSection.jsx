import { Link } from "react-router-dom";
import { PropertyCard } from "../../../components/PropertyCard/PropertyCard";
import styles from "./FeaturedSection.module.css";

export const FeaturedSection = () => {
  return (
    <section className={styles.featured}>
      <p className={styles["featured__title--bg"]}>Популярні</p>
      <div className={styles.container}>
        <div className={styles.featured__header}>
          <h2 className={styles.featured__title}>
            Популярні об&#39;єкти поблизу
          </h2>
          <p className={styles.featured__descr}>
            Ознайомтеся з нашою колекцією відібраних об&#39;єктів нерухомості,
            які вирізняються своїми винятковими характеристиками та чудовим
            розташуванням.
          </p>
        </div>

        <div className={styles.card__wrapper}>
          <PropertyCard />
          <PropertyCard />
          <PropertyCard />
        </div>

        <Link to="/search" className={styles.featured__btn}>
          Дивитись більше
        </Link>
      </div>
    </section>
  );
};
