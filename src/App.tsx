import "./App.scss";
import { Header } from "./components/Header/Header";
import { PeselValidator } from "./pages/PeselValidator/PeselValidator";
// import { ScrambleFileText } from "./pages/ScrambleText/ScrambleFileText";

function App() {
  return (
    <>
      <Header />
      <main className="main">
        <PeselValidator />
        {/* <ScrambleFileText /> */}
      </main>
    </>
  );
}

export default App;
