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
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Filters.module.css";
import { useEffect, useState } from "react";

export const Filters = () => {
  const navigate = useNavigate();
  const [dealType, setDealType] = useState("sell");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    setDealType(searchParams.get("deal_type"));
  }, [location]);

  const handleFormSubmin = (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);
    const filteredParams = {};

    formData.forEach((value, key) => {
      if (value) {
        filteredParams[key] = value;
      }
    });

    const params = new URLSearchParams(filteredParams);
    navigate({ search: params.toString() });
  };

  return (
    <div className={styles.container}>
      <form className={styles.filters} onSubmit={handleFormSubmin}>
        <div className={styles.filters__header}>
          <input
            className={`${styles.filters__input} ${styles.input__search}`}
            type="text"
            placeholder="Область, Місто, Адреса"
            name="input"
          />

          <input
            className={`${styles.filters__input} ${styles.input__price}`}
            type="text"
            placeholder="Ціна від:"
            name="price_min"
          />
          <input
            className={`${styles.filters__input} ${styles.input__price}`}
            type="text"
            placeholder="Ціна до:"
            name="price_max"
          />
        </div>

        <div className={styles.filters__footer}>
          <ReactSelect
            isSearchable={false}
            value={
              dealType === "sell" ? dealTypeOptions[0] : dealTypeOptions[1]
            }
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
