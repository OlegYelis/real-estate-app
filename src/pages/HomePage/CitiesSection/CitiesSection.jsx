import { Link } from "react-router-dom";
import styles from "./CitiesSection.module.css";

export const CitiesSection = () => {
  return (
    <section className={styles.cities}>
      <div className={styles.container}>
        <div className={styles.cities__header}>
          <h2 className={styles.cities__title}>
            Нерухомість у Провідних Містах
          </h2>
          <p className={styles.cities__descr}>
            Відкрийте для себе виняткові пропозиції нерухомості у великих містах
            з чудовими локаціями та першокласними умовами.
          </p>
        </div>

        <div className={styles.cities__wrap}>
          <Link
            to="/search?input=Київ"
            className={`${styles.cities__link} ${styles.cities__kyiv}`}
          >
            Київ
            <span>
              столиця України, відома своїми історичними пам&#39;ятками,
              розвиненою інфраструктурою та культурним розмаїттям.
            </span>
          </Link>
          <div className={styles.cities_row}>
            <Link
              to="/search?input=Львів"
              className={`${styles.cities__link} ${styles.cities__lviv}`}
            >
              Львів
              <span>
                місто з багатою історією та культурою, відоме своєю архітектурою
                та атмосферними кав&#39;ярнями.
              </span>
            </Link>
            <Link
              to="/search?input=Одеса"
              className={`${styles.cities__link} ${styles.cities__odesa}`}
            >
              Одеса
              <span>
                портове місто на березі Чорного моря, знамените своїм гумором,
                пляжами та культурним розмаїттям.
              </span>
            </Link>
          </div>
          <div className={styles.cities_row}>
            <Link
              to="/search?input=Харків"
              className={`${styles.cities__link} ${styles.cities__kharkiv}`}
            >
              Харків
              <span>
                друге за величиною місто в країні, важливий освітній та науковий
                центр.
              </span>
            </Link>
            <Link
              to="/search?input=Дніпро"
              className={`${styles.cities__link} ${styles.cities__dnipro}`}
            >
              Дніпро
              <span>
                великий промисловий та бізнес-центр, відомий своєю сучасною
                інфраструктурою та природою навколо.
              </span>
            </Link>
          </div>
        </div>

        <Link to="/search" className={styles.cities__btn}>
          Дивитись більше
        </Link>
      </div>
    </section>
  );
};
