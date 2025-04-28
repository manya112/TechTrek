import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const Signup = () => {
  const navigate = useNavigate(); // Move inside the component
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    // lastName: '',
    email: '',
    password: '',
    // confirmPassword: ''
  });

  useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });

    const createFloatingShapes = () => {
      const container = document.getElementById('background-elements');
      if (!container) return;
      const shapes = ['circle', 'square', 'triangle'];
      const colors = ['pink', 'purple', 'blue', 'cyan', 'green', 'amber'];

      for (let i = 0; i < 15; i++) {
        const el = document.createElement('div');
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];

        el.className = `absolute ${shape === 'circle' ? 'rounded-full' : shape === 'square' ? 'rounded-md rotate-45' : 'triangle'}
                        ${shape !== 'triangle' ? getColorGradient(color) : ''} opacity-20 blur-sm`;

        const size = Math.random() * 100 + 50;
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.left = `${Math.random() * 100}%`;
        el.style.top = `${Math.random() * 100}%`;
        el.style.animationDuration = `${Math.random() * 50 + 30}s`;

        if (shape === 'triangle') {
          el.style.backgroundColor = 'transparent';
          el.style.borderLeft = `${size / 2}px solid transparent`;
          el.style.borderRight = `${size / 2}px solid transparent`;
          el.style.borderBottom = `${size}px solid rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.2)`;
          el.style.width = '0';
          el.style.height = '0';
        }

        container.appendChild(el);
      }
    };

    const getColorGradient = (color) => {
      const map = {
        pink: "bg-gradient-to-br from-pink-500 to-pink-600",
        purple: "bg-gradient-to-br from-purple-500 to-purple-600",
        blue: "bg-gradient-to-br from-blue-500 to-blue-600",
        cyan: "bg-gradient-to-br from-cyan-500 to-cyan-600",
        green: "bg-gradient-to-br from-green-500 to-green-600",
        amber: "bg-gradient-to-br from-amber-500 to-amber-600"
      };
      return map[color] || map.blue;
    };

    document.addEventListener('mousemove', handleMouseMove);
    createFloatingShapes();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      const container = document.getElementById('background-elements');
      if (container) container.innerHTML = '';
    };
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  
    try {
      const response = await axiosInstance.post('/api/auth/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      navigate('/login'); // Redirect to login page after successful signup
      console.log("Signup successful:", response.data);
      alert("Signup Successfull"); // Should say "Signup successful!" if all goes well
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed: " + (error.response?.data || error.message));
    }
  };
  
  

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden flex items-center justify-center">
      <div 
        className="fixed w-32 h-32 rounded-full bg-purple-500/20 blur-xl pointer-events-none z-0"
        style={{
          left: `${mousePosition.x - 64}px`,
          top: `${mousePosition.y - 64}px`,
          transition: 'transform 0.1s ease-out'
        }}
      ></div>
      <div id="background-elements" className="fixed inset-0 z-0 overflow-hidden"></div>
      <div className="fixed inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70 z-0"></div>

      <div className="relative z-10 w-full max-w-lg p-8">
        <div className="signup-card bg-black/40 backdrop-blur-lg rounded-2xl border border-white/10 shadow-lg p-8">
          <div className="flex items-center justify-center mb-8">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mr-2">
              <span className="material-symbols-outlined text-white">edit</span>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500">TECHTREK SIGNUP</span>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="">
              <input
                type="text"
                name="name"
                placeholder="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-white/5 w-full border border-white/10 rounded-lg py-3 px-4 placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              {/* <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="bg-white/5 border border-white/10 rounded-lg py-3 px-4 placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-pink-500"
              /> */}
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 pr-12 placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-white/50"
              >
                <span className="material-symbols-outlined">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </span>
            </div>

            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 pr-12 placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <span
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-white/50"
              >
                <span className="material-symbols-outlined">
                  {showConfirm ? "visibility_off" : "visibility"}
                </span>
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 py-3 rounded-lg text-white font-medium transition duration-300"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm text-white/60 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-pink-400 hover:text-pink-300">Sign In</Link>
          </p>
        </div>
      </div>

      <style jsx="true" global>{`
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

        #background-elements div {
          animation: float 40s linear infinite;
        }

        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -50px) rotate(120deg); }
          66% { transform: translate(-30px, 50px) rotate(240deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }

        .triangle {
          width: 0 !important;
          height: 0 !important;
        }
      `}</style>
    </div>
  );
};

export default Signup;
