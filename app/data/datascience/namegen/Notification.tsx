// components/Notification.tsx

import React from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  return (
    <div
      className={`alert alert-${type === 'success' ? 'success' : 'error'} shadow-lg fixed top-4 right-4 z-50`}
    >
      <div>
        <span>{message}</span>
        <button className="btn btn-sm btn-circle ml-3" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default Notification;
