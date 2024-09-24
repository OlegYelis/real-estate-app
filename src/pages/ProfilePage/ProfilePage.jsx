import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { Button } from "../../components/Button/Button";
import { logout } from "../../store/authSlice";
import { ThreeDots } from "react-loader-spinner";
import { PropertyCard } from "../../components/PropertyCard/PropertyCard";
import { EditProfileForm } from "../../components/EditProfileForm/EditProfileForm";
import { AddAnnouncementForm } from "../../components/AnnouncementForm/AnnouncementForm";
import { Modal } from "../../components/Modal/Modal";
import { ManagerSection } from "./ManagerSection/ManagerSection";
import styles from "./ProfilePage.module.css";

export const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [userAnnouncements, setUserAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isAddAnnouncementModalOpen, setIsAddAnnouncementModalOpen] =
    useState(false);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (err) {
        setError(err.message);
        Notify.failure("There was an error loading the user data.");
      }
    };

    const fetchUserAnnouncements = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/user-announcements",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserAnnouncements(response.data);
      } catch (err) {
        setError(err.message);
        Notify.failure("There was an error loading the user announcements.");
      }
    };

    fetchUserData();
    fetchUserAnnouncements();
    setLoading(false);
  }, [token]);

  const handleLogout = () => {
    dispatch(logout());
    Notify.success("Ви успішно вийшли з облікового запису.");
  };

  const handleEditClick = () => {
    setIsEditProfileModalOpen(true);
  };

  const handleAddAnnouncementClick = () => {
    setIsAddAnnouncementModalOpen(true);
  };

  const handleModalClose = () => {
    setIsEditProfileModalOpen(false);
    setIsAddAnnouncementModalOpen(false);
  };

  const handleUpdate = (updatedData) => {
    setUserData(updatedData);
  };

  const handleAddAnnouncement = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/user-announcements",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserAnnouncements(response.data);
    } catch (err) {
      setError(err.message);
      Notify.failure("There was an error loading the user announcements.");
    }
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <section className={styles.profile}>
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
        <div className={styles.container}>
          <div className={styles.user}>
            {userData && (
              <>
                <div className={styles.user__descr}>
                  <img
                    src={userData.profileimageurl || "images/user_avatar.webp"}
                    alt="Profile"
                    width="130"
                    className={styles.profileImage}
                  />
                  <div className={styles.user__info}>
                    <p className={styles.user__name}>
                      {userData.firstname} {userData.lastname}
                    </p>
                    <p className={styles.user__contacts}>
                      <span>Пошта:</span> {userData.email}
                    </p>
                    <p className={styles.user__contacts}>
                      <span>Телефон:</span> +38{userData.phonenumber}
                    </p>
                  </div>
                </div>
                <div className={styles.user__actions}>
                  <Button className={styles.btn} onClick={handleEditClick}>
                    Редагувати
                  </Button>
                  <Button
                    className={`${styles.btn} ${styles.btn__warning}`}
                    onClick={handleLogout}
                  >
                    Вийти
                  </Button>
                </div>
              </>
            )}
          </div>

          {userData?.role_id === 2 ? (
            <ManagerSection />
          ) : (
            <div className={styles.user__announcements}>
              <div className={styles.announcements__header}>
                <p className={styles.user__title}>Мої оголошення</p>
                <Button
                  className={styles.user__btn}
                  onClick={handleAddAnnouncementClick}
                >
                  Створити Оголошення
                </Button>
              </div>

              {userAnnouncements.length === 0 ? (
                <p className={styles.user__err}>
                  Нажаль ви не створювали оголошень
                </p>
              ) : (
                <div className={styles.announcements__wrapper}>
                  {userAnnouncements.map((item) => (
                    <PropertyCard key={item.announcement_id} {...item} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <Modal isOpen={isEditProfileModalOpen} onClose={handleModalClose}>
        <EditProfileForm
          userData={userData}
          onClose={handleModalClose}
          onUpdate={handleUpdate}
        />
      </Modal>

      <Modal isOpen={isAddAnnouncementModalOpen} onClose={handleModalClose}>
        <AddAnnouncementForm
          onClose={handleModalClose}
          onSave={handleAddAnnouncement}
        />
      </Modal>
    </section>
  );
};
