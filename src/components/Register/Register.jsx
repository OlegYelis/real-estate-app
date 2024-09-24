import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../Button/Button";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import styles from "./Register.module.css";

export const Register = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    profileImageUrl: null,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const firstnameRef = useRef(null);
  const lastnameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

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
    if (!formData.password) {
      newErrors.password = "Пароль є обов'язковим";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstErrorField = Object.keys(newErrors)[0];
      if (firstErrorField === "firstname") firstnameRef.current.focus();
      if (firstErrorField === "lastname") lastnameRef.current.focus();
      if (firstErrorField === "phone") phoneRef.current.focus();
      if (firstErrorField === "email") emailRef.current.focus();
      if (firstErrorField === "password") passwordRef.current.focus();
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/register",
        formData
      );
      const { token, userId, roleId } = response.data;
      dispatch(login({ token, userId, roleId }));
      Notify.success("Реєстрація пройшла успішно");
      navigate("/profile");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        Notify.failure(error.response.data.error);
      } else {
        Notify.failure("There was an error registering the user!");
      }
      console.error("There was an error registering the user!", error);
    }
  };

  return (
    <div>
      <div className={styles.login}>
        <p className={styles.heading}>Реєстрація облікового запису</p>
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <div className={styles.form__wrap}>
            <div className={styles.field_wrap}>
              <div
                className={`${styles.field} ${
                  errors.firstname ? styles.invalid : ""
                }`}
              >
                <label htmlFor="firstname">Ваше ім&#39;я</label>
                <input
                  name="firstname"
                  id="firstname"
                  type="text"
                  placeholder="Ім&#39;я"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  ref={firstnameRef}
                />
              </div>
              <div
                className={`${styles.field} ${
                  errors.lastname ? styles.invalid : ""
                }`}
              >
                <label htmlFor="lastname">Ваше прізвище</label>
                <input
                  name="lastname"
                  id="lastname"
                  type="text"
                  placeholder="Прізвище"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  ref={lastnameRef}
                />
              </div>
              <div
                className={`${styles.field} ${
                  errors.phone ? styles.invalid : ""
                }`}
              >
                <label htmlFor="phone">Ваш номер телефону</label>
                <input
                  name="phone"
                  id="phone"
                  type="text"
                  placeholder="Номер телефону"
                  value={formData.phone}
                  onChange={handleInputChange}
                  ref={phoneRef}
                />
              </div>
            </div>

            <div className={styles.field_wrap}>
              <div
                className={`${styles.field} ${
                  errors.email ? styles.invalid : ""
                }`}
              >
                <label htmlFor="email">Ваш email</label>
                <input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  ref={emailRef}
                />
              </div>
              <div
                className={`${styles.field} ${
                  errors.password ? styles.invalid : ""
                }`}
              >
                <label htmlFor="password">Ваш пароль</label>
                <input
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Пароль"
                  value={formData.password}
                  onChange={handleInputChange}
                  ref={passwordRef}
                />
              </div>
            </div>
          </div>
          <Button className={styles.btn}>Реєстрація</Button>
        </form>
      </div>
      <div className={styles.register}>
        <p className={styles.txt}>Вже є обліковий запис?</p>
        <Link to="/auth/login" className={styles.link}>
          Увійти
        </Link>
      </div>
    </div>
  );
};
