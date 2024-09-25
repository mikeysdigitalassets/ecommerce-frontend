// components/Structure/StatusBanner.tsx
import React, { useEffect } from 'react';

type StatusBannerProps = {
  message: string;
  type: 'success' | 'error'; // 'success' for added, 'error' for removed
  onClose: () => void; // Callback to hide the banner
};

const StatusBanner: React.FC<StatusBannerProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Hide the banner after 3 seconds

    return () => clearTimeout(timer); // Clear timeout if component unmounts
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
