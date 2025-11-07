import { useState } from "react";
import "./App.scss";
import { Header } from "./components/Header/Header";
import { Home } from "./pages/Home/Home";
import { PeselValidator } from "./pages/PeselValidator/PeselValidator";
import { ScrambleFileText } from "./pages/ScrambleText/ScrambleFileText";
import { UsersList } from "./pages/UsersList/UsersList";
import type { VisibleExercise } from "./types/visibleExercise";

function App() {
  const [visibleExercise, setVisibleExercise] =
    useState<VisibleExercise | null>(null);

  return (
    <>
      <Header setVisibleExercise={setVisibleExercise} />
      <main className="main">
        {visibleExercise === null && <Home />}

        {visibleExercise === "Exercise-1" && <ScrambleFileText />}
        {visibleExercise === "Exercise-2" && <PeselValidator />}
        {visibleExercise === "Exercise-3" && <UsersList />}
      </main>
    </>
  );
}

export default App;
