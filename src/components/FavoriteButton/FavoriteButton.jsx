import { useState, useEffect } from "react";
import { Button } from "../Button/Button";
import { useSelector } from "react-redux";
import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import styles from "./FavoriteButton.module.css";

export const FavoriteButton = ({ announcementId, className }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (token) {
        try {
          const response = await axios.get(
            `http://localhost:3000/favorite/${announcementId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              params: {
                userId: userId,
              },
            }
          );
          setIsFavorite(response.data.isFavorite);
        } catch (error) {
          console.error("Error checking favorite status:", error);
        }
      } else {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setIsFavorite(favorites.includes(announcementId));
      }
    };

    checkFavoriteStatus();
  }, [announcementId, token, userId]);

  const handleFavoriteClick = async (evt) => {
    evt.stopPropagation();
    evt.preventDefault();

    if (token) {
      try {
        if (isFavorite) {
          await axios.delete(
            `http://localhost:3000/favorite/${announcementId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              data: {
                userId: userId,
              },
            }
          );
          Notify.success("Оголошення видалено з обраних");
        } else {
          await axios.post(
            `http://localhost:3000/favorite`,
            { announcementId, userId },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          Notify.success("Оголошення додано до обраних");
        }
        setIsFavorite(!isFavorite);
      } catch (error) {
        console.error("Error updating favorite status:", error);
        Notify.failure("Помилка при оновленні статусу обраного");
      }
    } else {
      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      if (favorites.includes(announcementId)) {
        favorites = favorites.filter((id) => id !== announcementId);
        setIsFavorite(false);
        Notify.success("Оголошення видалено з обраних");
      } else {
        favorites.push(announcementId);
        setIsFavorite(true);
        Notify.success("Оголошення додано до обраних");
      }
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  };

  return (
    <Button
      className={`${styles.favorite__btn} ${className}`}
      onClick={handleFavoriteClick}
    >
      {isFavorite ? (
        <svg className={styles.favorite__icon} width="18px" height="18px">
          <use href="/images/icons.svg#icon-heart-filled"></use>
        </svg>
      ) : (
        <svg className={styles.favorite__icon} width="18px" height="18px">
          <use href="/images/icons.svg#icon-heart"></use>
        </svg>
      )}
    </Button>
  );
};
