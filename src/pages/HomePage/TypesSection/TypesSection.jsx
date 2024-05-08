import { TypeCard } from "../../../components/TypeCard/TypeCard";
import { typeCardsInfo } from "../../../helpers/typeCardsInfo";
import styles from "./TypesSection.module.css";

export const TypesSection = () => {
  return (
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
  );
};
