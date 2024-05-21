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
  const [dealType, setDealType] = useState("");
  const [searchStr, setSearchStr] = useState("");
  const [propType, setPropType] = useState();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    searchParams.get("deal_type")
      ? setDealType(searchParams.get("deal_type"))
      : setDealType("sell");

    searchParams.get("input")
      ? setSearchStr(searchParams.get("input"))
      : setSearchStr("");

    searchParams.get("prop_type")
      ? setPropType(searchParams.get("prop_type"))
      : setPropType("");
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

  const handleInputValue = (evt) => {
    setDealType(evt.value);
  };

  const handlePropTypeValue = (evt) => {
    if (evt !== null) {
      return setPropType(evt.value);
    }
    return setPropType(null);
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
            value={searchStr}
            onChange={(evt) => setSearchStr(evt.target.value)}
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
            value={dealTypeOptions.find((option) => option.value === dealType)}
            onChange={handleInputValue}
            name="deal_type"
            options={dealTypeOptions}
            styles={selectStylesDeal}
          />

          <ReactSelect
            isClearable={true}
            isSearchable={false}
            placeholder="Тип нерухомості"
            value={
              propType
                ? propTypeOptions.find((option) => option.value === propType)
                : null
            }
            onChange={handlePropTypeValue}
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
