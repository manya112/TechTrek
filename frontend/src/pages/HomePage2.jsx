import { useEffect } from 'react';

export default function HomePage2() {
  useEffect(() => {
    // Generate random binary in background
    const createBinary = () => {
      for (let i = 0; i < 50; i++) {
        const binary = document.createElement('div');
        binary.className = 'absolute text-emerald-500/20 text-xs select-none -z-10';
        binary.style.left = `${Math.random() * 100}%`;
        binary.style.top = `${Math.random() * 100}%`;
        binary.style.opacity = Math.random() * 0.5 + 0.1;
        binary.textContent = Math.random() > 0.5 ? '1' : '0';
        document.body.appendChild(binary);
        
        setInterval(() => {
          binary.textContent = Math.random() > 0.5 ? '1' : '0';
        }, 1000 + Math.random() * 2000);
      }
    };
    
    // Random glitch effect on nav buttons
    const randomGlitch = () => {
      const buttons = document.querySelectorAll('.nav-button');
      const randomIndex = Math.floor(Math.random() * buttons.length);
      const button = buttons[randomIndex];
      
      if (button) {
        button.style.transform = 'translateY(-2px) skew(2deg)';
        button.style.boxShadow = '0 0 15px rgba(20, 241, 149, 0.7)';
        
        setTimeout(() => {
          button.style.transform = '';
          button.style.boxShadow = '';
        }, 200);
      }
    };
    
    createBinary();
    const glitchInterval = setInterval(randomGlitch, 3000);
    
    // Cleanup function
    return () => {
      clearInterval(glitchInterval);
      const binaries = document.querySelectorAll('.absolute.text-emerald-500\\/20');
      binaries.forEach(binary => binary.remove());
    };
  }, []);

  return (
    <div className="bg-slate-900 font-mono text-emerald-500 overflow-x-hidden relative ">
      {/* Grid Background */}
      <div className="fixed top-0 left-0 w-full h-full bg-grid-pattern -z-10"></div>
      
      {/* Scan Line */}
      <div className="fixed top-0 left-0 w-full h-0.5 bg-emerald-500/50 shadow-lg shadow-emerald-500/50 opacity-70 animate-scan pointer-events-none z-50"></div>
      
      {/* Login Section */}
      <div className="flex justify-end gap-4 p-4 relative z-10">
        <button className="cyber-btn py-2 px-5 bg-transparent text-emerald-400 border-2 border-emerald-400 uppercase tracking-wider text-sm relative overflow-hidden transition-all duration-300 hover:shadow-glow">
          <a href="./login.html" className="text-emerald-400">Login</a>
        </button>
        <button className="cyber-btn py-2 px-5 bg-transparent text-emerald-400 border-2 border-emerald-400 uppercase tracking-wider text-sm relative overflow-hidden transition-all duration-300 hover:shadow-glow">
          Sign Up
        </button>
      </div>
      
      {/* Main Container */}
      <div className="max-w-6xl mx-auto p-5 relative">
        {/* Header */}
        <div className="text-center my-8 mb-12 relative">
          <h1 className="text-4xl md:text-5xl mb-4 tracking-wider text-white glitch-text relative">PATH2IT</h1>
          <p className="max-w-3xl mx-auto leading-relaxed text-emerald-50 opacity-0 animate-fadeIn">
            Navigate the digital frontier with our developer roadmaps. A community-driven initiative dedicated to creating pathways, guides, and educational content that help developers master their learning journey and choose the optimal career trajectory.
          </p>
        </div>
        
        {/* Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-12">
          <a href="./frontend.html" className="nav-button flex flex-col items-center justify-center p-5 bg-slate-900/80 border border-emerald-400 text-white text-center cursor-pointer transition-all duration-300 relative overflow-hidden backdrop-blur opacity-0">
            <span className="text-4xl mb-2 block">🎨</span>
            <span className="text-emerald-400 font-bold">Frontend</span>
          </a>
          <a href="./backend.html" className="nav-button flex flex-col items-center justify-center p-5 bg-slate-900/80 border border-emerald-400 text-white text-center cursor-pointer transition-all duration-300 relative overflow-hidden backdrop-blur opacity-0">
            <span className="text-4xl mb-2 block">🛠</span>
            <span className="text-emerald-400 font-bold">Backend</span>
          </a>
          <a href="./devops.html" className="nav-button flex flex-col items-center justify-center p-5 bg-slate-900/80 border border-emerald-400 text-white text-center cursor-pointer transition-all duration-300 relative overflow-hidden backdrop-blur opacity-0">
            <span className="text-4xl mb-2 block">⚙</span>
            <span className="text-emerald-400 font-bold">DevOps</span>
          </a>
          <div className="nav-button flex flex-col items-center justify-center p-5 bg-slate-900/80 border border-emerald-400 text-white text-center cursor-pointer transition-all duration-300 relative overflow-hidden backdrop-blur opacity-0">
            <span className="text-4xl mb-2 block">🌐</span>
            <span className="text-emerald-400 font-bold">Full Stack</span>
          </div>
          <div className="nav-button flex flex-col items-center justify-center p-5 bg-slate-900/80 border border-emerald-400 text-white text-center cursor-pointer transition-all duration-300 relative overflow-hidden backdrop-blur opacity-0">
            <span className="text-4xl mb-2 block">🧠</span>
            <span className="text-emerald-400 font-bold">AI Engineer</span>
          </div>
          <div className="nav-button flex flex-col items-center justify-center p-5 bg-slate-900/80 border border-emerald-400 text-white text-center cursor-pointer transition-all duration-300 relative overflow-hidden backdrop-blur opacity-0">
            <span className="text-4xl mb-2 block">📊</span>
            <span className="text-emerald-400 font-bold">Data Analyst</span>
          </div>
          <div className="nav-button flex flex-col items-center justify-center p-5 bg-slate-900/80 border border-emerald-400 text-white text-center cursor-pointer transition-all duration-300 relative overflow-hidden backdrop-blur opacity-0">
            <span className="text-4xl mb-2 block">📱</span>
            <span className="text-emerald-400 font-bold">iOS</span>
          </div>
          <div className="nav-button flex flex-col items-center justify-center p-5 bg-slate-900/80 border border-emerald-400 text-white text-center cursor-pointer transition-all duration-300 relative overflow-hidden backdrop-blur opacity-0">
            <span className="text-4xl mb-2 block">🐘</span>
            <span className="text-emerald-400 font-bold">PostgreSQL</span>
          </div>
          <div className="nav-button flex flex-col items-center justify-center p-5 bg-slate-900/80 border border-emerald-400 text-white text-center cursor-pointer transition-all duration-300 relative overflow-hidden backdrop-blur opacity-0">
            <span className="text-4xl mb-2 block">⛓</span>
            <span className="text-emerald-400 font-bold">Blockchain</span>
          </div>
          <div className="nav-button flex flex-col items-center justify-center p-5 bg-slate-900/80 border border-emerald-400 text-white text-center cursor-pointer transition-all duration-300 relative overflow-hidden backdrop-blur opacity-0">
            <span className="text-4xl mb-2 block">🏗</span>
            <span className="text-emerald-400 font-bold">Software Architect</span>
          </div>
          <div className="nav-button flex flex-col items-center justify-center p-5 bg-slate-900/80 border border-emerald-400 text-white text-center cursor-pointer transition-all duration-300 relative overflow-hidden backdrop-blur opacity-0">
            <span className="text-4xl mb-2 block">🔐</span>
            <span className="text-emerald-400 font-bold">Cyber Security</span>
          </div>
          <div className="nav-button flex flex-col items-center justify-center p-5 bg-slate-900/80 border border-emerald-400 text-white text-center cursor-pointer transition-all duration-300 relative overflow-hidden backdrop-blur opacity-0">
            <span className="text-4xl mb-2 block">🎯</span>
            <span className="text-emerald-400 font-bold">UX Design</span>
          </div>
          <div className="nav-button flex flex-col items-center justify-center p-5 bg-slate-900/80 border border-emerald-400 text-white text-center cursor-pointer transition-all duration-300 relative overflow-hidden backdrop-blur opacity-0">
            <span className="text-4xl mb-2 block">✍</span>
            <span className="text-emerald-400 font-bold">Technical Writer</span>
          </div>
          <div className="nav-button flex flex-col items-center justify-center p-5 bg-slate-900/80 border border-emerald-400 text-white text-center cursor-pointer transition-all duration-300 relative overflow-hidden backdrop-blur opacity-0">
            <span className="text-4xl mb-2 block">🔁</span>
            <span className="text-emerald-400 font-bold">MLOps</span>
          </div>
          <div className="nav-button flex flex-col items-center justify-center p-5 bg-slate-900/80 border border-emerald-400 text-white text-center cursor-pointer transition-all duration-300 relative overflow-hidden backdrop-blur opacity-0">
            <span className="text-4xl mb-2 block">📦</span>
            <span className="text-emerald-400 font-bold">Product Manager</span>
          </div>
          <div className="nav-button flex flex-col items-center justify-center p-5 bg-slate-900/80 border border-emerald-400 text-white text-center cursor-pointer transition-all duration-300 relative overflow-hidden backdrop-blur opacity-0">
            <span className="text-4xl mb-2 block">🤖</span>
            <span className="text-emerald-400 font-bold">Android</span>
          </div>
          <div className="nav-button flex flex-col items-center justify-center p-5 bg-slate-900/80 border border-emerald-400 text-white text-center cursor-pointer transition-all duration-300 relative overflow-hidden backdrop-blur opacity-0">
            <span className="text-4xl mb-2 block">📈</span>
            <span className="text-emerald-400 font-bold">AI & Data Scientist</span>
          </div>
          <div className="nav-button flex flex-col items-center justify-center p-5 bg-slate-900/80 border border-emerald-400 text-white text-center cursor-pointer transition-all duration-300 relative overflow-hidden backdrop-blur opacity-0">
            <span className="text-4xl mb-2 block">🧪</span>
            <span className="text-emerald-400 font-bold">QA</span>
          </div>
          <div className="nav-button flex flex-col items-center justify-center p-5 bg-slate-900/80 border border-emerald-400 text-white text-center cursor-pointer transition-all duration-300 relative overflow-hidden backdrop-blur opacity-0">
            <span className="text-4xl mb-2 block">🎮</span>
            <span className="text-emerald-400 font-bold">Game Developer</span>
          </div>
          <div className="nav-button flex flex-col items-center justify-center p-5 bg-slate-900/80 border border-emerald-400 text-white text-center cursor-pointer transition-all duration-300 relative overflow-hidden backdrop-blur opacity-0">
            <span className="text-4xl mb-2 block">🧭</span>
            <span className="text-emerald-400 font-bold">Engineering Manager</span>
          </div>
          <div className="nav-button flex flex-col items-center justify-center p-5 bg-slate-900/80 border border-emerald-400 text-white text-center cursor-pointer transition-all duration-300 relative overflow-hidden backdrop-blur opacity-0">
            <span className="text-4xl mb-2 block">📣</span>
            <span className="text-emerald-400 font-bold">Developer Relations</span>
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center py-5 text-sm text-emerald-500 border-t border-emerald-500/30">
          © 2023 PATH2IT Developer Roadmaps. All rights reserved.
        </div>
      </div>
      
      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
          perspective: 1000px;
          transform-style: preserve-3d;
          animation: gridMove 20s linear infinite;
        }
        
        @keyframes gridMove {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 20px 20px;
          }
        }

        .animate-scan {
          animation: scanMove 5s linear infinite;
        }

        @keyframes scanMove {
          0% {
            top: -5px;
          }
          100% {
            top: 100vh;
          }
        }

        .hover\:shadow-glow:hover {
          box-shadow: 0 0 10px rgba(20, 241, 149, 0.7);
        }

        .cyber-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: rgba(20, 241, 149, 0.2);
          transition: all 0.3s;
          z-index: -1;
        }

        .cyber-btn:hover::before {
          left: 0;
        }

        .glitch-text {
          animation: glitch 1s forwards;
          text-shadow: 
            0 0 10px rgba(20, 241, 149, 0.7),
            0 0 20px rgba(20, 241, 149, 0.4),
            0 0 30px rgba(20, 241, 149, 0.2);
        }

        .glitch-text::before {
          content: 'PATH2IT';
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          color: #ff36f0;
          opacity: 0.7;
          transform: translateX(-2px);
          filter: blur(1px);
          z-index: -1;
        }

        .glitch-text::after {
          content: 'PATH2IT';
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          color: #3690ff;
          opacity: 0.7;
          transform: translateX(2px);
          filter: blur(1px);
          z-index: -1;
        }

        @keyframes glitch {
          0% {
            opacity: 0;
            transform: translateY(20px) skew(10deg);
          }
          10% {
            transform: translateY(10px) skew(-5deg);
          }
          20% {
            transform: translateY(5px) skew(2deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) skew(0);
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s 0.5s forwards;
        }

        .nav-button {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          animation: fadeIn 0.5s forwards;
        }

        .nav-button:nth-child(odd) {
          animation-delay: 0.2s;
        }

        .nav-button:nth-child(even) {
          animation-delay: 0.4s;
        }

        .nav-button::before {
          content: '';
          position: absolute;
          top: -100%;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(20, 241, 149, 0.1);
          transition: all 0.5s;
        }

        .nav-button:hover::before {
          top: 0;
        }

        .nav-button:hover {
          transform: translateY(-5px);
          box-shadow: 
            0 0 15px rgba(20, 241, 149, 0.5),
            0 0 30px rgba(20, 241, 149, 0.3);
        }
        
        .nav-button:hover span:last-child {
          animation: textPulse 1.5s infinite;
        }

        @keyframes textPulse {
          0% {
            text-shadow: 
              0 0 7px rgba(20, 241, 149, 0.7),
              0 0 10px rgba(20, 241, 149, 0.5);
          }
          50% {
            text-shadow: 
              0 0 15px rgba(20, 241, 149, 0.9),
              0 0 25px rgba(20, 241, 149, 0.7);
          }
          100% {
            text-shadow: 
              0 0 7px rgba(20, 241, 149, 0.7),
              0 0 10px rgba(20, 241, 149, 0.5);
          }
        }
      `}</style>
    </div>
  );
}