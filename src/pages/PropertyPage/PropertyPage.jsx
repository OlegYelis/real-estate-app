import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FavoriteButton } from "../../components/FavoriteButton/FavoriteButton";
import { PropertyCard } from "../../components/PropertyCard/PropertyCard";
import { ThreeDots } from "react-loader-spinner";
import moment from "moment";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Button } from "../../components/Button/Button";
import { Notify, Confirm } from "notiflix";
import { Modal } from "../../components/Modal/Modal";
import { AddAnnouncementForm } from "../../components/AnnouncementForm/AnnouncementForm";
import styles from "./PropertyPage.module.css";

Confirm.init({
  className: "notiflix-confirm",
  width: "300px",
  zindex: 4003,
  position: "center",
  distance: "10px",
  backgroundColor: "#f8f8f8",
  borderRadius: "12px",
  backOverlay: true,
  backOverlayColor: "rgba(0,0,0,0.5)",
  rtl: false,
  fontFamily: "Exo 2",
  cssAnimation: true,
  cssAnimationDuration: 300,
  cssAnimationStyle: "fade",
  plainText: true,
  titleColor: "#ff5549",
  titleFontSize: "20px",
  titleMaxLength: 34,
  messageColor: "#2a2a2a",
  messageFontSize: "16px",
  messageMaxLength: 110,
  buttonsFontSize: "15px",
  buttonsMaxLength: 34,
  okButtonColor: "#f8f8f8",
  okButtonBackground: "#ff5549",
  cancelButtonColor: "#f8f8f8",
  cancelButtonBackground: "#a9a9a9",
});

export const PropertyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRand, setLoadingRand] = useState(true);
  const [error, setError] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = useSelector((state) => state.auth.userId);

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
    const fetchRandAnnouncements = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/random-announcements`
        );
        setAnnouncements(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingRand(false);
      }
    };

    fetchRandAnnouncements();
  }, []);

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    Confirm.show(
      "Видалення Оголошення",
      `Ви точно хочете видалити дане оголошення?`,
      "Так",
      "Ні",
      async () => {
        try {
          await axios.delete(`http://localhost:3000/announcements/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          Notify.success("Оголошення успішно видалено");
          navigate("/profile");
        } catch (error) {
          console.error("Error deleting announcement:", error);
          Notify.failure("Помилка при видаленні оголошення");
        }
      },
      () => {
        return;
      },
      {}
    );
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = (data) => {
    setDetails(data);
    setIsModalOpen(false);
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className={styles.container}>
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
                  {userId !== details.user_id && (
                    <FavoriteButton announcementId={details.announcement_id} />
                  )}

                  {userId === details.user_id && (
                    <div className={styles.user__actions}>
                      <Button onClick={handleEdit}>Редагувати</Button>
                      <Button
                        onClick={handleDelete}
                        className={styles.btn__warning}
                      >
                        Видалити
                      </Button>
                    </div>
                  )}
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
                  {details.baths || details.beds || details.area ? (
                    <>
                      {details.beds ? (
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
                      ) : (
                        <></>
                      )}
                      {details.baths ? (
                        <p className={styles.descr__txt}>
                          <svg
                            className={styles.descr__icon}
                            width="18px"
                            height="18px"
                          >
                            <use href="/images/icons.svg#icon-bath"></use>
                          </svg>
                          {details.baths}{" "}
                          {details.baths > 1 ? "ванни" : "ванна"}
                        </p>
                      ) : (
                        <></>
                      )}
                      {details.area ? (
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
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <p className={styles.noData}>Власник не надав дані</p>
                  )}
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
                <p className={styles.title_2}>Додаткова інформація</p>
                <div className={styles.list__wrap}>
                  <ul className={`${styles.list} ${styles.list__right}`}>
                    {details.regionname ? (
                      <li className={styles.list__item}>
                        <span>Область -</span> {details.regionname}
                      </li>
                    ) : (
                      <></>
                    )}
                    {details.cityname ? (
                      <li className={styles.list__item}>
                        <span>Місто -</span> {details.cityname}
                      </li>
                    ) : (
                      <></>
                    )}
                    {details.address ? (
                      <li className={styles.list__item}>
                        <span>Адреса -</span> {details.address}
                      </li>
                    ) : (
                      <></>
                    )}
                    {details.propertytype ? (
                      <li className={styles.list__item}>
                        <span>Тип нерухомості -</span> {details.propertytype}
                      </li>
                    ) : (
                      <></>
                    )}
                    {details.area ? (
                      <li className={styles.list__item}>
                        <span>Площа -</span> {details.area}
                      </li>
                    ) : (
                      <></>
                    )}
                    {details.numberofrooms ? (
                      <li className={styles.list__item}>
                        <span>Кількість кімнат -</span> {details.numberofrooms}
                      </li>
                    ) : (
                      <></>
                    )}
                    {details.property_floor ? (
                      <li className={styles.list__item}>
                        <span>Поверх -</span> {details.property_floor}
                      </li>
                    ) : (
                      <></>
                    )}
                    {details.baths ? (
                      <li className={styles.list__item}>
                        <span>Ванні кімнати -</span> {details.baths}
                      </li>
                    ) : (
                      <></>
                    )}
                    {details.beds ? (
                      <li className={styles.list__item}>
                        <span>Спальні -</span> {details.beds}
                      </li>
                    ) : (
                      <></>
                    )}
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
                    +38{details.phonenumber}
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
          {loadingRand ? (
            <div className={styles.loadingRand}>
              <ThreeDots
                visible={loadingRand}
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
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <AddAnnouncementForm
          announcementData={details}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      </Modal>
    </>
  );
};
