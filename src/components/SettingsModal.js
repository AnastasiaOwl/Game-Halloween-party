import React from "react";
import Modal from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faVolumeHigh, faVolumeOff} from '@fortawesome/free-solid-svg-icons';
import musicIconSlash from '../icons-images/musicSlash.png';
import musicIcon from '../icons-images/musical-note.png';
import '../styles/settings.css';

function SettingsModal({
    showSettings, 
    closeSettings, 
    toggleMusic, 
    isMusicPlaying, 
    volume,
    handleVolumeChange,
    isSoundOn,
    toggleSound,
    soundVolume,
    handleSoundVolumeChange
 }){
    return(<>
           {showSettings && (
            <Modal onClose={closeSettings}>
                <form className='settings-form'>
                    <div className="music">
                    <div onClick={toggleMusic}>  
                        {isMusicPlaying ? (
                            <img src={musicIcon} alt="music off icon" className="music-image" /> 
                            ) : (
                                <img src={musicIconSlash} alt="music off icon" className="music-image" />  
                            )}
                    </div>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={volume * 100}
                        onChange={handleVolumeChange} 
                        className="volume-slider"
                        />
                    </div>
                    <div className="sound">
                            <div onClick={toggleSound}>
                                {isSoundOn ? (
                                    <FontAwesomeIcon icon={faVolumeHigh} className="volume-icon" />
                                ) : (
                                    <FontAwesomeIcon icon={faVolumeOff} className="volume-icon" />
                                )}
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={soundVolume * 100}
                                onChange={handleSoundVolumeChange}
                                className="volume-slider"
                            />
                        </div>
                </form>
            </Modal>
        )}
    </>)
}

export default SettingsModal;