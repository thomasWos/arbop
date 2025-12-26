import React from 'react';
import './App.css';
import ArbLists from './ArbLists';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>ArbOp</h1>
      </header>
      <a
        className="github-link"
        href="https://github.com/thomasWos/arbop"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View project on GitHub"
        title="View on GitHub"
      >
        <svg className="github-icon" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.11.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.304.76-1.604-2.665-.304-5.467-1.334-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.135-.303-.54-1.524.105-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 3-.405c1.02.005 2.045.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.874.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.215 0 1.6-.015 2.887-.015 3.28 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z" />
        </svg>
      </a>
      <ArbLists />
    </div>
  );
}
export default App;
