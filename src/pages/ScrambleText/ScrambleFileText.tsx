import React, { useState } from "react";
import styles from "./ScrambleText.module.scss";

export const ScrambleFileText = () => {
  const [originalFileText, setOriginalFileText] = useState("");
  const [processedFileText, setProcessedFileText] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const fileContent = reader.result as string;
      setOriginalFileText(fileContent);
      setProcessedFileText(scrambleText(fileContent));
    };

    reader.readAsText(file, "utf-8");
  };

  const scrambleText = (fileText: string): string => {
    return fileText.replace(/\p{L}+/gu, (word) => scrambleWord(word));
  };

  const scrambleWord = (word: string): string => {
    if (word.length <= 3) return word;

    const firstLetter = word[0];
    const lastLetter = word[word.length - 1];
    const middleLetters = word.slice(1, -1).split("");

    for (let i = middleLetters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [middleLetters[i], middleLetters[j]] = [
        middleLetters[j],
        middleLetters[i],
      ];
    }

    return firstLetter + middleLetters.join("") + lastLetter;
  };

  return (
    <div className={styles.container}>
      <input type="file" accept=".txt" onChange={handleFileUpload} />
      {originalFileText && (
        <div className="text-container">
          <h2>Oryginał:</h2>
          <textarea readOnly value={originalFileText}></textarea>

          <h2>Po przetworzeniu</h2>
          <textarea readOnly value={processedFileText}></textarea>
        </div>
      )}
    </div>
  );
};
