import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0, zIndex: 9999, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
