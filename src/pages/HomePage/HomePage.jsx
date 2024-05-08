import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { PropertyCard } from "../../components/PropertyCard/PropertyCard";
import styles from "./HomePage.module.css";
import { typeCardsInfo } from "../../helpers/typeCardsInfo";
import { TypeCard } from "../../components/TypeCard/TypeCard";

export const HomePage = () => {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.hero__title}>
            Знайдіть свій
            <br /> Майбутній Комфорт і Щастя Тут
          </h1>

          <div className={styles.hero__actions}>
            <input
              className={styles.hero__input}
              type="text"
              placeholder="Місто, Адреса"
            />
            <Button className={styles.hero__btn}>
              <svg className={styles.hero__icon} width="18px" height="18px">
                <use href="/images/icons.svg#icon-search"></use>
              </svg>
            </Button>
          </div>
        </div>
      </section>

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

          <Link to="/property" className={styles.featured__btn}>
            Дивитись більше
          </Link>
        </div>
      </section>

      <section className={styles.types}>
        <div className={styles.container}>
          <h2 className={styles.types__title}>
            Різноманітність Житлових Просторів
          </h2>
          <p className={styles.types__descr}>
            Знайдіть ідеальне місце для життя серед колекції нерухомості
          </p>

          <div className={styles.types__wrapper}>
            {typeCardsInfo.map((item) => (
              <TypeCard
                key={item.id}
                img={item.img}
                alt={item.alt}
                title={item.title}
                description={item.description}
                linkTo={item.linkTo}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
