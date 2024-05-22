import { PropertyCard } from "../../components/PropertyCard/PropertyCard";
import { Filters } from "./Filters/Filters";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import axios from "axios";
import styles from "./SearchPage.module.css";

export const SearchPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [announcementsCounter, setAnnouncementsCounter] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/search?${searchParams.toString()}`
        );
        setAnnouncements(response.data);

        const responseCount = await axios.get(
          `http://localhost:3000/announcements-count?${searchParams.toString()}`
        );
        setAnnouncementsCounter(responseCount.data.count);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, [location.search]);

  const handlePageChange = (newPage) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", newPage);
    navigate({ search: searchParams.toString() });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPages = Math.ceil(announcementsCounter / 9);
  const currentPage =
    parseInt(new URLSearchParams(location.search).get("page")) || 1;

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Filters />

      <div className={styles.container}>
        {announcementsCounter === 0 ? (
          <p className={styles.not_found}>
            Нажаль за вашим запитом оголошень не знайдено
          </p>
        ) : (
          <p className={styles.counter}>
            Знайдено оголошень: {announcementsCounter}
          </p>
        )}

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className={styles.announcements__wrapper}>
            {announcements.map((item) => (
              <PropertyCard key={item.announcement_id} {...item} />
            ))}
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};
