import { useState, useEffect } from 'react';

// Enhanced quiz data with additional language categories
const quizData = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    description: "Test your knowledge of JavaScript basics",
    category: "language",
    icon: "🚀",
    questions: [
      {
        id: 1,
        question: "What is the correct way to declare a variable in modern JavaScript?",
        code: "// Choose the best practice for variable declaration",
        options: [
          "var name = 'John';",
          "let name = 'John';",
          "const name = 'John';",
          "string name = 'John';"
        ],
        correctAnswer: 2,
        explanation: "const is preferred for variables that won't be reassigned. Use let for variables that will change."
      },
      {
        id: 2,
        question: "Which method adds an element to the end of an array?",
        code: "const fruits = ['apple', 'banana'];\n// Add 'orange' to the end of the array",
        options: [
          "fruits.push('orange');",
          "fruits.pop('orange');",
          "fruits.append('orange');",
          "fruits.add('orange');"
        ],
        correctAnswer: 0,
        explanation: "push() adds one or more elements to the end of an array and returns the new length."
      },
      {
        id: 3,
        question: "What does the following code output?",
        code: "console.log(2 + '2');",
        options: [
          "4",
          "'22'",
          "22",
          "TypeError"
        ],
        correctAnswer: 1,
        explanation: "When adding a number and a string, JavaScript converts the number to a string and performs concatenation."
      },
      {
        id: 4,
        question: "Which method creates a new array with the results of calling a function on every element?",
        code: "// Transform each number in the array to its square\nconst numbers = [1, 2, 3, 4];\n// Fill in the correct method:",
        options: [
          "numbers.forEach(num => num * num);",
          "numbers.filter(num => num * num);",
          "numbers.map(num => num * num);",
          "numbers.reduce(num => num * num);"
        ],
        correctAnswer: 2,
        explanation: "map() creates a new array with the results of calling a provided function on every element in the array."
      }
    ],
    badge: {
      id: "js-fundamentals",
      name: "JavaScript Explorer",
      icon: "🚀",
      description: "Mastered the fundamentals of JavaScript"
    }
  },
  {
    id: 2,
    title: "React Basics",
    description: "Test your understanding of React core concepts",
    category: "framework",
    icon: "⚛️",
    questions: [
      {
        id: 1,
        question: "What hook is used to run side effects in a function component?",
        code: "// Which hook would you use to fetch data when a component mounts?",
        options: [
          "useState",
          "useEffect",
          "useContext",
          "useReducer"
        ],
        correctAnswer: 1,
        explanation: "useEffect is the hook designed for performing side effects in function components."
      },
      {
        id: 2,
        question: "What's wrong with this code?",
        code: "function Counter() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <button onClick={() => setCount(count++)}>Count: {count}</button>\n  );\n}",
        options: [
          "useState is used incorrectly",
          "The component name should be lowercase",
          "count++ mutates state directly which is wrong",
          "The onClick handler needs to be defined separately"
        ],
        correctAnswer: 2,
        explanation: "Using count++ attempts to modify state directly. Instead, use setCount(count + 1) to properly update state."
      },
      {
        id: 3,
        question: "How do you properly render a list in React?",
        code: "const items = ['Apple', 'Banana', 'Cherry'];\n// What's the correct way to render this list?",
        options: [
          "items.forEach(item => <li>{item}</li>)",
          "items.map(item => <li key={item}>{item}</li>)",
          "<li>{items.join(', ')}</li>",
          "for (let item of items) { return <li>{item}</li> }"
        ],
        correctAnswer: 1,
        explanation: "Using map() to return an array of elements is the correct pattern, and keys help React identify which items change."
      },
      {
        id: 4,
        question: "What happens when you call setState in React?",
        code: "// When this function runs, what happens?\nfunction handleClick() {\n  setCount(count + 1);\n  console.log(count);\n}",
        options: [
          "The component immediately re-renders and console shows the updated value",
          "The console shows the updated value but the component doesn't re-render yet",
          "The console shows the previous value because state updates are asynchronous",
          "This will cause an infinite loop"
        ],
        correctAnswer: 2,
        explanation: "State updates in React are asynchronous, so the logged value will be the previous state value, not the updated one."
      }
    ],
    badge: {
      id: "react-basics",
      name: "React Apprentice",
      icon: "⚛️",
      description: "Successfully grasped React core concepts"
    }
  },
  {
    id: 3,
    title: "Python Fundamentals",
    description: "Test your knowledge of Python basics",
    category: "language",
    icon: "🐍",
    questions: [
      {
        id: 1,
        question: "What is the correct way to declare a list in Python?",
        code: "# Choose the correct list creation syntax",
        options: [
          "list = [1, 2, 3]",
          "list = (1, 2, 3)",
          "list = array(1, 2, 3)",
          "list = {1, 2, 3}"
        ],
        correctAnswer: 0,
        explanation: "In Python, square brackets [] are used to create a list. Parentheses () create tuples, and curly braces {} create sets or dictionaries."
      },
      {
        id: 2,
        question: "Which method adds an element to the end of a list?",
        code: "fruits = ['apple', 'banana']\n# Add 'orange' to the end of the list",
        options: [
          "fruits.append('orange')",
          "fruits.add('orange')",
          "fruits.push('orange')",
          "fruits.insert('orange')"
        ],
        correctAnswer: 0,
        explanation: "append() adds an element to the end of a list in Python."
      },
      {
        id: 3,
        question: "What does the following code output?",
        code: "print(2 + int('2'))",
        options: [
          "4",
          "'22'",
          "22",
          "TypeError"
        ],
        correctAnswer: 0,
        explanation: "int('2') converts the string '2' to an integer, so 2 + int('2') evaluates to 4."
      },
      {
        id: 4,
        question: "Which method creates a new list by applying a function to each element?",
        code: "# Transform each number in the list to its square\nnumbers = [1, 2, 3, 4]\n# Fill in the correct method:",
        options: [
          "map(lambda x: x * x, numbers)",
          "[x * x for x in numbers]",
          "numbers.map(lambda x: x * x)",
          "numbers.apply(lambda x: x * x)"
        ],
        correctAnswer: 1,
        explanation: "A list comprehension [x * x for x in numbers] is the most Pythonic way to create a new list by applying a function to each element."
      }
    ],
    badge: {
      id: "python-fundamentals",
      name: "Python Navigator",
      icon: "🐍",
      description: "Mastered the fundamentals of Python"
    }
  },
  {
    id: 4,
    title: "C# Fundamentals",
    description: "Test your knowledge of C# basics",
    category: "language",
    icon: "🔷",
    questions: [
      {
        id: 1,
        question: "What is the correct way to declare a variable in C#?",
        code: "// Choose the best practice for variable declaration",
        options: [
          "string name = \"John\";",
          "var name = \"John\";",
          "let name = \"John\";",
          "String name = \"John\";"
        ],
        correctAnswer: 0,
        explanation: "In C#, variables are typically declared with their explicit type (like string name = \"John\";). The var keyword can also be used for implicit typing."
      },
      {
        id: 2,
        question: "Which method adds an element to the end of a List?",
        code: "List<string> fruits = new List<string> { \"apple\", \"banana\" };\n// Add \"orange\" to the end of the list",
        options: [
          "fruits.Push(\"orange\");",
          "fruits.Add(\"orange\");",
          "fruits.Append(\"orange\");",
          "fruits.Insert(\"orange\");"
        ],
        correctAnswer: 1,
        explanation: "In C#, the Add() method adds an element to the end of a List collection."
      },
      {
        id: 3,
        question: "What does the following code output?",
        code: "Console.WriteLine(2 + \"2\");",
        options: [
          "4",
          "\"22\"",
          "22",
          "TypeError"
        ],
        correctAnswer: 1,
        explanation: "In C#, when adding a number and a string, the number is converted to a string and concatenation is performed."
      },
      {
        id: 4,
        question: "Which LINQ method creates a new collection by applying a function to each element?",
        code: "// Transform each number in the list to its square\nList<int> numbers = new List<int> { 1, 2, 3, 4 };\n// Fill in the correct method:",
        options: [
          "numbers.ForEach(num => num * num);",
          "numbers.Select(num => num * num);",
          "numbers.Where(num => num * num);",
          "numbers.Reduce(num => num * num);"
        ],
        correctAnswer: 1,
        explanation: "In C#, the Select() LINQ method creates a new collection by applying a function to each element in the original collection."
      }
    ],
    badge: {
      id: "csharp-fundamentals",
      name: "C# Adventurer",
      icon: "🔷",
      description: "Mastered the fundamentals of C#"
    }
  },
  {
    id: 5,
    title: "SQL Fundamentals",
    description: "Test your knowledge of SQL basics",
    category: "language",
    icon: "🗃️",
    questions: [
      {
        id: 1,
        question: "Which SQL statement is used to retrieve data from a database?",
        code: "-- Choose the correct statement to get all columns from the 'users' table",
        options: [
          "GET * FROM users;",
          "SELECT * FROM users;",
          "EXTRACT * FROM users;",
          "RETRIEVE * FROM users;"
        ],
        correctAnswer: 1,
        explanation: "The SELECT statement is used to retrieve data from a database in SQL."
      },
      {
        id: 2,
        question: "Which SQL clause is used to filter records?",
        code: "-- Get all users with age greater than 18",
        options: [
          "WHERE age > 18;",
          "FILTER age > 18;",
          "HAVING age > 18;",
          "CONDITION age > 18;"
        ],
        correctAnswer: 0,
        explanation: "The WHERE clause is used to filter records in SQL."
      },
      {
        id: 3,
        question: "Which SQL statement is used to update data in a database?",
        code: "-- Change the email for user with id=1",
        options: [
          "MODIFY users SET email='new@example.com' WHERE id=1;",
          "UPDATE users SET email='new@example.com' WHERE id=1;",
          "CHANGE users SET email='new@example.com' WHERE id=1;",
          "ALTER users SET email='new@example.com' WHERE id=1;"
        ],
        correctAnswer: 1,
        explanation: "The UPDATE statement is used to modify existing records in a table."
      },
      {
        id: 4,
        question: "Which SQL clause is used to join tables?",
        code: "-- Get users and their orders",
        options: [
          "COMBINE",
          "JOIN",
          "MERGE",
          "LINK"
        ],
        correctAnswer: 1,
        explanation: "The JOIN clause is used to combine rows from two or more tables based on a related column."
      }
    ],
    badge: {
      id: "sql-fundamentals",
      name: "SQL Commander",
      icon: "🗃️",
      description: "Mastered the fundamentals of SQL"
    }
  },
  {
    id: 6,
    title: "Mixed Programming Challenge",
    description: "Test your knowledge across multiple languages",
    category: "mixed",
    icon: "🌐",
    questions: [
      {
        id: 1,
        question: "What would this JavaScript code output?",
        code: "console.log(typeof [])",
        options: [
          "'array'",
          "'object'",
          "'undefined'",
          "'Array'"
        ],
        correctAnswer: 1,
        explanation: "In JavaScript, arrays are objects, so typeof [] returns 'object'."
      },
      {
        id: 2,
        question: "What would this Python code output?",
        code: "print(type([]))",
        options: [
          "<class 'array'>",
          "<class 'object'>",
          "<class 'list'>",
          "<class 'List'>"
        ],
        correctAnswer: 2,
        explanation: "In Python, [] creates a list, so type([]) returns <class 'list'>."
      },
      {
        id: 3,
        question: "What would this SQL query return?",
        code: "SELECT COUNT(*) FROM users WHERE age < 18;",
        options: [
          "The number of users younger than 18",
          "The details of users younger than 18",
          "An error because COUNT needs a column name",
          "The number of columns in the users table"
        ],
        correctAnswer: 0,
        explanation: "This SQL query returns the count of users who are younger than 18."
      },
      {
        id: 4,
        question: "What would this HTML/CSS do?",
        code: "div {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}",
        options: [
          "Center text horizontally inside the div",
          "Center the div horizontally on the page",
          "Center content both horizontally and vertically inside the div",
          "Make the div take up the full width of its parent"
        ],
        correctAnswer: 2,
        explanation: "This CSS uses Flexbox to center content both horizontally (justify-content: center) and vertically (align-items: center) inside the div."
      },
      {
        id: 5,
        question: "What would this C# code output?",
        code: "var numbers = new List<int> { 1, 2, 3, 4, 5 };\nvar result = numbers.Where(x => x % 2 == 0).Sum();\nConsole.WriteLine(result);",
        options: [
          "15",
          "6",
          "9",
          "An error because Where needs a boolean return"
        ],
        correctAnswer: 1,
        explanation: "This C# code filters for even numbers (2, 4) using Where, then calculates their sum (2 + 4 = 6)."
      },
      {
        id: 6,
        question: "What does this React Hook do?",
        code: "const [count, setCount] = useState(0);",
        options: [
          "Creates a reference to a DOM element",
          "Creates a state variable with initial value 0",
          "Runs a side effect after rendering",
          "Creates a memoized callback function"
        ],
        correctAnswer: 1,
        explanation: "This uses React's useState hook to create a state variable named 'count' with an initial value of 0, and a function 'setCount' to update it."
      },
      {
        id: 7,
        question: "What would this Ruby code output?",
        code: "arr = [1, 2, 3, 4, 5]\nresult = arr.select { |num| num.even? }.reduce(:+)\nputs result",
        options: [
          "15",
          "6",
          "9",
          "An error because arrays don't have a select method"
        ],
        correctAnswer: 1,
        explanation: "This Ruby code filters for even numbers (2, 4) using select, then calculates their sum (2 + 4 = 6) using reduce."
      },
      {
        id: 8,
        question: "What would this Go code output?",
        code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    s := []int{1, 2, 3}\n    s = append(s, 4)\n    fmt.Println(len(s))\n}",
        options: [
          "3",
          "4",
          "5",
          "An error because append is not a valid function"
        ],
        correctAnswer: 1,
        explanation: "This Go code creates a slice with 3 elements, appends a 4th element, and prints the length, which is 4."
      }
    ],
    badge: {
      id: "polyglot-coder",
      name: "Polyglot Coder",
      icon: "🌐",
      description: "Demonstrated proficiency across multiple programming languages"
    }
  }
];

