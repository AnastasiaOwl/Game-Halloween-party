import React, { useState } from 'react';
import './styles/App.css';
import GameComponent from './components/GameComponent.js';
import RulesComponent from './components/RulesComponent.js';

function App() {
  const [showRules, setShowRules] = useState(true); 

  const handleCloseRules = () => {
    setShowRules(false);
  };

  return (
    <div className="App">
      {showRules && (
        <div className="overlay">
          <RulesComponent onClose={handleCloseRules} />
        </div>
      )}
      <GameComponent />
    </div>
  );
}

export default App;
