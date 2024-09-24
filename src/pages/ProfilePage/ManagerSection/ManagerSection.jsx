import { useState, useEffect } from "react";
import ReactSelect from "react-select";
import { PropertyCard } from "../../../components/PropertyCard/PropertyCard";
import { listOptions } from "../../../helpers/filterOptions";
import { listStyles } from "../../../helpers/stylesSelect";
import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import styles from "./ManagerSection.module.css";
import { useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import { Button } from "../../../components/Button/Button";
import { Confirm } from "notiflix";

export const ManagerSection = () => {
  const [selectedOption, setSelectedOption] = useState(listOptions[0]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);

  let title = "";
  switch (selectedOption.value) {
    case "pending":
      title = "очікують на підтвердження";
      break;
    case "users":
      title = "користувачі";
      break;
    case "all":
      title = "всі активні оголошення";
      break;
    default:
      title = "";
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      let url = "";

      switch (selectedOption.value) {
        case "pending":
          url = "http://localhost:3000/pending-announcements";
          break;
        case "users":
          url = "http://localhost:3000/users";
          break;
        case "all":
          url = "http://localhost:3000/active-announcements";
          break;
        default:
          url = "";
      }

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (err) {
        setError(err.message);
        Notify.failure("There was an error loading the data.");
      } finally {
        setLoading(false);
      }
    };

    if (selectedOption) {
      fetchData();
    }
  }, [selectedOption, token]);

  const handleSelectChange = (option) => {
    setSelectedOption(option);
  };

  const handleDeleteUser = async (userId) => {
    Confirm.show(
      "Видалення Користувача",
      `Ви точно хочете видалити даного користувача?`,
      "Так",
      "Ні",
      async () => {
        try {
          await axios.delete(`http://localhost:3000/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          Notify.success("Користувача успішно видалено");
          setData((prevData) =>
            prevData.filter((user) => user.user_id !== userId)
          );
        } catch (err) {
          setError(err.message);
          Notify.failure("There was an error deleting the user.");
        }
      },
      () => {
        return;
      },
      {}
    );
  };

  return (
    <div className={styles.moderator}>
      <div className={styles.moderator__header}>
        <p className={styles.moderator__title}>{title}</p>
        <ReactSelect
          isSearchable={false}
          value={selectedOption}
          onChange={handleSelectChange}
          name="list__type"
          options={listOptions}
          styles={listStyles}
        />
      </div>

      {loading ? (
        <div className={styles.loading}>
          <ThreeDots
            visible={loading}
            height="100"
            width="100"
            color="#3c5cda"
            radius="9"
            ariaLabel="three-dots-loading"
          />
        </div>
      ) : error ? (
        <p className={styles.user__err}>{error}</p>
      ) : data.length === 0 ? (
        <p className={styles.user__err}>
          {selectedOption.value === "users"
            ? "Нажаль користувачів не знайдено"
            : "Нажаль оголошень не знайдено"}
        </p>
      ) : (
        <div className={styles.announcements__wrapper}>
          {selectedOption.value === "users"
            ? data.map((user) => (
                <div key={user.user_id} className={styles.user}>
                  <Button
                    className={styles.delete__btn}
                    onClick={() => handleDeleteUser(user.user_id)}
                  >
                    <svg
                      className={styles.btn__icon}
                      width="18px"
                      height="18px"
                    >
                      <use href="/images/icons.svg#icon-plus"></use>
                    </svg>
                  </Button>
                  <img
                    src={`${
                      user.profileimageurl
                        ? user.profileimageurl
                        : "/images/user_avatar.webp"
                    }`}
                    alt=""
                    width="128px"
                    className={styles.user__img}
                  />
                  <p className={styles.name}>
                    {user.firstname} {user.lastname}
                  </p>
                  <a
                    className={styles.user__link}
                    href={`mailto:${user.email}`}
                  >
                    {user.email}
                  </a>
                  <a
                    className={styles.user__link}
                    href={`tel:+38${user.phonenumber}`}
                  >
                    {user.phonenumber}
                  </a>
                </div>
              ))
            : data.map((item) => (
                <PropertyCard key={item.announcement_id} {...item} />
              ))}
        </div>
      )}
    </div>
  );
};
