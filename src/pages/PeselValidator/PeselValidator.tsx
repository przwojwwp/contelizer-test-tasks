import React, { useState } from "react";
import { validatePesel } from "../../utils/validatePesel";

export const PeselValidator: React.FC = () => {
  const [pesel, setPesel] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validatePesel(pesel);
    console.log("Result:", result);
  };

  return (
    <div>
      <h2>Walidator PESEL</h2>
      <form onSubmit={onSubmit}>
        <label>
          PESEL:
          <input
            value={pesel}
            onChange={(e) => setPesel(e.target.value)}
            placeholder="Wpisz PESEL"
            type="text"
          />
        </label>
        <button type="submit">
          Sprawdź
        </button>
      </form>
    </div>
  );
};
