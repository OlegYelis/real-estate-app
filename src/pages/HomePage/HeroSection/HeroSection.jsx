import { Button } from "../../../components/Button/Button";
import styles from "./HeroSection.module.css";

export const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.hero__title}>
          Знайдіть свій
          <br /> Майбутній Комфорт і Щастя Тут
        </h1>

        <form className={styles.hero__actions}>
          <select name="deal_type" className={styles.select}>
            <option value="sell">Купити</option>
            <option value="rent">Орендувати</option>
          </select>

          <input
            className={styles.hero__input}
            type="text"
            placeholder="Область, Місто, Адреса"
          />
          <Button className={styles.hero__btn}>
            <svg className={styles.hero__icon} width="18px" height="18px">
              <use href="/images/icons.svg#icon-search"></use>
            </svg>
          </Button>
        </form>
      </div>
    </section>
  );
};
