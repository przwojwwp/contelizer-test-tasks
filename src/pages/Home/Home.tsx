import styles from "./Home.module.scss";

export const Home = () => {
  return (
    <div className={styles.container}>
      <h1>Treść zadań</h1>
      <p>
        Zadanie 1 <br />
        Napisz program w React, który posiada obsługę formularza do wgrania
        pliku tekstowego, a następnie przestawi losowo szyk liter w każdym
        wierszu oprócz pierwszej i ostatniej litery wyrazu. Uwzględnij
        interpunkcję, wielkie/małe litery, wielolinijkowe teksty, polskie znaki.
      </p>
      <p>
        Zadanie 2 <br />
        Napisz program w React do walidacji numeru PESEL zgodnie z oficjalną
        specyfikacją formatu. Przygotuj testy jednostkowe sprawdzające kilka
        danych nieprawidłowych i przynajmniej jeden poprawny numer PESEL.
      </p>
      <p>
        Zadanie 3 <br />
        Napisz w React obsługę API dostępnego pod adresem https://gorest.co.in/.
        Aplikacja powinna posiadać widok listy użytkowników (pobranych z API)
        oraz mieć możliwość ich wyszukiwania i edycji istniejących wpisów.
      </p>
    </div>
  );
};
