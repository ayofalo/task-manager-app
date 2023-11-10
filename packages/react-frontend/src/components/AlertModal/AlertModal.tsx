import React from "react";

const AlertModal: React.FC<{ message: string; onClose: () => void }> = ({
  message,
  onClose,
}) => {
  return (
    <div>
      <div>{message}</div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};
export default AlertModal;
