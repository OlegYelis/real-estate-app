import { useEffect, useState } from "react";
import axios from "axios";
import { PropertyCard } from "../../components/PropertyCard/PropertyCard";
import styles from "./FavoritesPage.module.css";

export const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      const favoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];

      if (favoriteIds.length > 0) {
        try {
          const response = await axios.post("http://localhost:3000/favorites", {
            ids: favoriteIds,
          });
          setFavorites(response.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <p className={styles.title}>Обрані оголошення</p>
      {favorites.length === 0 ? (
        <p>No favorite properties found</p>
      ) : (
        <div className={styles.announcements__wrapper}>
          {favorites.map((item) => (
            <PropertyCard key={item.Announcement_ID} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};
