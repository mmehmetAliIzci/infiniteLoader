import "./App.css";
import RickAndMortyList from "./components/organisms/RickAndMortyList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h2>The world rick and morty</h2>
          <RickAndMortyList />
        </div>
      </header>
    </div>
  );
}

export default App;
