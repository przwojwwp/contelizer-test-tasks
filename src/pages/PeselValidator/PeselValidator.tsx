import React, { useState } from "react";
import { validatePesel } from "../../utils/validatePesel";

export const PeselValidator: React.FC = () => {
  const [pesel, setPesel] = useState("");
  const [result, setResult] = useState<ReturnType<typeof validatePesel> | null>(
    null
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(validatePesel(pesel));
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
        <button type="submit">Sprawdź</button>
      </form>

      {result && (
        <div>
          <p>{result.valid ? "PESEL poprawny ✅" : `Błąd: ${result.reason}`}</p>
          {result.birthDate && (
            <p>Data urodzenia: {result.birthDate.toLocaleDateString()}</p>
          )}
          {result.gender && <p>Płeć: {result.gender}</p>}
        </div>
      )}
    </div>
  );
};
