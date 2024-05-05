import styles from "./Button.module.css";

export const Button = ({ children, className, ...props }) => {
  return (
    <button className={`${styles.btn} ${className}`} {...props}>
      {children}
    </button>
  );
};
