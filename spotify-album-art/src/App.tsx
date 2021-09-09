import './App.css';
import { TestApiResults } from './ListeningHabitsDisplay';
import '../src/styles/General.scss';
import '../node_modules/bootstrap/scss/bootstrap.scss';
import '../src/styles/SongDisplay.scss';

function App() {
    return (
        <div className="container">
            <header className="App-header">Spotify Top Songs Explorer</header>
            <TestApiResults />
        </div>
    );
}

export default App;
