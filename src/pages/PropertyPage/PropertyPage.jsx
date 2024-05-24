import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FavoriteButton } from "../../components/FavoriteButton/FavoriteButton";
import moment from "moment";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./PropertyPage.module.css";
import { PropertyCard } from "../../components/PropertyCard/PropertyCard";

export const PropertyPage = () => {
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/property/${id}`
        );
        setDetails(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, [id]);

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

  if (error) return <p>Error: {error}</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className={styles.container}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className={styles.property__main}>
              <div className={styles.gallery}>
                <Swiper
                  modules={[Navigation, Pagination]}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                >
                  {details.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div
                        className={styles.gallery__img}
                        style={{ backgroundImage: `url('${image}')` }}
                        src={image}
                      ></div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className={styles.property__info}>
                <div className={styles.actions}>
                  <p
                    className={`${styles.card__info} ${
                      details.announcementtype === "Продаж"
                        ? styles.card__sale
                        : styles.card__rent
                    }`}
                  >
                    <span></span> {details.announcementtype}
                  </p>
                  <FavoriteButton announcementId={details.announcement_id} />
                </div>
                <p className={styles.price}>${Math.floor(details.price)}</p>
                <p className={styles.address}>
                  {details.cityname}, {details.regionname}, <br />
                  {details.address}
                </p>
                <div className={styles.proptype}>
                  <p>Тип нерухомості:</p>
                  <Link
                    to={`/search?prop_type=${details.propertytypeeng}`}
                    className={styles.type}
                  >
                    {details.propertytype}
                  </Link>
                </div>

                <div className={styles.descr}>
                  <p className={styles.descr__txt}>
                    <svg
                      className={styles.descr__icon}
                      width="18px"
                      height="18px"
                    >
                      <use href="/images/icons.svg#icon-bed"></use>
                    </svg>
                    {details.beds} {details.beds > 1 ? "ліжка" : "ліжко"}
                  </p>
                  <p className={styles.descr__txt}>
                    <svg
                      className={styles.descr__icon}
                      width="18px"
                      height="18px"
                    >
                      <use href="/images/icons.svg#icon-bath"></use>
                    </svg>
                    {details.baths} {details.baths > 1 ? "ванни" : "ванна"}
                  </p>
                  <p className={styles.descr__txt}>
                    <svg
                      className={styles.descr__icon}
                      width="18px"
                      height="18px"
                    >
                      <use href="/images/icons.svg#icon-area"></use>
                    </svg>
                    {Math.floor(details.area)} м
                    <sup>
                      <small>2</small>
                    </sup>
                  </p>
                </div>

                <p className={styles.data}>
                  <span>Дата створення:</span>{" "}
                  {moment(details.creationdate).format("DD-MM-YYYY HH:mm")}
                </p>
              </div>
            </div>
            <div className={styles.property__descr}>
              <div className={styles.about}>
                <p className={styles.title}>Опис нерухомості</p>
                <p className={styles.description}>{details.description}</p>
                <p className={styles.title_2}>Особливості</p>
                <div className={styles.list__wrap}>
                  <ul className={`${styles.list} ${styles.list__right}`}>
                    <li className={styles.list__item}>
                      <span>Область -</span>
                    </li>
                    <li className={styles.list__item}>
                      <span>Місто -</span>
                    </li>
                    <li className={styles.list__item}>
                      <span>Адреса -</span>
                    </li>
                    <li className={styles.list__item}>
                      <span>Тип нерухомості -</span>
                    </li>
                    <li className={styles.list__item}>
                      <span>Площа -</span>
                    </li>
                    <li className={styles.list__item}>
                      <span>Кількість кімнат -</span>
                    </li>
                    <li className={styles.list__item}>
                      <span>Поверх -</span>
                    </li>
                    <li className={styles.list__item}>
                      <span>Ванні кімнати -</span>
                    </li>
                    <li className={styles.list__item}>
                      <span>Спальні -</span>
                    </li>
                  </ul>
                  <ul className={styles.list}>
                    <li className={styles.list__item}>{details.regionname}</li>
                    <li className={styles.list__item}>{details.cityname}</li>
                    <li className={styles.list__item}>{details.address}</li>
                    <li className={styles.list__item}>
                      {details.propertytype}
                    </li>
                    <li className={styles.list__item}>{details.area}</li>
                    <li className={styles.list__item}>
                      {details.numberofrooms}
                    </li>
                    <li className={styles.list__item}>
                      {details.property_floor}
                    </li>
                    <li className={styles.list__item}>{details.baths}</li>
                    <li className={styles.list__item}>{details.beds}</li>
                  </ul>
                </div>
              </div>
              <div className={styles.user}>
                <div className={styles.user__info}>
                  <img
                    className={styles.user_image}
                    src={
                      details.profileimageurl
                        ? details.profileimageurl
                        : "/images/user_avatar.webp"
                    }
                    alt="user avatar"
                    width="128px"
                  />
                  <div>
                    <p className={styles.user__name}>{details.firstname}</p>
                    <p className={styles.user__name}>{details.lastname}</p>
                  </div>
                </div>
                <div className={styles.user__contacts}>
                  <a
                    className={styles.user__link}
                    href={`tel:+38${details.phonenumber}`}
                  >
                    {details.phonenumber}
                  </a>
                  <a
                    className={styles.user__link}
                    href={`mailto:${details.email}`}
                  >
                    Написати на пошту
                  </a>
                </div>
              </div>
            </div>
          </>
        )}

        <div className={styles.featured}>
          <div className={styles.featured__header}>
            <h2 className={styles.featured__title}>Популярні об&#39;єкти</h2>
          </div>

          {error ? <p>Error: {error}</p> : <></>}

          {loading ? (
            <p>Loading...</p>
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
      </div>
    </>
  );
};
