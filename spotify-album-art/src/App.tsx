import './App.css';
import { TestApiResults } from './TestApiResults';
import '../src/styles/SongDisplay.scss';
import '../src/styles/General.scss';

function App() {
    return (
        <div className="container">
            <header className="App-header">My Spotify App</header>
            <TestApiResults />
        </div>
    );
}

export default App;
