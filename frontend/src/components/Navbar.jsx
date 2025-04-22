import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

export default function Navbar() {
  const [activeItem, setActiveItem] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check for token when component mounts and when it changes
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };
    
    // Check initial login status
    checkLoginStatus();
    
    // Add event listener for storage changes (in case token is modified in another tab)
    window.addEventListener('storage', checkLoginStatus);
    
    // Add custom event listener for login/logout events within the same session
    window.addEventListener('auth-changed', checkLoginStatus);
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('auth-changed', checkLoginStatus);
    };
  }, []);

  const animateLetters = (containerId) => {
    const letters = document.querySelectorAll(`#${containerId} .nav-letter`);
    letters.forEach((letter, index) => {
      letter.style.opacity = '0';
      letter.style.transform = 'translateY(10px)';

      setTimeout(() => {
        letter.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        letter.style.opacity = '1';
        letter.style.transform = 'translateY(0)';
      }, 50 + index * 40);
    });
  };

  const handleHover = (id) => {
    setActiveItem(id);
    animateLetters(id);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);

    window.dispatchEvent(new Event('auth-changed'));
    
    navigate('/login');
  };

  useEffect(() => {
    const navbarContainer = document.querySelector('.navbar-container');
    if (!navbarContainer) return;

    const existingElements = document.querySelectorAll('.bg-element');
    existingElements.forEach((el) => el.remove());

    const shapes = ['circle', 'square'];
    const colors = ['blue', 'purple', 'pink'];
    for (let i = 0; i < 10; i++) {
      const el = document.createElement('div');
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const colorClass = colors[Math.floor(Math.random() * colors.length)];

      el.className = `absolute ${shape === 'circle' ? 'rounded-full' : 'rounded-md rotate-45'} 
                      bg-gradient-to-br from-${colorClass}-500/20 to-${colorClass}-600/20 opacity-20 blur-sm bg-element`;

      const size = Math.random() * 50 + 30;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.left = `${Math.random() * 100}%`;
      el.style.top = `${Math.random() * 100}%`;
      el.style.animationDuration = `${Math.random() * 30 + 20}s`;
      el.style.animationDelay = `${Math.random() * 5}s`;

      navbarContainer.appendChild(el);
    }

    // Get all available nav items based on login status
    const navItems = isLoggedIn 
      ? ['start-here', 'notepad', 'quiz', 'profile', 'logout'] 
      : ['start-here', 'login', 'signup'];

    setTimeout(() => {
      navItems.forEach((id) => {
        animateLetters(id);
      });
    }, 500);

    return () => {
      const container = document.querySelector('.navbar-container');
      if (container) {
        const elements = container.querySelectorAll('.bg-element');
        elements.forEach((el) => el.remove());
      }
    };
  }, [isLoggedIn]);

  useEffect(() => {
    const path = location.pathname === '/' ? 'start-here' : location.pathname.slice(1);
    setActiveItem(path);
  }, [location]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) {
      // Get all available nav items based on login status
      const navItems = isLoggedIn 
        ? ['start-here', 'notepad', 'quiz', 'profile', 'logout'] 
        : ['start-here', 'login', 'signup'];
        
      setTimeout(() => {
        navItems.forEach((id) => {
          animateLetters(id);
        });
      }, 300);
    }
  };

  const renderNavLink = (id, text, path, onClick = null) => {
    if (id === 'logout') {
      return (
        <div
          id={id}
          className="nav-item cursor-pointer"
          onMouseEnter={() => handleHover(id)}
          onClick={() => {
            handleLogout();
            setActiveItem(id);
          }}
        >
          <div className="flex">
            {text.split('').map((char, idx) => (
              <div
                key={idx}
                className={`nav-letter text-white/80 font-medium text-xs transition-colors duration-200 hover:text-white`}
                data-char={char}
              >
                {char}
              </div>
            ))}
          </div>
          <div className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 mt-1 transition-all duration-300 w-0"></div>
        </div>
      );
    }
    
    return (
      <Link
        to={path}
        id={id}
        className="nav-item cursor-pointer"
        onMouseEnter={() => handleHover(id)}
        onClick={() => {
          if (onClick) onClick();
          setActiveItem(id);
        }}
      >
        <div className="flex">
          {text.split('').map((char, idx) => (
            <div
              key={idx}
              className={`nav-letter text-white/80 font-medium text-xs transition-colors duration-200 ${
                activeItem === id ? 'text-white' : 'hover:text-white'
              }`}
              data-char={char}
            >
              {char}
            </div>
          ))}
        </div>
        <div
          className={`h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 mt-1 transition-all duration-300 ${
            activeItem === id ? 'w-full' : 'w-0'
          }`}
        ></div>
      </Link>
    );
  };

  return (
    <div className="navbar-container fixed w-full top-0 bg-black/30 backdrop-blur-md border-b border-white/10 z-20 overflow-hidden h-[88px] md:h-[88px]">
      <div className="fixed inset-0 z-0"></div>

      <div className="relative z-10 px-4 py-2 h-full">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-full">
          <Link to="/" className="flex items-center group">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-2 shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300 rotate-3 group-hover:rotate-6">
              <span className="material-symbols-outlined text-white text-base">terminal</span>
            </div>
            <div id="logo" className="flex">
              {['T', 'E', 'C', 'H', 'T', 'R', 'E', 'K'].map((char, index) => (
                <div
                  key={index}
                  className="nav-letter text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
                  data-char={char}
                >
                  {char}
                </div>
              ))}
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-5">
            {renderNavLink('start-here', 'START HERE', '/')}
            
            {isLoggedIn ? (
              <>
                {renderNavLink('notepad', 'NOTES', '/notepad')}
                {renderNavLink('quiz', 'QUIZ', '/quiz')}
                {renderNavLink('profile', 'PROFILE', '/profile')}
                {renderNavLink('logout', 'LOGOUT', '#', handleLogout)}
              </>
            ) : (
              <>
                {renderNavLink('login', 'LOG IN', '/login')}
                {renderNavLink('signup', 'SIGN UP', '/signup')}
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white border-2 border-white/20 p-1 rounded-lg hover:bg-white/10 transition-all duration-200"
            onClick={toggleMenu}
          >
            <span className="material-symbols-outlined text-base">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden bg-black/80 backdrop-blur-md border-t border-white/10 ${
            menuOpen ? 'max-h-60' : 'max-h-0'
          }`}
        >
          <Link
            to="/"
            id="start-here-mobile"
            className="nav-item block py-1.5 px-4 border-b border-white/10"
            onClick={() => {
              handleHover('start-here');
              setMenuOpen(false);
              setActiveItem('start-here');
            }}
          >
            <div className="flex">
              {['S','T','A','R','T',' ','H','E','R','E'].map((char, idx) => (
                <div
                  key={idx}
                  className={`nav-letter text-white/80 font-medium text-xs ${
                    activeItem === 'start-here' ? 'text-white' : 'hover:text-white'
                  }`}
                  data-char={char}
                >
                  {char}
                </div>
              ))}
            </div>
          </Link>
          
          {isLoggedIn ? (
            <>
              <Link
                to="/notepad"
                id="notepad-mobile"
                className="nav-item block py-1.5 px-4 border-b border-white/10"
                onClick={() => {
                  handleHover('notepad');
                  setMenuOpen(false);
                  setActiveItem('notepad');
                }}
              >
                <div className="flex">
                  {['N','O','T','E','S'].map((char, idx) => (
                    <div
                      key={idx}
                      className={`nav-letter text-white/80 font-medium text-xs ${
                        activeItem === 'notepad' ? 'text-white' : 'hover:text-white'
                      }`}
                      data-char={char}
                    >
                      {char}
                    </div>
                  ))}
                </div>
              </Link>
              
              <Link
                to="/quiz"
                id="quiz-mobile"
                className="nav-item block py-1.5 px-4 border-b border-white/10"
                onClick={() => {
                  handleHover('quiz');
                  setMenuOpen(false);
                  setActiveItem('quiz');
                }}
              >
                <div className="flex">
                  {['Q','U','I','Z'].map((char, idx) => (
                    <div
                      key={idx}
                      className={`nav-letter text-white/80 font-medium text-xs ${
                        activeItem === 'quiz' ? 'text-white' : 'hover:text-white'
                      }`}
                      data-char={char}
                    >
                      {char}
                    </div>
                  ))}
                </div>
              </Link>
              
              <Link
                to="/profile"
                id="profile-mobile"
                className="nav-item block py-1.5 px-4 border-b border-white/10"
                onClick={() => {
                  handleHover('profile');
                  setMenuOpen(false);
                  setActiveItem('profile');
                }}
              >
                <div className="flex">
                  {['P','R','O','F','I','L','E'].map((char, idx) => (
                    <div
                      key={idx}
                      className={`nav-letter text-white/80 font-medium text-xs ${
                        activeItem === 'profile' ? 'text-white' : 'hover:text-white'
                      }`}
                      data-char={char}
                    >
                      {char}
                    </div>
                  ))}
                </div>
              </Link>
              
              <div
                id="logout-mobile"
                className="nav-item block py-1.5 px-4 border-b border-white/10 cursor-pointer"
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
              >
                <div className="flex">
                  {['L','O','G','O','U','T'].map((char, idx) => (
                    <div
                      key={idx}
                      className="nav-letter text-white/80 font-medium text-xs hover:text-white"
                      data-char={char}
                    >
                      {char}
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                id="login-mobile"
                className="nav-item block py-1.5 px-4 border-b border-white/10"
                onClick={() => {
                  handleHover('login');
                  setMenuOpen(false);
                  setActiveItem('login');
                }}
              >
                <div className="flex">
                  {['L','O','G',' ','I','N'].map((char, idx) => (
                    <div
                      key={idx}
                      className={`nav-letter text-white/80 font-medium text-xs ${
                        activeItem === 'login' ? 'text-white' : 'hover:text-white'
                      }`}
                      data-char={char}
                    >
                      {char}
                    </div>
                  ))}
                </div>
              </Link>
              
              <Link
                to="/signup"
                id="signup-mobile"
                className="nav-item block py-1.5 px-4 border-b border-white/10"
                onClick={() => {
                  handleHover('signup');
                  setMenuOpen(false);
                  setActiveItem('signup');
                }}
              >
                <div className="flex">
                  {['S','I','G','N',' ','U','P'].map((char, idx) => (
                    <div
                      key={idx}
                      className={`nav-letter text-white/80 font-medium text-xs ${
                        activeItem === 'signup' ? 'text-white' : 'hover:text-white'
                      }`}
                      data-char={char}
                    >
                      {char}
                    </div>
                  ))}
                </div>
              </Link>
            </>
          )}
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,300..700,0..1,0..200');

        .navbar-container {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .material-symbols-outlined {
          font-variation-settings:
            'FILL' 1,
            'wght' 400,
            'GRAD' 0,
            'opsz' 24;
        }

        .nav-letter {
          display: inline-block;
          margin: 0 1px;
          transition: all 0.3s;
        }

        .bg-element {
          animation: float 30s linear infinite;
        }

        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(20px, -30px) rotate(120deg);
          }
          66% {
            transform: translate(-20px, 30px) rotate(240deg);
          }
          100% {
            transform: translate(0, 0) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}