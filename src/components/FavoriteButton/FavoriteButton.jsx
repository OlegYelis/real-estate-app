import { useState, useEffect } from "react";
import { Button } from "../Button/Button";
import styles from "./FavoriteButton.module.css";

export const FavoriteButton = ({ announcementId, className }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.includes(announcementId));
  }, [announcementId]);

  const handleFavoriteClick = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.includes(announcementId)) {
      favorites = favorites.filter((id) => id !== announcementId);
      setIsFavorite(false);
    } else {
      favorites.push(announcementId);
      setIsFavorite(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
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
