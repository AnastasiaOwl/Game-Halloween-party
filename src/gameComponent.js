import React, {useState} from "react"
import "./styles/game.css"
import heart from './icons-images/heart.png';
import clubs from './icons-images/clubs.png';
import spades from './icons-images/spades.png';
import diamonds from './icons-images/diamonds.png';

function GameComponent(){
    const iconsType = [heart, clubs, spades, diamonds];

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

    const [gameIcons, setGameIcons] = useState(pickRandomIcons(7, 6));

    const handleRestart = () => {
        setGameIcons(pickRandomIcons(7, 6));
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
        matchingIcons.forEach(([row, col]) => {
            newGameIcons[row][col] = null; 
        });
        setGameIcons(newGameIcons);
    }

 return(
 <>
 <div className="game-field">
   {gameIcons.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
                {row.map((icon, columnIndex) => (
                    <div
                        key={columnIndex}
                        className="icon"
                        style={{ backgroundImage: `url(${icon})` }}
                        onClick={() => deleteIcon(rowIndex, columnIndex)}
                    ></div>
                ))}
            </div>
         ))}
    </div>
 <button onClick={handleRestart}>restart</button>
 </>)
}

export default GameComponent;