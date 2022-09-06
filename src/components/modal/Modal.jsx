import React from 'react';
import './modal.css';

function Modal({ active, setActive, children }) {
  return (
    <div className={ active ? 'modal modal_active' : 'modal' } onClick={ () => setActive(false) }>
      <div className='modal__content' onClick={ e => e.stopPropagation() }>
        { children }
      </div>
    </div>
  );
}

export default Modal;