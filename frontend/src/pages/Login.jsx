import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function VibrantLoginPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  // Effect to handle interactive elements
  useEffect(() => {
    // Mouse follower effect
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    // Animated background elements
    const createFlowingElements = () => {
      const container = document.getElementById('background-elements');
      if (!container) return;
      
      const shapes = ['circle', 'square', 'triangle'];
      const colors = ['pink', 'purple', 'blue', 'cyan', 'green', 'amber'];
      
      for (let i = 0; i < 15; i++) {
        const el = document.createElement('div');
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const colorClass = colors[Math.floor(Math.random() * colors.length)];
        
        el.className = `absolute ${shape === 'circle' ? 'rounded-full' : shape === 'square' ? 'rounded-md rotate-45' : 'triangle'} 
                        bg-gradient-to-br ${shape === 'triangle' ? '' : getColorValue(colorClass).replace('bg-gradient-to-br', '')} 
                        opacity-20 blur-sm`;
        
        // Size between 50px and 200px
        const size = Math.random() * 150 + 50;
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        
        // Initial position
        el.style.left = `${Math.random() * 100}%`;
        el.style.top = `${Math.random() * 100}%`;
        
        // Animation properties
        el.style.animationDuration = `${Math.random() * 50 + 30}s`;
        el.style.animationDelay = `${Math.random() * 10}s`;
        
        // Add to container
        container.appendChild(el);
        
        // Add triangles separately with CSS
        if (shape === 'triangle') {
          el.style.backgroundColor = 'transparent';
          el.style.borderLeft = `${size/2}px solid transparent`;
          el.style.borderRight = `${size/2}px solid transparent`;
          el.style.borderBottom = `${size}px solid rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.2)`;
          el.style.width = '0';
          el.style.height = '0';
        }
      }
    };
    
    // Helper function to get color value
    const getColorValue = (color) => {
      const colorMap = {
        pink: "bg-gradient-to-br from-pink-500 to-pink-600",
        purple: "bg-gradient-to-br from-purple-500 to-purple-600",
        blue: "bg-gradient-to-br from-blue-500 to-blue-600",
        cyan: "bg-gradient-to-br from-cyan-500 to-cyan-600",
        green: "bg-gradient-to-br from-green-500 to-green-600",
        amber: "bg-gradient-to-br from-amber-500 to-amber-600"
      };
      return colorMap[color] || colorMap.blue;
    };
    
    // Card hover effect
    const addCardEffects = () => {
      const card = document.querySelector('.login-card');
      if (card) {
        card.addEventListener('mouseenter', () => {
          card.classList.add('border-white/30');
          card.classList.remove('border-white/10');
        });
        
        card.addEventListener('mouseleave', () => {
          card.classList.remove('border-white/30');
          card.classList.add('border-white/10');
        });
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    createFlowingElements();
    addCardEffects();
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      const container = document.getElementById('background-elements');
      if (container) container.innerHTML = '';
    };
  }, []);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans antialiased relative overflow-hidden flex items-center justify-center">
      {/* Interactive mouse follower */}
      <div 
        className="fixed w-32 h-32 rounded-full bg-blue-500/20 blur-xl pointer-events-none z-0"
        style={{
          left: `${mousePosition.x - 64}px`,
          top: `${mousePosition.y - 64}px`,
          transition: 'transform 0.1s ease-out'
        }}
      ></div>
      
      {/* Animated background elements */}
      <div id="background-elements" className="fixed inset-0 z-0 overflow-hidden"></div>
      
      {/* Gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70 z-0"></div>
      
      {/* Main content container */}
      <div className="relative z-10 w-full max-w-md p-8">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-purple-600/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-blue-600/20 blur-3xl"></div>
        
        {/* Login card */}
        <div className="login-card bg-black/40 backdrop-blur-lg rounded-2xl border border-white/10 shadow-lg shadow-blue-500/10 p-8 transition-all duration-300">
          {/* Logo & branding */}
          <div className="flex items-center justify-center mb-8">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-2">
              <span className="material-symbols-outlined text-white">terminal</span>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">TECHTREK</span>
          </div>
          
          <h2 className="text-2xl font-bold text-center mb-2">Welcome Back</h2>
          <p className="text-white/60 text-center mb-6">Sign in to continue your learning journey</p>
          
          {/* Login form */}
          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-white/70">Email</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/40">mail</span>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-white/70">Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/40">lock</span>
                <input 
                  type={isPasswordVisible ? "text" : "password"} 
                  id="password" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-10 placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="********"
                />
                <button 
                  type="button" 
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                >
                  <span className="material-symbols-outlined">
                    {isPasswordVisible ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input 
                  id="remember" 
                  type="checkbox" 
                  className="h-4 w-4 rounded border-white/20 bg-white/5 focus:ring-blue-500 focus:ring-offset-gray-900"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-white/70">Remember me</label>
              </div>
              
              <a href="#" className="text-sm font-medium text-blue-400 hover:text-blue-300 transition duration-200">
                Forgot password?
              </a>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-3 rounded-lg text-white font-medium shadow-lg shadow-blue-600/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-600/40"
            >
              Sign In
            </button>
          </form>
          
          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="px-4 text-sm text-white/40">OR</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>
          
          {/* Social login */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button className="flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg py-2.5 px-4 transition duration-200">
              <span className="material-symbols-outlined mr-2 text-white/70">public</span>
              <span className="text-sm font-medium">Google</span>
            </button>
            
            <button className="flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg py-2.5 px-4 transition duration-200">
              <span className="material-symbols-outlined mr-2 text-white/70">code</span>
              <span className="text-sm font-medium">GitHub</span>
            </button>
          </div>
          
          {/* Sign up link */}
          <p className="text-center text-sm text-white/60">
            Don't have an account?{" "}
            <Link to="/register" className="font-medium text-blue-400 hover:text-blue-300 transition duration-200">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,300..700,0..1,0..200');
        
        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background-color: #0B0E16;
          overflow-x: hidden;
        }
        
        .material-symbols-outlined {
          font-variation-settings:
            'FILL' 1,
            'wght' 400,
            'GRAD' 0,
            'opsz' 24;
        }
        
        /* Animated background elements */
        #background-elements div {
          animation: float 40s linear infinite;
        }
        
        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(30px, -50px) rotate(120deg);
          }
          66% {
            transform: translate(-30px, 50px) rotate(240deg);
          }
          100% {
            transform: translate(0, 0) rotate(360deg);
          }
        }
        
        /* Triangle shape */
        .triangle {
          width: 0 !important;
          height: 0 !important;
        }
      `}</style>
    </div>
  );
}