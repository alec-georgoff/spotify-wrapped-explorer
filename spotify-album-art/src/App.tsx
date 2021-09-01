import './App.css';
import { TestApiResults } from './TestApiResults';
import '../src/styles/General.scss';
import '../node_modules/bootstrap/scss/bootstrap.scss';
import '../src/styles/SongDisplay.scss';

function App() {
    return (
        <div className="container">
            <header className="App-header">My Spotify App</header>
            <TestApiResults />
        </div>
    );
}

export default App;
