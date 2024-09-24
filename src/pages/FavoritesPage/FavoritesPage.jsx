import { useEffect, useState } from "react";
import axios from "axios";
import { PropertyCard } from "../../components/PropertyCard/PropertyCard";
import { ThreeDots } from "react-loader-spinner";
import { useSelector } from "react-redux";
import styles from "./FavoritesPage.module.css";

export const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      setError(null);

      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:3000/favorites-auth",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setFavorites(response.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      } else {
        const favoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];

        if (favoriteIds.length > 0) {
          try {
            const response = await axios.post(
              "http://localhost:3000/favorites",
              {
                ids: favoriteIds,
              }
            );
            setFavorites(response.data);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      }
    };

    fetchFavorites();
  }, [token]);

  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <p className={styles.title}>Обрані оголошення</p>

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
      ) : favorites.length === 0 ? (
        <p className={styles.notfound}>у вас поки немає обраних оголошень</p>
      ) : (
        <div className={styles.announcements__wrapper}>
          {favorites.map((item) => (
            <PropertyCard key={item.announcement_id} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};
