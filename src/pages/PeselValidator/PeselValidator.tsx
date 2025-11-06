import React, { useState } from "react";
import { validatePesel } from "../../utils/validatePesel";
import "../../index.css";

export const PeselValidator: React.FC = () => {
  const [pesel, setPesel] = useState("");
  const [result, setResult] = useState<ReturnType<typeof validatePesel> | null>(
    null
  );

  const onSubmit = (e: React.FormEvent) => {
    console.log(typeof pesel);
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
            placeholder="Wpisz 11-cyfrowy PESEL"
            inputMode="numeric"
            type="number"
          />
        </label>
        <button type="submit" className="button">
          Sprawdź
        </button>
      </form>

      {result && (
        <div>
          <p>
            {result.valid ? (
              "PESEL jest poprawny ✅"
            ) : (
              <>
                <strong>Błąd:</strong> {result.reason} ❌
              </>
            )}
          </p>
          {result.valid && result.birthDate && (
            <p>
              <strong>Data urodzenia:</strong>{" "}
              {result.birthDate.toLocaleDateString()}
            </p>
          )}
          {result.valid && result.gender && (
            <p>
              <strong>Płeć:</strong> {result.gender}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
