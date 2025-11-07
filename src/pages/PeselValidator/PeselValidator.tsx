import React, { useState } from "react";
import { validatePesel } from "../../utils/validatePesel";
import styles from "./PeselValidator.module.scss";
import "../../index.css";

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
    <div className={styles.container}>
      <h2 className={styles.title}>Walidator PESEL</h2>

      <form onSubmit={onSubmit} className={styles.form}>
        <label className={styles.label}>
          PESEL:
          <input
            value={pesel}
            onChange={(e) => setPesel(e.target.value)}
            placeholder="Wpisz 11-cyfrowy PESEL"
            inputMode="numeric"
            type="number"
            className={styles.input}
          />
        </label>
        <button type="submit" className="button">
          Sprawdź
        </button>
      </form>

      {result && (
        <div className={styles.result}>
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
