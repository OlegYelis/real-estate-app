// components/EditProfileForm/EditProfileForm.js
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
    profileImageUrl: userData.profileImageUrl,
  });

  const [errors, setErrors] = useState({});

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
      const response = await axios.put(
        "http://localhost:3000/profile",
        formData,
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
      {/* <div className={styles.field}>
        <label htmlFor="profileImageUrl">Зображення профілю (URL)</label>
        <input
          name="profileImageUrl"
          id="profileImageUrl"
          type="text"
          value={formData.profileImageUrl}
          onChange={handleInputChange}
        />
      </div> */}
      <Button type="submit">Зберегти</Button>
    </form>
  );
};
