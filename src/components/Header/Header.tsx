import reactLogo from "../../assets/react.svg";
import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <a href="#">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <ul className={styles.pages}>
          <li className={styles.page}>
            <a href="#">Zadanie 1</a>
          </li>
          <li className={styles.page}>
            <a href="#">Zadanie 2</a>
          </li>
          <li className={styles.page}>
            <a href="#">Zadanie 3</a>
          </li>
        </ul>
      </div>
    </header>
  );
};
