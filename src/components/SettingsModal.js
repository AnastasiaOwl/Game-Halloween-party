import React from "react";
import Modal from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMusic, faVolumeHigh} from '@fortawesome/free-solid-svg-icons';
import '../styles/settings.css';

function SettingsModal({showSettings, closeSettings}){
    return(<>
           {showSettings && (
            <Modal onClose={closeSettings}>
                <form className='settings-form'>
                    <div className="music"> <FontAwesomeIcon icon={faMusic} className="music-icon" /></div>
                    <div className="volume"> <FontAwesomeIcon icon={faVolumeHigh} className="volume-icon" /></div>
                    <div className="histoty">history</div>
                    <div>logout</div>
                </form>
            </Modal>
        )}
    </>)
}

export default SettingsModal;