import React from "react";
import reactLogo from "../../assets/react.svg";
import styles from "./Header.module.scss";
import type { VisibleExercise } from "../../types/visibleExercise";

interface HeaderProps {
  setVisibleExercise: (exercise: VisibleExercise | null) => void;
}

export const Header: React.FC<HeaderProps> = ({ setVisibleExercise }) => {
  const handleNavClick = (
    e: React.MouseEvent,
    exercise: VisibleExercise | null
  ) => {
    e.preventDefault();
    setVisibleExercise(exercise);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <a href="#" onClick={(e) => handleNavClick(e, null)}>
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <ul className={styles.pages}>
          <li className={styles.page}>
            <a href="#" onClick={(e) => handleNavClick(e, "Exercise-1")}>
              Zadanie 1
            </a>
          </li>
          <li className={styles.page}>
            <a href="#" onClick={(e) => handleNavClick(e, "Exercise-2")}>
              Zadanie 2
            </a>
          </li>
          <li className={styles.page}>
            <a href="#" onClick={(e) => handleNavClick(e, "Exercise-3")}>
              Zadanie 3
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};
