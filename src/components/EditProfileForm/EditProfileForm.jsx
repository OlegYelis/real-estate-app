import { useState } from "react";
import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import styles from "./EditProfileForm.module.css";
import { Button } from "../Button/Button";

export const EditProfileForm = ({ userData, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    firstname: userData.firstname,
    lastname: userData.lastname,
    phone: userData.phonenumber,
    email: userData.email,
    profileImageUrl: userData.profileimageurl || "",
  });
  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState(null);

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    if (name === "phone") {
      const phoneValue = value.replace(/\D/g, "");
      setFormData((prevData) => ({ ...prevData, [name]: phoneValue }));
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      return;
    }

    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const handleFormSubmit = async (evt) => {
    evt.preventDefault();

    const newErrors = {};
    if (!formData.firstname) {
      newErrors.firstname = "Ім'я є обов'язковим";
    }
    if (!formData.lastname) {
      newErrors.lastname = "Прізвище є обов'язковим";
    }
    if (!formData.phone) {
      newErrors.phone = "Телефон є обов'язковим";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Телефон повинен бути в форматі 0979999999";
      Notify.failure("Телефон повинен бути в форматі 0671112233, без +38");
    }
    if (!formData.email) {
      newErrors.email = "Email є обов'язковим";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      let profileImageUrl = formData.profileImageUrl;

      if (imageFile) {
        const imageData = new FormData();
        imageData.append("image", imageFile);

        const imageResponse = await axios.post(
          "https://api.imgbb.com/1/upload?key=90620ffdb6fee7a358ac29929d687478",
          imageData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        profileImageUrl = imageResponse.data.data.url;
      }

      const response = await axios.put(
        "http://localhost:3000/profile",
        { ...formData, profileImageUrl },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      Notify.success("Дані успішно оновлені");
      onUpdate(response.data);
      onClose();
    } catch (error) {
      Notify.failure("Помилка при оновленні даних");
      console.error("Error updating profile data", error);
    }
  };

  const handleDeleteImage = () => {
    setImageFile(null);
    setFormData((prevData) => ({ ...prevData, profileImageUrl: "" }));
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <div
        className={`${styles.field} ${errors.firstname ? styles.invalid : ""}`}
      >
        <label htmlFor="firstname">Ім&#39;я</label>
        <input
          name="firstname"
          id="firstname"
          type="text"
          value={formData.firstname}
          onChange={handleInputChange}
        />
      </div>
      <div
        className={`${styles.field} ${errors.lastname ? styles.invalid : ""}`}
      >
        <label htmlFor="lastname">Прізвище</label>
        <input
          name="lastname"
          id="lastname"
          type="text"
          value={formData.lastname}
          onChange={handleInputChange}
        />
      </div>
      <div className={`${styles.field} ${errors.phone ? styles.invalid : ""}`}>
        <label htmlFor="phone">Телефон</label>
        <input
          name="phone"
          id="phone"
          type="text"
          value={formData.phone}
          onChange={handleInputChange}
        />
      </div>
      <div className={`${styles.field} ${errors.email ? styles.invalid : ""}`}>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          id="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="image" className={styles.imageLabel}>
          Зображення профілю
        </label>
        <div className={styles.customFileInput}>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.imageInput}
          />
          <label htmlFor="image" className={styles.customInputLabel}>
            Завантажити зображення
          </label>
        </div>
        <div className={styles.uploadedImages}>
          {imageFile && (
            <div className={styles.uploadedImageWrapper}>
              <div
                className={styles.uploadedImage}
                style={{
                  backgroundImage: `url('${URL.createObjectURL(imageFile)}')`,
                }}
              ></div>
              <button
                type="button"
                className={styles.deleteImageButton}
                onClick={handleDeleteImage}
              >
                &times;
              </button>
            </div>
          )}
          {!imageFile && formData.profileImageUrl && (
            <div className={styles.uploadedImageWrapper}>
              <div
                className={styles.uploadedImage}
                style={{
                  backgroundImage: `url('${formData.profileImageUrl}')`,
                }}
              ></div>
              <button
                type="button"
                className={styles.deleteImageButton}
                onClick={handleDeleteImage}
              >
                &times;
              </button>
            </div>
          )}
        </div>
      </div>
      <Button type="submit">Зберегти</Button>
    </form>
  );
};
