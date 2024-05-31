import { Outlet } from "react-router-dom";
import styles from "./AuthLayout.module.css";

export const AuthLayout = () => {
  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  );
};
