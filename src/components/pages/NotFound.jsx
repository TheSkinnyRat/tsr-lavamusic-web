import { useEffect } from 'react';
import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';
import '../../styles/App.css';

function App() {
  
  useEffect(() => {
    document.title = `Page Not Found`;
  });
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          404 Not Found
        </p>
        <Link
          className="App-link"
          rel="noopener noreferrer"
          to="/"
        >
          Home
        </Link>
      </header>
    </div>
  );
}

export default App;
