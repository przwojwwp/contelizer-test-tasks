import "./App.scss";
import { Header } from "./components/Header/Header";
import { ScrambleFileText } from "./pages/ScrambleText/ScrambleFileText";

function App() {
  return (
    <>
      <Header />
      <main className="main">
        <ScrambleFileText />
      </main>
    </>
  );
}

export default App;
