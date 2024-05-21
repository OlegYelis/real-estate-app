import { PropertyCard } from "../../components/PropertyCard/PropertyCard";
import { Filters } from "./Filters/Filters";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./SearchPage.module.css";

export const SearchPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/search?${searchParams.toString()}`
        );
        setAnnouncements(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, [location.search]);

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Filters />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.container}>
          {announcements.map((item) => {
            return <PropertyCard key={item.announcement_id} {...item} />;
          })}
        </div>
      )}
    </>
  );
};
