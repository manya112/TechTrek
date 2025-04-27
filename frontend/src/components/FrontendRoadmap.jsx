import { useEffect, useRef, useState } from 'react';

const FrontendRoadmap = () => {
  const paperRef = useRef(null);
  

  return (
    <>
      <div className="header pt-[10rem] bg-zinc-800 text-white text-center py-16">
  <h1 className="title text-4xl font-extrabold">
    Frontend Developer Roadmap 2025
  </h1>
  <p className="subtitle mt-4 text-lg font-light max-w-3xl mx-auto">
    A comprehensive step-by-step guide to becoming a modern frontend
    developer with the latest technologies and best practices.
  </p>

  <div className="button-container mt-8 flex justify-center gap-6">
    <a href="./frontend.html" className="button flex items-center px-8 py-3 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-all">
      <i className="fa fa-map-marker mr-2"></i>
      Interactive Roadmap
    </a>
    
    <a href="./project1.html" className="button flex items-center px-8 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-all">
      <i className="fa fa-wrench mr-2"></i>
      Project Ideas
    </a>
  </div>
</div>


      {/* <div className="progress-container">
        <div className="progress-header">
          <span className="progress-text">Your Progress</span>
          <span className="progress-count">0/100 Completed</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div> */}

      <div className="h-[700vh] w-full">
        
      <iframe
        className="w-full h-full bg-white"
        src="/frontend.pdf#toolbar=0"
        type="application/pdf"
      />
    {/* </div> */}
      </div>

      <footer>
        <div className="footer-content">
          <h3 className="footer-title">Frontend Developer Roadmap</h3>
          <p className="footer-description">
            This roadmap aims to give you a comprehensive understanding of the
            frontend development landscape and guide you through the tools and
            skills you need to become a modern frontend developer.
          </p>
          <div className="footer-links">
            <a href="#" className="footer-link">Resources</a>
            <a href="#" className="footer-link">Community</a>
            <a href="#" className="footer-link">Contribute</a>
            <a href="#" className="footer-link">About</a>
          </div>
        </div>
      </footer>

    </>
  );
};

export default FrontendRoadmap;