import React from "react";

interface DialogProps {
  message: string;
  onClose: () => void;
}

const DialogPopup: React.FC<DialogProps> = ({ message, onClose }) => {
  return (
    <div className="dialogOverlay">
      <div className="dialogBox">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default DialogPopup;
