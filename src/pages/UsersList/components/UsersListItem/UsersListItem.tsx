import React from "react";
import type { User } from "../../../../types/UsersList";
import styles from "./UsersListItem.module.scss";

interface UsersListItemProps {
  user: User;
  onEdit: (user: User) => void;
}

export const UsersListItem: React.FC<UsersListItemProps> = ({
  user,
  onEdit,
}) => {
  return (
    <li className={styles.item}>
      <div className={styles["user-info"]}>
        <strong className={styles.name}>{user.name}</strong>
        <span className={styles.email}>{user.email}</span>
      </div>
      <div className={styles.details}>
        <span className={styles.gender}>{user.gender}</span>
        <span
          className={`${styles.status} ${
            user.status === "active" ? styles.active : styles.inactive
          }`}
        >
          {user.status}
        </span>
        <button onClick={() => onEdit(user)} className="button">
          Edytuj
        </button>
      </div>
    </li>
  );
};
