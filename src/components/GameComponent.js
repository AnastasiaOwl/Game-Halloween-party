import React, {useState, useRef, useEffect} from "react"
import "../styles/game.css"
import GameOver from './GameOver';
import bat from '../icons-images/bat.png';
import ghost from '../icons-images/ghost.png';
import hat from '../icons-images/hat.png';
import spider from '../icons-images/spider.png';
import pumpkin from '../icons-images/pumpkin.png';

function GameComponent(){
    const iconsType = [bat, ghost, hat, spider, pumpkin];

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

    const [gameIcons, setGameIcons] = useState(pickRandomIcons(11, 11));
    const [isAnimating, setIsAnimating] = useState(false); 
    const [score, setScore] = useState(0); 
    const [isGameOver, setIsGameOver] = useState(false); 
    const [timerStarted, setTimerStarted] = useState(false); 
    const [timeLeft, setTimeLeft] = useState(300); // fix add 300 c
    const timerRef = useRef(null);

    const closeMap = () => {
        setShowMap(false); 
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
        timerRef.current = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timerRef.current); 
                    setIsGameOver(true);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
    };

    useEffect(() => {
        return () => {
            clearInterval(timerRef.current);  
        };
    }, []);

   
const fallIcons = (icons) => {
    let iconsFell = false;

    // Loop through each column
    for (let col = 0; col < icons[0].length; col++) {
        let emptySpaces = [];

        // Collect empty spaces in the column
        for (let row = icons.length - 1; row >= 0; row--) {
            if (icons[row][col] === null) {
                emptySpaces.push(row);  // Collect the row index of empty spaces
            } else if (emptySpaces.length > 0) {
                // If there are empty spaces below this icon, move it down to the lowest empty space
                let emptyRow = emptySpaces.shift();  // Get the first empty space (at the bottom)
                icons[emptyRow][col] = icons[row][col];  // Move icon to the empty space
                icons[row][col] = null;  // Mark the original space as empty
                emptySpaces.push(row);  // This row is now empty, so we add it to the list of empty spaces
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
        <GameOver showMap={isGameOver} closeMap={closeMap} handleRestart={handleRestart} score={score}/>
    </>
    )
    }

export default GameComponent;