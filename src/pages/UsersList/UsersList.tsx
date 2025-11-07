import React, { useState, useEffect, useMemo } from "react";
import { getUsers } from "../../services/UsersListApi";
import type { User } from "../../types/UsersList";
import styles from "./UsersList.module.scss";
import { UsersListItem } from "./components/UsersListItem/UsersListItem";

export const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Wystąpił nieznany błąd");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const handleEdit = (user: User) => {
    setEditingUser(user);
    console.log(user);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Użytkownicy GoRest API</h2>

      <input
        type="text"
        placeholder="Szukaj po imieniu lub emailu..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />

      {isLoading && <p>Ładowanie danych...</p>}
      {error && <p className={styles.error}>Błąd: {error}</p>}

      {!isLoading && !error && (
        <ul className={styles.userList}>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <UsersListItem key={user.id} user={user} onEdit={handleEdit} />
            ))
          ) : (
            <p>Nie znaleziono użytkowników pasujących do kryteriów.</p>
          )}
        </ul>
      )}
    </div>
  );
};
