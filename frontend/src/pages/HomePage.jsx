import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function VibrantHomePage() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Career path categories
  const categories = [
    { id: 'frontend', label: 'Frontend', color: 'from-pink-500 to-purple-600' },
    { id: 'backend', label: 'Backend', color: 'from-cyan-500 to-blue-600' },
    { id: 'data', label: 'Data & AI', color: 'from-green-400 to-teal-500' },
    { id: 'devops', label: 'DevOps', color: 'from-orange-400 to-red-500' },
    { id: 'mobile', label: 'Mobile', color: 'from-purple-400 to-indigo-600' },
    { id: 'specialized', label: 'Specialized', color: 'from-yellow-400 to-amber-600' }
  ];
  
  // Career paths with vibrant icons and colors
  const careerPaths = {
    frontend: [
      { to: "/roadmap/frontend", name: "Frontend Developer", icon: "code", color: "pink" },
      { to: "/ux-design", name: "UX Design", icon: "palette", color: "fuchsia" }
    ],
    backend: [
      { to: "/roadmap/backend", name: "Backend Developer", icon: "terminal", color: "blue" },
      { to: "/fullstack", name: "Full Stack Developer", icon: "layers", color: "sky" },
      { to: "/postgresql", name: "PostgreSQL", icon: "storage", color: "cyan" }
    ],
    data: [
      { to: "/roadmap/ai-engineer", name: "AI Engineer", icon: "smart_toy", color: "emerald" },
      { to: "/data-analyst", name: "Data Analyst", icon: "analytics", color: "teal" },
      { to: "/ai-data-scientist", name: "AI & Data Scientist", icon: "psychology", color: "green" },
      { to: "/mlops", name: "MLOps", icon: "sync", color: "lime" }
    ],
    devops: [
      { to: "/devops", name: "DevOps", icon: "settings_suggest", color: "red" },
      { to: "/software-architect", name: "Software Architect", icon: "architecture", color: "rose" },
      { to: "/cyber-security", name: "Cyber Security", icon: "security", color: "orange" }
    ],
    mobile: [
      { to: "/ios", name: "iOS Developer", icon: "phone_iphone", color: "violet" },
      { to: "/android", name: "Android Developer", icon: "android", color: "purple" }
    ],
    specialized: [
      { to: "/blockchain", name: "Blockchain", icon: "link", color: "amber" },
      { to: "/game-developer", name: "Game Developer", icon: "sports_esports", color: "yellow" },
      { to: "/technical-writer", name: "Technical Writer", icon: "description", color: "lime" },
      { to: "/product-manager", name: "Product Manager", icon: "inventory_2", color: "indigo" },
      { to: "/qa", name: "QA Engineer", icon: "check_circle", color: "sky" },
      { to: "/engineering-manager", name: "Engineering Manager", icon: "groups", color: "fuchsia" },
      { to: "/developer-relations", name: "Developer Relations", icon: "campaign", color: "orange" }
    ]
  };
  
  // Color map for dynamic styling
  const colorMap = {
    pink: "bg-gradient-to-br from-pink-500 to-pink-600",
    fuchsia: "bg-gradient-to-br from-fuchsia-500 to-fuchsia-600",
    purple: "bg-gradient-to-br from-purple-500 to-purple-600",
    violet: "bg-gradient-to-br from-violet-500 to-violet-600",
    indigo: "bg-gradient-to-br from-indigo-500 to-indigo-600",
    blue: "bg-gradient-to-br from-blue-500 to-blue-600",
    sky: "bg-gradient-to-br from-sky-500 to-sky-600",
    cyan: "bg-gradient-to-br from-cyan-500 to-cyan-600",
    teal: "bg-gradient-to-br from-teal-500 to-teal-600",
    emerald: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    green: "bg-gradient-to-br from-green-500 to-green-600",
    lime: "bg-gradient-to-br from-lime-500 to-lime-600",
    yellow: "bg-gradient-to-br from-yellow-500 to-yellow-600",
    amber: "bg-gradient-to-br from-amber-500 to-amber-600",
    orange: "bg-gradient-to-br from-orange-500 to-orange-600",
    red: "bg-gradient-to-br from-red-500 to-red-600",
    rose: "bg-gradient-to-br from-rose-500 to-rose-600"
  };
  
  const shadowMap = {
    pink: "shadow-pink-500/30",
    fuchsia: "shadow-fuchsia-500/30",
    purple: "shadow-purple-500/30",
    violet: "shadow-violet-500/30",
    indigo: "shadow-indigo-500/30",
    blue: "shadow-blue-500/30",
    sky: "shadow-sky-500/30",
    cyan: "shadow-cyan-500/30",
    teal: "shadow-teal-500/30",
    emerald: "shadow-emerald-500/30",
    green: "shadow-green-500/30",
    lime: "shadow-lime-500/30",
    yellow: "shadow-yellow-500/30",
    amber: "shadow-amber-500/30",
    orange: "shadow-orange-500/30",
    red: "shadow-red-500/30",
    rose: "shadow-rose-500/30"
  };
  
  const textMap = {
    pink: "text-pink-500",
    fuchsia: "text-fuchsia-500",
    purple: "text-purple-500",
    violet: "text-violet-500",
    indigo: "text-indigo-500",
    blue: "text-blue-500",
    sky: "text-sky-500",
    cyan: "text-cyan-500",
    teal: "text-teal-500",
    emerald: "text-emerald-500",
    green: "text-green-500",
    lime: "text-lime-500",
    yellow: "text-yellow-500",
    amber: "text-amber-500",
    orange: "text-orange-500",
    red: "text-red-500",
    rose: "text-rose-500"
  };
  
  const borderMap = {
    pink: "border-pink-500/50",
    fuchsia: "border-fuchsia-500/50",
    purple: "border-purple-500/50",
    violet: "border-violet-500/50",
    indigo: "border-indigo-500/50",
    blue: "border-blue-500/50",
    sky: "border-sky-500/50",
    cyan: "border-cyan-500/50",
    teal: "border-teal-500/50",
    emerald: "border-emerald-500/50",
    green: "border-green-500/50",
    lime: "border-lime-500/50",
    yellow: "border-yellow-500/50",
    amber: "border-amber-500/50",
    orange: "border-orange-500/50",
    red: "border-red-500/50",
    rose: "border-rose-500/50"
  };
  
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
                        bg-gradient-to-br ${shape === 'triangle' ? '' : colorMap[colorClass].replace('bg-gradient-to-br', '')} 
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
    
    // Card hover effect
    const addCardEffects = () => {
      const cards = document.querySelectorAll('.tech-card');
      
      cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          card.classList.add('scale-105');
        });
        
        card.addEventListener('mouseleave', () => {
          card.classList.remove('scale-105');
        });
      });
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

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20 font-sans antialiased relative overflow-hidden">
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
      <div className="relative z-0">
        {/* Hero section with vibrant elements */}
        <section className="relative px-6 pt-16 pb-24 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-purple-600/20 blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-blue-600/20 blur-3xl"></div>
          
          <div className="max-w-7xl mx-auto text-center relative">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <span className="text-sm font-medium text-blue-300">Your path to tech excellence</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 leading-tight max-w-4xl mx-auto">
              Navigate Your Future in Technology
            </h2>
            
            <p className="max-w-2xl mx-auto text-white/70 text-lg mb-10">
              Discover structured roadmaps and resources built by industry experts to help you master in-demand tech skills and accelerate your career.
            </p>
            
           
            
            {/* Tech brands */}
            <div className="pt-8 border-t border-white/10">
              <p className="text-sm text-white/40 mb-6">TRUSTED BY PROFESSIONALS FROM</p>
              <div className="flex flex-wrap justify-center gap-8 opacity-60">
                <div className="h-8">Google</div>
                <div className="h-8">Microsoft</div>
                <div className="h-8">Amazon</div>
                <div className="h-8">Meta</div>
                <div className="h-8">Apple</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Categories filter with vibrant indicators */}
        <section className="px-6 py-8 bg-black/30 backdrop-blur-sm border-y border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeCategory === null
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white'
                }`}
              >
                All Paths
              </button>
              
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg ${category.id === 'frontend' ? 'shadow-pink-500/30' : category.id === 'backend' ? 'shadow-blue-500/30' : category.id === 'data' ? 'shadow-green-500/30' : category.id === 'devops' ? 'shadow-orange-500/30' : category.id === 'mobile' ? 'shadow-purple-500/30' : 'shadow-yellow-500/30'}`
                      : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </section>
        
        {/* Career paths with vibrant cards */}
        <section className="px-6 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {(!activeCategory ? Object.values(careerPaths).flat() : careerPaths[activeCategory]).map((path, index) => (
                <Link
                  to={path.to}
                  key={path.to}
                  className={`tech-card group relative flex flex-col p-6 bg-white/5 backdrop-blur-sm rounded-xl border ${borderMap[path.color]} transition-all duration-500 hover:bg-white/10 hover:border-${path.color}-500`}
                >
                  <div className={`w-12 h-12 mb-4 ${colorMap[path.color]} rounded-lg flex items-center justify-center ${shadowMap[path.color]}`}>
                    <span className="material-symbols-outlined text-white">{path.icon}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-white">{path.name}</h3>
                  
                  <p className="text-white/60 text-sm mb-4 flex-grow">
                    Master the skills and technologies needed to excel as a {path.name}.
                  </p>
                  
                  <div className="flex items-center text-sm font-medium">
                    <span className={`${textMap[path.color]}`}>Explore roadmap</span>
                    <span className={`material-symbols-outlined ml-1 ${textMap[path.color]} transition-transform duration-300 group-hover:translate-x-1`}>arrow_forward</span>
                  </div>
                  
                  {/* Background glow effect on hover */}
                  <div className={`absolute -z-10 inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-${path.color}-500/5 to-transparent rounded-xl blur-xl transition-opacity duration-500`}></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Features section with glassmorphism cards */}
        <section className="px-6 py-16 bg-gradient-to-b from-black/0 to-black/40">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose TECHTREK?</h2>
              <p className="text-white/70 max-w-2xl mx-auto">Our platform provides everything you need to navigate your tech career with confidence.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: "auto_awesome", title: "Industry-Validated Roadmaps", description: "Career paths designed by experts working at top tech companies" },
                { icon: "update", title: "Always Up-to-Date", description: "Content regularly updated to reflect the latest industry standards and technologies" },
                { icon: "diversity_3", title: "Community-Driven", description: "Benefit from the collective knowledge of thousands of tech professionals" }
              ].map((feature, index) => (
                <div key={index} className="p-6 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 mb-5">
                    <span className="material-symbols-outlined text-white">{feature.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-white/70">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Newsletter section with gradient */}
        <section className="px-6 py-16">
          <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-md border border-white/10">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
              <p className="text-white/70 mb-6">Get the latest roadmaps and tech career insights delivered to your inbox</p>
              
              <div className="flex flex-col sm:flex-row gap-3 mx-auto max-w-md">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-grow px-4 py-3 bg-black/30 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-3 rounded-lg font-medium shadow-lg shadow-blue-500/20 transition-all duration-300 hover:shadow-purple-500/30">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer with glassmorphism */}
        <footer className="px-6 py-12 bg-black/60 backdrop-blur-md border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-6 md:mb-0">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-2">
                  <span className="material-symbols-outlined text-white text-sm">terminal</span>
                </div>
                <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">TECHTREK</span>
              </div>
              
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                <a href="#" className="text-sm text-white/70 hover:text-white transition-colors duration-200">About</a>
                <a href="#" className="text-sm text-white/70 hover:text-white transition-colors duration-200">Roadmaps</a>
                <a href="#" className="text-sm text-white/70 hover:text-white transition-colors duration-200">Resources</a>
                <a href="#" className="text-sm text-white/70 hover:text-white transition-colors duration-200">Community</a>
                <a href="#" className="text-sm text-white/70 hover:text-white transition-colors duration-200">Contact</a>
              </div>
              
              <div className="flex space-x-4 mt-6 md:mt-0">
                <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-200">
                  <span className="material-symbols-outlined text-sm">public</span>
                </a>
                <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-200">
                  <span className="material-symbols-outlined text-sm">code</span>
                </a>
                <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-200">
                  <span className="material-symbols-outlined text-sm">forum</span>
                </a>
              </div>
            </div>
            
            <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-white/50">
                © {new Date().getFullYear()} TECHTREK Developer Roadmaps. All rights reserved.
              </p>
              
              <div className="flex mt-4 md:mt-0 space-x-6">
                <a href="#" className="text-sm text-white/50 hover:text-white/80 transition-colors duration-200">Privacy Policy</a>
                <a href="#" className="text-sm text-white/50 hover:text-white/80 transition-colors duration-200">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
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