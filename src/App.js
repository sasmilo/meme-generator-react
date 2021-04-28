import './App.css';
import MemeGenerator from './MemeGenerator';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="/Trollface_non-free.png" className="App-logo" alt="logo" />{' '}
        <h1>RANDOM MEME GENERATOR</h1>
      </header>
      <div className="App-body">
        <MemeGenerator />
      </div>
    </div>
  );
}

export default App;
