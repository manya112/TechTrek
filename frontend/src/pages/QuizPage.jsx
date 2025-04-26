import { useState, useEffect } from 'react';
import {quizData} from '../constants.js'; // Import quiz data
import axios from 'axios';
// Career path categories
const categories = [
  { id: 'all', label: 'All Quizzes', color: 'from-blue-500 to-purple-600' },
  { id: 'language', label: 'Languages', color: 'from-pink-500 to-purple-600' },
  { id: 'framework', label: 'Frameworks', color: 'from-cyan-500 to-blue-600' },
  { id: 'mixed', label: 'Mixed Challenges', color: 'from-green-400 to-teal-500' }
];

export default function QuizPage() {
  // State to track current quiz and question
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [showQuizSelection, setShowQuizSelection] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for tracking API request
  const [submitStatus, setSubmitStatus] = useState(null); // New state for tracking API response status

  const currentQuiz = quizData[currentQuizIndex];
  const currentQuestion = currentQuiz?.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === currentQuiz?.questions.length - 1;
  
  // For demo purposes, hard-coded userId
  // In a real application, this would come from auth system
  const userId = "user123"; 

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
      
      for (let i = 0; i < 10; i++) {
        const el = document.createElement('div');
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const colorClass = colors[Math.floor(Math.random() * colors.length)];
        
        el.className = `absolute ${shape === 'circle' ? 'rounded-full' : shape === 'square' ? 'rounded-md rotate-45' : 'triangle'} 
                        opacity-10 blur-sm`;
        
        // Size between 50px and 150px
        const size = Math.random() * 100 + 50;
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
        
        // Add color based on the shape
        if (shape === 'triangle') {
          el.style.backgroundColor = 'transparent';
          el.style.borderLeft = `${size/2}px solid transparent`;
          el.style.borderRight = `${size/2}px solid transparent`;
          el.style.borderBottom = `${size}px solid rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.1)`;
          el.style.width = '0';
          el.style.height = '0';
        } else {
          el.style.background = `linear-gradient(to bottom right, rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.1), rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.1))`;
        }
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    createFlowingElements();
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      const container = document.getElementById('background-elements');
      if (container) container.innerHTML = '';
    };
  }, []);

  const handleSelectQuiz = (index) => {
    setCurrentQuizIndex(index);
    setShowQuizSelection(false);
    resetQuiz();
  };

  const handleSelectAnswer = (answerIndex) => {
    if (!showExplanation) {
      setSelectedAnswer(answerIndex);
    }
  };
  
  const handleNextQuestion = () => {
    // Check if answer is correct and update score
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    
    if (showExplanation) {
      // Move to next question or end quiz if we're on the last question
      if (isLastQuestion) {
        finishQuiz();
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      }
    } else {
      // Show explanation first
      setShowExplanation(true);
    }
  };

  const finishQuiz = async () => {
    // FIX 1: Properly calculate the final score
    // The score state already contains all the correct answers from previous questions
    // We need to check if the last answer is correct and include it in the final score
    // No need to add it again if already counted in handleNextQuestion
    const finalScore = score;
    
    const passThreshold = currentQuiz.questions.length * 0.6; // 60% to pass
    
    if (finalScore >= passThreshold) {
      // Award badge
      const earnedBadge = currentQuiz.badge;
      if (!earnedBadges.some(badge => badge.id === earnedBadge.id)) {
        setEarnedBadges([...earnedBadges, earnedBadge]);
      }
    }
    
    // Prepare data to send to the backend
    const quizResultData = {
      userId: userId,
      quizName: currentQuiz.title,
      quizDescription: currentQuiz.description,
      quizIcon: currentQuiz.icon,
      totalPoints: currentQuiz.questions.length,
      pointsObtained: finalScore,
      timestamp: new Date().toISOString()
    };
    
    // Set submitting state to true (can be used to show a loading indicator)
    setIsSubmitting(true);
    
    try {
      console.log("Submitting quiz result:", quizResultData);
      
      const token = localStorage.getItem('token'); // Get the token from localStorage
      
      const response = await axios.post('/api/quiz-results', quizResultData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` // Attach token to the header
        }
      });
      
      if (response.status === 201 || response.status === 200) {
        setSubmitStatus('success');
        console.log('Quiz results submitted successfully:', response.data);
      } else {
        setSubmitStatus('error');
        console.error('Failed to submit quiz results:', response.statusText);
      }
    } catch (error) {
      setSubmitStatus('error');
      // FIX 3: Better error handling with more specific messages
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error submitting quiz results:', error.response.data);
        console.error('Status:', error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from server:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up request:', error.message);
      }
    } finally {
      setIsSubmitting(false);
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizCompleted(false);
    setScore(0);
    setSubmitStatus(null);
  };

  const startNewQuiz = () => {
    setShowQuizSelection(true);
    resetQuiz();
  };

  const filteredQuizzes = activeCategory === 'all' 
    ? quizData 
    : quizData.filter(quiz => quiz.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans antialiased relative overflow-hidden">
      {/* Interactive mouse follower */}
      <div 
        className="fixed w-32 h-32 rounded-full bg-blue-500/10 blur-xl pointer-events-none z-0"
        style={{
          left: `${mousePosition.x - 64}px`,
          top: `${mousePosition.y - 64}px`,
          transition: 'transform 0.1s ease-out'
        }}
      ></div>
      
      {/* Animated background elements */}
      <div id="background-elements" className="fixed inset-0 z-0 overflow-hidden"></div>
      
      {/* Gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-0"></div>
      
      {/* Main content container */}
      <div className="relative z-1 px-4 py-8">
        <header className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-3">
              <span className="text-white text-xl font-bold">Q</span>
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">CodeQuiz</h1>
          </div>
          
          {earnedBadges.length > 0 && (
            <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-sm text-white/70">Your Badges:</span>
              <div className="flex">
                {earnedBadges.map(badge => (
                  <div key={badge.id} className="ml-1 tooltip" title={badge.name}>
                    <span className="text-xl">{badge.icon}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </header>
        
        {showQuizSelection ? (
          <div className="max-w-7xl mx-auto">
            {/* Hero section */}
            <section className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 leading-tight max-w-4xl mx-auto">
                Test Your Coding Knowledge
              </h2>
              <p className="max-w-2xl mx-auto text-white/70 text-lg mb-8">
                Challenge yourself with our interactive coding quizzes across multiple languages and frameworks. Earn badges and track your progress!
              </p>
            </section>
            
            {/* Categories filter */}
            <section className="mb-8">
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeCategory === category.id
                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg shadow-blue-500/30`
                        : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </section>
            
            {/* Quiz cards */}
            <section>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredQuizzes.map((quiz, index) => (
                  <div 
                    key={quiz.id} 
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
                    onClick={() => handleSelectQuiz(quizData.findIndex(q => q.id === quiz.id))}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mr-3">
                          <span className="text-2xl">{quiz.icon}</span>
                        </div>
                        <h3 className="text-xl font-bold">{quiz.title}</h3>
                      </div>
                      {earnedBadges.some(badge => badge.id === quiz.badge.id) && (
                        <div className="h-6 w-6 flex items-center justify-center rounded-full bg-green-500/20">
                          <span className="text-green-400 text-sm">✓</span>
                        </div>
                      )}
                    </div>
                    <p className="text-white/60 mb-4">{quiz.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white/40">{quiz.questions.length} questions</span>
                      <span className="text-blue-400 font-medium text-sm flex items-center">
                        Start Quiz
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {quizCompleted ? (
              // Quiz Results Screen
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center">
                <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
                <div className="text-4xl mb-6">
                  {score >= (currentQuiz.questions.length * 0.6) ? (
                    <span className="text-green-400">You passed! 🎉</span>
                  ) : (
                    <span className="text-amber-400">Nice try!</span>
                  )}
                </div>
                <div className="text-xl mb-8">
                  Your score: <span className="font-bold">{score}</span> out of <span>{currentQuiz.questions.length}</span>
                  <p className="text-white/60 text-base mt-2">
                    {score >= (currentQuiz.questions.length * 0.6) 
                      ? `You've earned the ${currentQuiz.badge.name} badge!` 
                      : "You need 60% correct answers to earn a badge."}
                  </p>
                </div>
                
                {score >= (currentQuiz.questions.length * 0.6) && (
                  <div className="mb-8 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-white/10 mb-4 flex items-center justify-center text-3xl">
                      {currentQuiz.badge.icon}
                    </div>
                    <h3 className="text-lg font-bold text-blue-400 mb-1">{currentQuiz.badge.name}</h3>
                    <p className="text-white/60">{currentQuiz.badge.description}</p>
                  </div>
                )}
                
                {/* Show submission status message */}
                {submitStatus && (
                  <div className={`mb-6 p-4 rounded-lg ${
                    submitStatus === 'success' 
                      ? 'bg-green-500/20 border border-green-500/30 text-green-400' 
                      : 'bg-red-500/20 border border-red-500/30 text-red-400'
                  }`}>
                    {submitStatus === 'success' 
                      ? 'Your results have been saved successfully!' 
                      : 'There was an error saving your results. Your score is still recorded locally.'}
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <button 
                    onClick={() => {resetQuiz(); setShowExplanation(false);}}
                    className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors font-medium"
                  >
                    Try Again
                  </button>
                  <button 
                    onClick={startNewQuiz}
                    className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors font-medium"
                  >
                    Return to Quiz Selection
                  </button>
                </div>
              </div>
            ) : (
              // Active Quiz Screen
              <div>
                <div className="flex items-center justify-between mb-6">
                  <button 
                    onClick={startNewQuiz}
                    className="text-white/70 hover:text-white flex items-center text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to Quiz Selection
                  </button>
                  <div className="bg-white/10 rounded-full px-4 py-1 text-sm">
                    Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
                  </div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                      <span className="mr-3 text-3xl">{currentQuiz.icon}</span>
                      {currentQuiz.title}
                    </h2>
                    
                    <div className="mb-8">
                      <h3 className="text-xl font-medium mb-4">{currentQuestion.question}</h3>
                      {currentQuestion.code && (
                        <div className="bg-gray-800 rounded-lg p-4 mb-6 overflow-x-auto">
                          <pre className="text-white/80 font-mono text-sm">{currentQuestion.code}</pre>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-3 mb-8">
                      {currentQuestion.options.map((option, index) => (
                        <div
                          key={index}
                          onClick={() => handleSelectAnswer(index)}
                          className={`p-4 rounded-lg cursor-pointer border transition-all ${
                            selectedAnswer === index
                              ? showExplanation
                                ? index === currentQuestion.correctAnswer
                                  ? 'bg-green-500/20 border-green-500/30'
                                  : 'bg-red-500/20 border-red-500/30'
                                : 'bg-blue-500/20 border-blue-500/30'
                              : 'bg-white/5 border-white/10 hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-start">
                            <div className={`flex-shrink-0 w-5 h-5 rounded-full border ${
                              selectedAnswer === index
                                ? showExplanation
                                  ? index === currentQuestion.correctAnswer
                                    ? 'border-green-400 bg-green-400'
                                    : 'border-red-400 bg-red-400'
                                  : 'border-blue-400 bg-blue-400'
                                : 'border-white/40'
                            } flex items-center justify-center mr-3 mt-0.5`}>
                              {selectedAnswer === index && (
                                <span className="text-xs text-white">
                                  {showExplanation ? (index === currentQuestion.correctAnswer ? '✓' : '✕') : ''}
                                </span>
                              )}
                            </div>
                            <div>
                              <pre className="font-mono whitespace-pre-wrap break-words">{option}</pre>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {showExplanation && (
                      <div className={`p-5 rounded-lg mb-6 ${
                        selectedAnswer === currentQuestion.correctAnswer
                          ? 'bg-green-500/20 border border-green-500/30'
                          : 'bg-red-500/20 border border-red-500/30'
                      }`}>
                        <div className="flex items-start">
                          <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                            selectedAnswer === currentQuestion.correctAnswer
                              ? 'bg-green-500 text-white'
                              : 'bg-red-500 text-white'
                          }`}>
                            <span className="text-sm font-bold">
                              {selectedAnswer === currentQuestion.correctAnswer ? '✓' : '✕'}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium mb-1">
                              {selectedAnswer === currentQuestion.correctAnswer
                                ? 'Correct!'
                                : `Incorrect. The correct answer is: ${currentQuestion.options[currentQuestion.correctAnswer]}`}
                            </p>
                            <p className="text-white/80">{currentQuestion.explanation}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <button
                      onClick={handleNextQuestion}
                      disabled={selectedAnswer === null || isSubmitting}
                      className={`w-full py-3 rounded-lg font-medium transition-colors ${
                        selectedAnswer === null || isSubmitting
                          ? 'bg-blue-600/50 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      {isSubmitting ? (
                        'Submitting...'
                      ) : (
                        showExplanation
                          ? isLastQuestion
                            ? 'Finish Quiz'
                            : 'Next Question'
                          : 'Check Answer'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="relative z-10 py-8 mt-12 text-center text-white/40 text-sm">
        <p>© 2025 CodeQuiz - Level up your programming skills with interactive quizzes</p>
      </footer>
    </div>
  );
}