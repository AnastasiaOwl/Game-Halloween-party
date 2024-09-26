import React, { useState, useRef } from 'react';
import '../styles/Modal.css';

const Modal = ({ onClose, children, formdata, setformdata }) => {
  const [visible, setVisible] = useState(true);
  const modalRef = useRef(null);


  const handleClose = () => {
    setVisible(false);
    onClose();
  };
  return (
    <div
      ref={modalRef}
      className={`modal ${visible ? 'show' : 'hide'}`}
    >
      <div className="close">
        <span className='close-button' onClick={handleClose}>&times;</span>
      </div>
        <div className="modal-content">
          {React.cloneElement(children, { formdata, setformdata })}
        </div>
    </div>
  );
};

export default Modal;