// Career path categories
const categories = [
  { id: 'all', label: 'All Quizzes', color: 'from-blue-500 to-purple-600' },
  { id: 'language', label: 'Languages', color: 'from-pink-500 to-purple-600' },
  { id: 'framework', label: 'Frameworks', color: 'from-cyan-500 to-blue-600' },
  { id: 'mixed', label: 'Mixed Challenges', color: 'from-green-400 to-teal-500' }
];

export default function QuizHomePage() {
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

  const currentQuiz = quizData[currentQuizIndex];
  const currentQuestion = currentQuiz?.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === currentQuiz?.questions.length - 1;

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
    setSelectedAnswer(answerIndex);
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

  const finishQuiz = () => {
    const passThreshold = currentQuiz.questions.length * 0.6; // 60% to pass
    
    if (score + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0) >= passThreshold) {
      // Award badge
      const earnedBadge = currentQuiz.badge;
      if (!earnedBadges.some(badge => badge.id === earnedBadge.id)) {
        setEarnedBadges([...earnedBadges, earnedBadge]);
      }
    }
    
    setQuizCompleted(true);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizCompleted(false);
    setScore(0);
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
                      disabled={selectedAnswer === null}
                      className={`w-full py-3 rounded-lg font-medium transition-colors ${
                        selectedAnswer === null
                          ? 'bg-blue-600/50 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      {showExplanation
                        ? isLastQuestion
                          ? 'Finish Quiz'
                          : 'Next Question'
                        : 'Check Answer'}
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