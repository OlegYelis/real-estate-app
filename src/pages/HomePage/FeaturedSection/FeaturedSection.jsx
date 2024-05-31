import { Link } from "react-router-dom";
import { PropertyCard } from "../../../components/PropertyCard/PropertyCard";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import styles from "./FeaturedSection.module.css";

export const FeaturedSection = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/random-announcements`
        );
        setAnnouncements(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <section className={styles.featured}>
      <p className={styles["featured__title--bg"]}>Популярні</p>
      <div className={styles.container}>
        <div className={styles.featured__header}>
          <h2 className={styles.featured__title}>Популярні об&#39;єкти</h2>
          <p className={styles.featured__descr}>
            Ознайомтеся з нашою колекцією відібраних об&#39;єктів нерухомості,
            які вирізняються своїми винятковими характеристиками та чудовим
            розташуванням.
          </p>
        </div>

        {error ? <p>Error: {error}</p> : <></>}

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
        ) : (
          <div className={styles.card__wrapper}>
            {announcements.map((item) => {
              return <PropertyCard key={item.announcement_id} {...item} />;
            })}
          </div>
        )}

        <Link to="/search" className={styles.featured__btn}>
          Дивитись більше
        </Link>
      </div>
    </section>
  );
};
