import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

export default function Profile() {
  const [showModal, setShowModal] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [userQuizzes, setUserQuizzes] = useState([]);
  const [quizLoading, setQuizLoading] = useState(true);

  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    title: "Frontend Developer | React Specialist",
    courses: 42,
    quizzes: 15,
    badges: 8,
    progress: 78
  });

  const [skills] = useState([
    { name: "HTML", value: 92 },
    { name: "CSS", value: 85 },
    { name: "JavaScript", value: 78 },
    { name: "React", value: 81 }
  ]);

  const toggleModal = () => setShowModal(!showModal);

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setProfileData({
      ...profileData,
      name: formData.get('name'),
      title: formData.get('title')
    });
    toggleModal();
  };

  // Basic GET request
  const fetchProfileData = async () => {
    try {
      const response = await axiosInstance.get('/api/user/profile');
      console.log('Profile data:', response.data);
      
      // Update profile data state
      setProfileData({
        name: response.data.name || "Alex Johnson",
        title: response.data.title || "Frontend Developer | React Specialist",
        courses: response.data.courses || 42,
        quizzes: response.data.quizzes || 15,
        badges: response.data.badges || 8,
        progress: response.data.progress || 78
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
 // Fetch user's attempted quizzes
const fetchUserQuizzes = async () => {
  try {
    setQuizLoading(true);
    // Get user ID from localStorage if available
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = userData._id;
    
    if (!userId) {
      console.log('No user ID found, showing empty quiz data');
      setUserQuizzes([]);
      setProfileData(prev => ({
        ...prev,
        quizzes: 0
      }));
      return;
    }
    
    // Updated endpoint path to match your API structure
    const response = await axiosInstance.get('/api/quiz/');
    console.log('User quizzes:', response.data);
    
    // If data exists and has length, set it
    if (response.data && Array.isArray(response.data)) {
      setUserQuizzes(response.data);
      // Update the quiz count in profile data
      setProfileData(prev => ({
        ...prev,
        quizzes: response.data.length
      }));
    } else {
      // If no quizzes or invalid data, set empty array and 0 count
      setUserQuizzes([]);
      setProfileData(prev => ({
        ...prev,
        quizzes: 0
      }));
    }
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    setUserQuizzes([]);
    setProfileData(prev => ({
      ...prev,
      quizzes: 0
    }));
  } finally {
    setQuizLoading(false);
  }
};
  useEffect(() => {
    // Fetch profile data when component mounts
    fetchProfileData();
    fetchUserQuizzes();
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const createGlowElements = () => {
      const container = document.getElementById('background-elements');
      if (!container) return;

      const colors = ['from-pink-500', 'from-purple-500', 'from-cyan-500', 'from-indigo-500'];
      for (let i = 0; i < 10; i++) {
        const div = document.createElement('div');
        div.className = `absolute rounded-full bg-gradient-to-br ${colors[i % colors.length]} to-transparent opacity-20 blur-2xl`;
        const size = Math.random() * 120 + 80;
        div.style.width = `${size}px`;
        div.style.height = `${size}px`;
        div.style.left = `${Math.random() * 100}%`;
        div.style.top = `${Math.random() * 100}%`;
        div.style.animation = `float ${30 + Math.random() * 40}s ease-in-out infinite`;
        container.appendChild(div);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    createGlowElements();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      const container = document.getElementById('background-elements');
      if (container) container.innerHTML = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans antialiased relative overflow-hidden">
      {/* Mouse Follower */}
      <div 
        className="fixed w-32 h-32 rounded-full bg-fuchsia-500/20 blur-3xl pointer-events-none z-0"
        style={{
          left: `${mousePosition.x - 64}px`,
          top: `${mousePosition.y - 64}px`,
          transition: 'transform 0.1s ease-out'
        }}
      />

      {/* Glowing Background */}
      <div id="background-elements" className="fixed inset-0 z-0 overflow-hidden"></div>
      <div className="fixed inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80 z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 mt-9">
        {/* Profile Card */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-10 rounded-2xl shadow-xl relative mb-12 transition-all duration-300 hover:shadow-purple-500/30">
          <button 
            onClick={toggleModal}
            className="absolute top-4 right-4 px-4 py-2 border border-fuchsia-400 text-fuchsia-400 font-medium rounded hover:bg-fuchsia-600/10 transition-all"
          >
            Edit Profile
          </button>
          <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-500 to-fuchsia-500 mb-2">
            {profileData.name}
          </h1>
          <p className="text-xl italic text-white/70 mb-6">{profileData.title}</p>

          <div className="flex flex-wrap gap-5">
            {[
              { label: 'Courses', value: profileData.courses },
              { label: 'Quizzes', value: profileData.quizzes },
              { label: 'Badges', value: profileData.badges },
              { label: 'Progress', value: `${profileData.progress}%` }
            ].map((item, idx) => (
              <div key={idx} className="px-6 py-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg text-center">
                <div className="text-2xl font-bold text-white">{item.value}</div>
                <div className="text-sm text-white/80">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance and Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Performance */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
            <h3 className="text-2xl font-semibold mb-6 text-white">💡 Performance</h3>
            {skills.map((skill, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>{skill.name}</span>
                  <span className="font-bold text-fuchsia-400">{skill.value}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded">
                  <div className="h-full rounded bg-gradient-to-r from-pink-500 via-purple-500 to-fuchsia-500" style={{ width: `${skill.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Badges */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
            <h3 className="text-2xl font-semibold mb-6 text-white">🏅 Badges</h3>
            <div className="grid grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl transition-all duration-300 ${
                    i < profileData.badges
                      ? 'bg-gradient-to-br from-fuchsia-500 to-pink-500 text-white shadow-xl animate-pulse'
                      : 'bg-gray-700 text-gray-400'
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </div>
                  <span className="text-xs mt-2 text-white/70">Badge {i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* Edit Profile Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
            <div className="w-full max-w-md bg-black/70 backdrop-blur-md p-8 border border-white/20 rounded-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">Edit Profile</h3>
                <button onClick={toggleModal} className="text-2xl text-white">&times;</button>
              </div>
              <form onSubmit={handleSave}>
                <div className="mb-4">
                  <label className="block text-white/70 mb-1">Name</label>
                  <input
                    name="name"
                    defaultValue={profileData.name}
                    className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded text-white focus:outline-none"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-white/70 mb-1">Title</label>
                  <input
                    name="title"
                    defaultValue={profileData.title}
                    className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded text-white focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded hover:shadow-lg"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Extra Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap');
        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(30px, -30px) rotate(180deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
      `}</style>
    </div>
    
  );
}
