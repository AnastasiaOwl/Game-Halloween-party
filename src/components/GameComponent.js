import React, {useState, useRef, useEffect} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGear} from '@fortawesome/free-solid-svg-icons';
import "../styles/game.css"
import GameOver from './GameOver';
import bat from '../icons-images/bat.png';
import ghost from '../icons-images/ghost.png';
import hat from '../icons-images/hat.png';
import spider from '../icons-images/spider.png';
import pumpkin from '../icons-images/pumpkin.png';
import useSound from 'use-sound';
import boo from '../sound-effects/boo.mp3';
import batSound from '../sound-effects/batSound.mp3';
import witchSound from '../sound-effects/witchSound.mp3';
import spiderSound from '../sound-effects/spiderSound.mp3';
import pumpkinSound from '../sound-effects/pumpkinSound.mp3';
import SettingsModal from "./SettingsModal";

function GameComponent({ toggleMusic, isMusicPlaying, handleVolumeChange, volume, hasGameStarted}){
    const iconsType = [bat, ghost, hat, spider, pumpkin];

    const [isSoundOn, setIsSoundOn] = useState(true); 
    const [soundVolume, setSoundVolume] = useState(0.5);
    
    const [playBoo] = useSound(boo, {volume: soundVolume});
    const [playBat] = useSound(batSound, {volume: soundVolume});
    const [playWitch] = useSound(witchSound, {volume: soundVolume});
    const [playSpider]= useSound(spiderSound,{volume: soundVolume});
    const [playPumpkin] = useSound (pumpkinSound, {volume: soundVolume});

    const toggleSound = () => {
        setIsSoundOn(!isSoundOn); 
    };

    const handleSoundVolumeChange = (e) => {
        const newVolume = e.target.value / 100;
        setSoundVolume(newVolume);
    };

    const pickRandomIcons = (rows, columns) => {
        let icons = [];
        for (let i = 0; i < rows; i++) {
            let row = [];
            for(let j = 0; j<columns; j++){
            const iconIndex = Math.floor(Math.random() * iconsType.length);
            row.push(iconsType[iconIndex]);
            }
            icons.push(row);
        }
        return icons;
    };

    const [paused, setPaused] = useState(false);
    const [gameIcons, setGameIcons] = useState(pickRandomIcons(11, 11));
    const [isAnimating, setIsAnimating] = useState(false); 
    const [score, setScore] = useState(0); 
    const [isGameOver, setIsGameOver] = useState(false); 
    const [timerStarted, setTimerStarted] = useState(false); 
    const [showSettings, setShowSettings]= useState(false);
    const [timeLeft, setTimeLeft] = useState(300); 
    const timerRef = useRef(null);

    const closeGameOver = () => {
        setIsGameOver(false); 
      }

      const openSettings = () => {
        setShowSettings(true); 
        setPaused(true);
       }
     
       const closeSettings = () => {
        setShowSettings(false); 
        setPaused(false);
      }
    

    const handleRestart = () => {
        setGameIcons(pickRandomIcons(11, 11));
        setScore(0); 
        setIsGameOver(false); 
        setTimeLeft(300); 
        setTimerStarted(false);
        clearInterval(timerRef.current); 
    };

    const findMatchingIcons = (rowIndex, columnIndex, visited = new Set()) => {
        const clickedIcon = gameIcons[rowIndex][columnIndex];
        let matchingIcons = [[rowIndex, columnIndex]];
        const key = (row, col) => `${row},${col}`;
    
        visited.add(key(rowIndex, columnIndex));
    
        const floodFill = (row, col) => {
            const directions = [
                [0, -1],  
                [0, 1],   
                [-1, 0],  
                [1, 0]   
            ];
            for (let [dx, dy] of directions) {
                const newRow = row + dx;
                const newCol = col + dy;
                if (
                    newRow >= 0 &&
                    newRow < gameIcons.length &&
                    newCol >= 0 &&
                    newCol < gameIcons[0].length &&
                    !visited.has(key(newRow, newCol)) &&
                    gameIcons[newRow][newCol] === clickedIcon
                ) {
                    visited.add(key(newRow, newCol));
                    matchingIcons.push([newRow, newCol]);
                    floodFill(newRow, newCol);
                }
            }
        };
        floodFill(rowIndex, columnIndex);

        return matchingIcons;
    };

    const deleteIcon=(rowIndex, columnIndex)=>{
        let matchingIcons = findMatchingIcons(rowIndex, columnIndex);
        let newGameIcons = gameIcons.map(row => [...row]);
        if (matchingIcons.length < 2) return null; 
        setScore(prevScore => prevScore + matchingIcons.length);
        matchingIcons.forEach(([row, col]) => {
            newGameIcons[row][col] = null; 
        });
        return newGameIcons;
    }

    const startTimer = () => {
        if (!paused && hasGameStarted) { 
            clearInterval(timerRef.current);
            timerRef.current = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timerRef.current);
                        setIsGameOver(true);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
    };

    useEffect(() => {
        if (!paused && showSettings === false || !paused && hasGameStarted) {
            startTimer();
        }
        return () => {
            clearInterval(timerRef.current);
        };
    }, [paused, showSettings, hasGameStarted]);

   
const fallIcons = (icons) => {
    let iconsFell = false;

    for (let col = 0; col < icons[0].length; col++) {
        let emptySpaces = [];

        for (let row = icons.length - 1; row >= 0; row--) {
            if (icons[row][col] === null) {
                emptySpaces.push(row); 
            } else if (emptySpaces.length > 0) {
                let emptyRow = emptySpaces.shift();  
                icons[emptyRow][col] = icons[row][col];  
                icons[row][col] = null;  
                emptySpaces.push(row);
                iconsFell = true;
            }
        }
    }
    return { icons, iconsFell };
}

const addNewIcons = (icons) => {
    for (let col = 0; col < icons[0].length; col++) {
        for (let row = 0; row < icons.length; row++) {
            if (icons[row][col] === null) {
                const iconIndex = Math.floor(Math.random() * iconsType.length);
                icons[row][col] = iconsType[iconIndex];
            }
        }
    }
    return icons;
}

const fallAndFill = (rowIndex, columnIndex) => {
    if (isAnimating || isGameOver) return;

    const clickedIcon = gameIcons[rowIndex][columnIndex];

    if (isSoundOn) {
        if (clickedIcon === ghost) playBoo();
        if (clickedIcon === bat) playBat();
        if (clickedIcon === hat) playWitch();
        if (clickedIcon === spider) playSpider();
        if (clickedIcon === pumpkin) playPumpkin();
    }

    if (!timerStarted) {
        startTimer(); 
        setTimerStarted(true);
    }
    setIsAnimating(true);
    let newGameIcons = deleteIcon(rowIndex, columnIndex);
    if (!newGameIcons) {
        setIsAnimating(false);
        return;
    }

    setTimeout(() => {
        let { icons: fallenIcons, iconsFell } = fallIcons(newGameIcons);
        setGameIcons(fallenIcons);

        setTimeout(() => {
            let filledIcons = addNewIcons(fallenIcons); 
            setGameIcons(filledIcons);
            setIsAnimating(false);
        }, 300);  
    }, 300);
}

    return(
    <>
        <SettingsModal 
        showSettings={showSettings} 
        closeSettings={closeSettings} 
        toggleMusic={toggleMusic}
        isMusicPlaying={isMusicPlaying}
        handleVolumeChange={handleVolumeChange} 
        volume={volume}
        isSoundOn={isSoundOn}
        toggleSound={toggleSound} 
        soundVolume={soundVolume}
        handleSoundVolumeChange={handleSoundVolumeChange}/>
        <button type="button" className='settings' onClick={openSettings}><FontAwesomeIcon icon={faGear}/></button>
        <div className="score">Score: {score}</div>
        <div className="timer">Time Left: {Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}</div>
        <div className="game-field">
        {gameIcons.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((icon, columnIndex) => (
                            <div
                                key={columnIndex}
                                className="icon"
                                style={{ backgroundImage: `url(${icon})` }}
                                onClick={() => fallAndFill(rowIndex, columnIndex)}
                            ></div>
                        ))}
                    </div>
                ))}
            </div>
        <GameOver showGameOver={isGameOver} closeGameOver={closeGameOver} handleRestart={handleRestart} score={score}/>
    </>
    )
    }

export default GameComponent;