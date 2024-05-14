import ReactSelect from "react-select";
import { Button } from "../../../components/Button/Button";
import {
  propTypeOptions,
  roomOptions,
  dealTypeOptions,
  sortOptions,
} from "../../../helpers/filterOptions";
import {
  selectStylesDeal,
  selectStylesProp,
  selectStylesRoom,
  selectStylesSort,
} from "../../../helpers/stylesSelect";
import styles from "./Filters.module.css";

export const Filters = () => {
  return (
    <div className={styles.container}>
      <form className={styles.filters}>
        <div className={styles.filters__header}>
          <input
            className={`${styles.filters__input} ${styles.input__search}`}
            type="text"
            placeholder="Місто, Адреса, Поштовий індекс"
            name="input"
          />

          <input
            className={`${styles.filters__input} ${styles.input__price}`}
            type="text"
            placeholder="Ціна від:"
            name="price_min"
            min="0"
          />
          <input
            className={`${styles.filters__input} ${styles.input__price}`}
            type="text"
            placeholder="Ціна до:"
            name="price_max"
            min="0"
          />
        </div>

        {/* Ціна */}

        <div className={styles.filters__footer}>
          <ReactSelect
            isSearchable={false}
            defaultValue={dealTypeOptions[0]}
            name="deal_type"
            options={dealTypeOptions}
            styles={selectStylesDeal}
          />

          <ReactSelect
            isClearable={true}
            isSearchable={false}
            placeholder="Тип нерухомості"
            name="prop_type"
            options={propTypeOptions}
            styles={selectStylesProp}
          />

          <ReactSelect
            isClearable={true}
            isSearchable={false}
            placeholder="Кімнати"
            name="room"
            options={roomOptions}
            styles={selectStylesRoom}
          />

          <ReactSelect
            isSearchable={false}
            placeholder="Сортування"
            name="sort"
            options={sortOptions}
            defaultValue={sortOptions[0]}
            styles={selectStylesSort}
          />

          <Button className={styles.filters__btn}>
            <svg className={styles.filters__icon} width="18px" height="18px">
              <use href="/images/icons.svg#icon-search"></use>
            </svg>
            Пошук
          </Button>
        </div>
      </form>
    </div>
  );
};
