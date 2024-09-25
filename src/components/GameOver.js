import React from "react";
import Modal from './Modal';
import '../styles/App.css';

import pumpkinButton from '../icons-images/pumpkin-button.png';

function GameOver({ showGameOver, closeGameOver, handleRestart, score}) {

    return (
        <>
        {showGameOver && (
            <Modal onClose={closeGameOver}>
                <form className='gameOver-form'>
                    <div className="gameOver-title">Game over!</div>
                    <div className="gameOver-massage">Time is up. Your score: {score}. Do you want to try again?
                    <button className="restart-button" onClick={handleRestart}>
                    Restart <img src={pumpkinButton} alt="restart icon" className="button-icon" /></button>
                    </div>
                </form>
            </Modal>
        )}
        </>
    );
}

export default GameOver;
