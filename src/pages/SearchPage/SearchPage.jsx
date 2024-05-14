import { Filters } from "./Filters/Filters";
import styles from "./SearchPage.module.css";

export const SearchPage = () => {
  return (
    <>
      <Filters />

      <div className={styles.container}></div>
    </>
  );
};
