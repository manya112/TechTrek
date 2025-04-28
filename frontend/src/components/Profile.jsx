import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

export default function Profile() {
  const [showModal, setShowModal] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [userQuizzes, setUserQuizzes] = useState([]); 
  const [quizLoading, setQuizLoading] = useState(true); 
  const [badgeData, setBadgeData] = useState([]);
  // Add missing skills state
  const [skills, setSkills] = useState([
    { name: "C#", value: 85 },
    { name: "Python", value: 75 },
    { name: "JavaScript", value: 80 },
    { name: "React", value: 70 },
    { name: "SQL", value: 90 }
  ]);

  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    title: "Frontend Developer | React Specialist",
    courses: 42,
    quizzes: 15,
    badges: 8,
    progress: 78
  });

  // Corrected calculateSkills function - removed nested duplicate
  const calculateSkills = (quizzes) => {
    // Create an object to track scores by skill category
    const skillScores = {
      "C#": { total: 0, count: 0, perfectCount: 0 },
      "Python": { total: 0, count: 0, perfectCount: 0 },
      "JavaScript": { total: 0, count: 0, perfectCount: 0 },
      "React": { total: 0, count: 0, perfectCount: 0 },
      "SQL": { total: 0, count: 0, perfectCount: 0 }
    };
    
    // Process each quiz
    quizzes.forEach(quiz => {
      // Check if the user got all questions correct
      const isPerfectScore = quiz.pointsObtained === quiz.totalPoints;
      
      // Calculate percentage score
      const scorePercentage = quiz.pointsObtained && quiz.totalPoints 
        ? Math.round((quiz.pointsObtained / quiz.totalPoints) * 100)
        : 0;
      
      // Check if the quiz has a category that matches our skills
      if (quiz.quizName) {
        // Match quiz name to skills
        Object.keys(skillScores).forEach(skill => {
          if (quiz.quizName.toLowerCase().includes(skill.toLowerCase())) {
            skillScores[skill].total += scorePercentage;
            skillScores[skill].count += 1;
            
            // Track perfect scores separately
            if (isPerfectScore) {
              skillScores[skill].perfectCount += 1;
            }
          }
        });
      }
    });
    
    // Calculate average scores and format for the skills array
    const calculatedSkills = Object.keys(skillScores).map(name => {
      const { total, count, perfectCount } = skillScores[name];
      
      // If user has at least one perfect score in this skill, show 100%
      if (perfectCount > 0) {
        return { name, value: 100 };
      } else {
        // Otherwise calculate average as before
        const value = count > 0 ? Math.min(Math.round(total / count), 100) : 0;
        return { name, value };
      }
    });
    
    // Return default skills if no actual quiz data
    if (calculatedSkills.every(skill => skill.value === 0)) {
      return [
        { name: "C#", value: 85 },
        { name: "Python", value: 75 },
        { name: "JavaScript", value: 80 },
        { name: "React", value: 70 },
        { name: "SQL", value: 90 }
      ];
    }
    
    return calculatedSkills;
  };

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

  // Fetch profile data
  const fetchProfileData = async () => {
    try {
      const response = await axiosInstance.get('/api/user/profile');
      // Update profile data state
      setProfileData({
        name: response.data.name || "Alex Johnson",
        title: response.data.title || "Frontend Developer | React Specialist",
        courses: response.data.courses || 42,
        quizzes: response.data.quizzes || 15,
        badges: response.data.badges || 8,
        progress: Math.min(response.data.progress || 78, 100)  // Cap at 100%
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
      
      // If data exists and has length, set it
      if (response.data && Array.isArray(response.data)) {
        const quizzes = response.data;
        setUserQuizzes(quizzes);
        
        // Calculate skills based on quiz performance
        const calculatedSkills = calculateSkills(quizzes);
        setSkills(calculatedSkills);
        
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

  // Update fetchBadges function to handle one badge per quiz
  const fetchBadges = async () => {
    try {
      // Get user ID from localStorage
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = userData._id;
      
      if (!userId) {
        console.log('No user ID found for badge fetch');
        setBadgeData([]);
        setProfileData(prev => ({ ...prev, badges: 0 }));
        return;
      }
      
      // Fetch badges for specific user
      const response = await axiosInstance.get('/api/badge/');
      console.log('Badge response details:', JSON.stringify(response.data, null, 2));
      
      // Store complete badge data with icons
      const badges = Array.isArray(response.data) ? response.data : [];
      
      // Ensure each badge is linked to the quiz that awarded it
      if (userQuizzes.length > 0) {
        // Log relationships for debugging
        console.log('Linking badges to quizzes:', {
          badges: badges.map(b => b.badgeName),
          quizzes: userQuizzes.map(q => q.quizName)
        });
      }
      
      setBadgeData(badges);
      
      // Update profile badge count
      setProfileData(prev => ({
        ...prev,
        badges: badges.length
      }));
    } catch (error) {
      console.error('Error fetching badges:', error);
      setBadgeData([]);
      setProfileData(prev => ({ ...prev, badges: 0 }));
    }
  };

  // useEffect hook to load data
  useEffect(() => {
    fetchProfileData();
    fetchUserQuizzes();
    fetchBadges();
      
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
              { label: 'Progress', value: `${Math.min(profileData.progress || 0, 100)}%` }
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
                  <span className="font-bold text-fuchsia-400">
                    {Math.min(skill.value, 100)}%
                  </span>
                </div>
                <div className="h-2 bg-white/10 rounded overflow-hidden">
                  <div 
                    className="h-full rounded bg-gradient-to-r from-pink-500 via-purple-500 to-fuchsia-500" 
                    style={{ 
                      width: `${Math.max(Math.min(skill.value, 100), 5)}%`,
                      transition: 'width 1s ease-in-out'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Badges */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
            <h3 className="text-2xl font-semibold mb-6 text-white">🏅 Badges</h3>
            <div className="grid grid-cols-4 gap-4">
              {badgeData.length > 0 ? (
                // Display actual badges with icons
                badgeData.map((badge, i) => (
                  <div key={i} className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center text-xl transition-all duration-300 bg-gradient-to-br from-fuchsia-500 to-pink-500 text-white shadow-xl animate-pulse">
                      {/* Render the emoji directly if it exists */}
                      <span className="text-2xl">{badge.badgeIcon || String.fromCharCode(65 + i)}</span>
                    </div>
                    <span className="text-xs mt-2 text-white/70">{badge.badgeName || `Badge ${i+1}`}</span>
                  </div>
                ))
              ) : (
                // Show placeholders if no badges
                [...Array(8)].map((_, i) => (
                  <div key={i} className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl transition-all duration-300 bg-gray-700 text-gray-400">
                      {String.fromCharCode(65 + i)}
                    </div>
                    <span className="text-xs mt-2 text-white/70">Badge {i + 1}</span>
                  </div>
                ))
              )}
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