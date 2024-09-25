import React, {useState} from "react"
import "../styles/Rules.css"
import pumpkinGuide from '../icons-images/pumpkin-button.png';


function RulesComponent({ onClose }){
    return(
        <>
        <div className="rules">
            <div className="speech-buble"> 
                <div className="text">
                    <div className="intro-text">Welcome, brave souls, to my Halloween party!
                    I am Lord Pumpkula, and I have a challenge for you. Allow me to explain the rules of my wicked game:</div>
                    <div className="rules-text">Your task: You must count and collect my loyal servants, but there's a trick. 
                        You can only claim points by selecting groups of two or more servants at a time.
                        If you click on just one—no points for you! So, choose wisely.</div>
                    <div className="rules-text">How to play: When you find two or more of the same type of servant together, tap them, 
                        and they shall disappear! 
                        But beware, for new servants will immediately fill the empty spaces, falling from above to continue the game.</div>
                    <div className="rules-text">The goal: Gather as many points as you can before my enchanted hourglass runs out of sand.
                        You only have five minutes, so don`t get too excited—or too careless! Ha-ha-ha!</div>
                </div>
            </div>
            <div className="container">
            <img src={pumpkinGuide} alt="restart icon" className="pumpkin-guide"/>
            <button onClick={onClose} className="startGame-button">Start Game
            <img src={pumpkinGuide} alt="restart icon" className="button-icon" />
            </button>
            </div>
        </div>
        
        </>
    )
}

export default RulesComponent;