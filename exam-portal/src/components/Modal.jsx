import React from 'react';

const Modal = ({ show, onConfirm, onCancel, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          {children}
        </div>
        <div className="modal-footer">
          <button onClick={onCancel} className="modal-button cancel">Cancel</button>
          <button onClick={onConfirm} className="modal-button confirm">Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
