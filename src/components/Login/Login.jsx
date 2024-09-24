import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import { Button } from "../Button/Button";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import styles from "./Login.module.css";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleFormSubmit = async (evt) => {
    evt.preventDefault();

    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email є обов'язковим";
    }
    if (!formData.password) {
      newErrors.password = "Пароль є обов'язковим";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        formData
      );
      const { token, userId, roleId } = response.data;
      dispatch(login({ token, userId, roleId }));
      Notify.success("Вхід успішний");
      navigate("/profile");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        Notify.failure(error.response.data.error);
      } else {
        Notify.failure("Невірний логін або пароль");
      }
      console.error("There was an error logging in!", error);
    }
  };

  return (
    <div>
      <div className={styles.login}>
        <p className={styles.heading}>Вхід в обліковий запис</p>
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <div
            className={`${styles.field} ${errors.email ? styles.invalid : ""}`}
          >
            <label htmlFor="email">Ваш email</label>
            <input
              name="email"
              id="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
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
            />
          </div>
          <Button className={styles.btn}>Вхід</Button>
        </form>
      </div>
      <div className={styles.register}>
        <p className={styles.txt}>Немає облікового запису?</p>
        <Link to="/auth/register" className={styles.link}>
          Зареєструватись
        </Link>
      </div>
    </div>
  );
};
