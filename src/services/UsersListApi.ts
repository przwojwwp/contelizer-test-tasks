import type { User } from "../types/UsersList";

const API_URL = "https://gorest.co.in/public/v2";

const ACCESS_TOKEN = "TWOJ_TOKEN_DOSTEPOWY";

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_URL}/users`);

  if (!response.ok) {
    throw new Error("Nie udało się pobrać użytkowników");
  }

  return response.json();
};

export const updateUser = async (
  userId: number,
  userData: Partial<User>
): Promise<User> => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData[0]?.field
      ? `Błąd w polu ${errorData[0].field}: ${errorData[0].message}`
      : "Nie udało się zaktualizować użytkownika";
    throw new Error(errorMessage);
  }

  return response.json();
};
