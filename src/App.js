import './App.css';
import MemeGenerator from './MemeGenerator';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/9/9a/Trollface_non-free.png"
          className="App-logo"
          alt="logo"
        />{' '}
        <h1>RANDOM MEME GENERATOR</h1>
        <MemeGenerator />
      </header>
    </div>
  );
}

export default App;
