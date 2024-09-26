import React, { useEffect } from 'react';

type StatusBannerProps = {
  message: string;
  type: 'success' | 'error'; 
  onClose: () => void; 
};

const StatusBanner: React.FC<StatusBannerProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); 

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 p-4 mt-4 rounded-lg shadow-lg ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      } text-white text-center z-50`}
    >
      {message}
    </div>
  );
};

export default StatusBanner;
