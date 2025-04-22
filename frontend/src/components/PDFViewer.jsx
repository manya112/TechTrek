import React from 'react';

const PDFViewer = () => {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <iframe
        src="./frontend(1).pdf"
        width="100%"
        height="100%"
        title="PDF Viewer"
        style={{ border: 'none' }}
      />
    </div>
  );
};

export default PDFViewer;
