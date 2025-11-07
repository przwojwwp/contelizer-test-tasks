import "./App.scss";
import { Header } from "./components/Header/Header";
// import { PeselValidator } from "./pages/PeselValidator/PeselValidator";
// import { ScrambleFileText } from "./pages/ScrambleText/ScrambleFileText";
import { UsersList } from "./pages/UsersList/UsersList";

function App() {
  return (
    <>
      <Header />
      <main className="main">
        {/* <PeselValidator /> */}
        {/* <ScrambleFileText /> */}
        <UsersList />
      </main>
    </>
  );
}

export default App;
