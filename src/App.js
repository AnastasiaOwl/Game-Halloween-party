import React, { useState } from 'react';
import './styles/App.css';
import useSound from 'use-sound';
import backgroundMusic from './sound-effects/halloween.mp3'; 
import GameComponent from './components/GameComponent.js';
import RulesComponent from './components/RulesComponent.js';

function App() {
  const [showRules, setShowRules] = useState(true); 
  const [isMusicPlaying, setIsMusicPlaying] = useState(false); 
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [volume, setVolume] = useState(0.3); 
  const [play, { stop, sound }] = useSound(backgroundMusic, { 
    volume,
    loop: true,
  });


  const toggleMusic = () => {
    if (isMusicPlaying) {
      stop();
    } else {
      play();
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100; 
    setVolume(newVolume);
    if (sound) {
      sound.volume(newVolume); 
    }
  };

  const handleCloseRules = () => {
    setShowRules(false);
    play(); 
    setIsMusicPlaying(true);
    setHasGameStarted(true);
  };

  return (
    <div className="App">
      {showRules && (
        <div className="overlay">
          <RulesComponent onClose={handleCloseRules} />
        </div>
      )}
      <GameComponent 
      toggleMusic={toggleMusic} 
      isMusicPlaying={isMusicPlaying}
      volume={volume}
      handleVolumeChange={handleVolumeChange}
      hasGameStarted={hasGameStarted} />
    </div>
  );
}

export default App;
