import React, {useState} from "react"
import "./styles/game.css"
import heart from './icons-images/heart.png';
import clubs from './icons-images/clubs.png';
import spades from './icons-images/spades.png';
import diamonds from './icons-images/diamonds.png';

function gameComponent(){
    const iconsType = [heart, clubs, spades, diamonds];

    const pickRandomIcons = (iconsAmount) => {
        let icons = [];
        for (let i = 0; i < iconsAmount; i++) {
            const iconIndex = Math.floor(Math.random() * iconsType.length);
            icons.push(iconsType[iconIndex]);
        }
        return icons;
    };

    const [gameIcons, setGameIcons] = useState(pickRandomIcons(42));

    const handleRestart = () => {
        setGameIcons(pickRandomIcons(42));
    };

 return(
 <>
 <div className="game-field">
    {gameIcons.map((icon, index) => (
        <div
            key={index}
            className="icon"
            style={{ backgroundImage: `url(${icon})` }}
        ></div>
    ))}
 </div>
 <button onClick={handleRestart}>restart</button>
 </>)
}

export default gameComponent;