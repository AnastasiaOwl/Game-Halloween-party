import React, { useState, useRef } from 'react';
import '../styles/Modal.css';

const Modal = ({ onClose, children, formdata, setformdata }) => {
  const [visible, setVisible] = useState(true);
  const modalRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (event) => {
    setPosition({ x: event.clientX, y: event.clientY });
    setDragging(true);
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
  
    if (dragging) {
      const modal = modalRef.current;
  
      const deltaX = e.clientX - position.x;
      const deltaY = e.clientY - position.y;
  
      const newLeft = modal.offsetLeft + deltaX;
      const newTop = modal.offsetTop + deltaY;
  
      modal.style.left = newLeft + 'px';
      modal.style.top = newTop + 'px';
  
      setPosition({ x: e.clientX, y: e.clientY });
    }
  };  

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleClose = () => {
    setVisible(false);
    onClose();
  };
  return (
    <div
      ref={modalRef}
      className={`modal ${visible ? 'show' : 'hide'}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
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
