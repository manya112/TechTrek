import { useState, useEffect, useRef } from 'react';

export default function ImprovedTechTrekChatbot() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi there! 👋 I\'m the Tech Trek Coding Assistant. Ask me about programming, coding challenges, or help with your projects!' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const messagesEndRef = useRef(null);

  // Programming languages with associated colors
  const languages = {
    javascript: { name: 'JavaScript', color: '#f0db4f' },
    typescript: { name: 'TypeScript', color: '#007acc' },
    python: { name: 'Python', color: '#3776ab' },
    java: { name: 'Java', color: '#f89820' },
    cpp: { name: 'C++', color: '#00599c' },
    csharp: { name: 'C#', color: '#9b4f96' },
    go: { name: 'Go', color: '#00add8' },
    rust: { name: 'Rust', color: '#dea584' },
    swift: { name: 'Swift', color: '#ffac45' },
    kotlin: { name: 'Kotlin', color: '#7f52ff' },
    php: { name: 'PHP', color: '#777bb4' },
    ruby: { name: 'Ruby', color: '#cc342d' },
    scala: { name: 'Scala', color: '#dc322f' },
    html: { name: 'HTML', color: '#e34c26' },
    css: { name: 'CSS', color: '#264de4' },
    sql: { name: 'SQL', color: '#f29111' },
    react: { name: 'React', color: '#61dafb' },
    angular: { name: 'Angular', color: '#dd0031' },
    vue: { name: 'Vue.js', color: '#42b883' },
    node: { name: 'Node.js', color: '#68a063' }
  };

  // Sample coding quizzes - expanded with more languages
  const codingQuizzes = [
    {
      language: 'javascript',
      question: 'What will be the output of: console.log(typeof NaN)',
      options: ['undefined', 'number', 'NaN', 'object'],
      answer: 'number',
      explanation: 'In JavaScript, NaN (Not a Number) has a type of "number". It\'s a special value representing an invalid number.'
    },
    {
      language: 'javascript',
      question: 'What does the "use strict" directive do in JavaScript?',
      options: ['Enables strict type checking', 'Catches common coding mistakes and throws exceptions', 'Improves performance', 'Creates a new execution scope'],
      answer: 'Catches common coding mistakes and throws exceptions',
      explanation: 'The "use strict" directive enables JavaScript\'s strict mode which catches common mistakes and prevents unsafe actions.'
    },
    {
      language: 'python',
      question: 'Which of these is not a core data type in Python?',
      options: ['Lists', 'Dictionary', 'Class', 'Tuples'],
      answer: 'Class',
      explanation: 'In Python, a class is not a core data type. Lists, dictionaries, and tuples are built-in data types.'
    },
    {
      language: 'python',
      question: 'What is the output of: print(list(filter(lambda x: x < 5, range(10))))',
      options: ['[0, 1, 2, 3, 4]', '[0, 1, 2, 3, 4, 5]', '[1, 2, 3, 4]', 'Error'],
      answer: '[0, 1, 2, 3, 4]',
      explanation: 'The filter function with lambda x: x < 5 returns elements from range(10) that are less than 5.'
    },
    {
      language: 'react',
      question: 'Which hook is used to perform side effects in React components?',
      options: ['useState', 'useEffect', 'useContext', 'useReducer'],
      answer: 'useEffect',
      explanation: 'The useEffect hook is used to perform side effects in functional components, like data fetching or DOM manipulation.'
    },
    {
      language: 'react',
      question: 'What is the correct way to conditionally render a component in React?',
      options: [
        'if (condition) { return <Component /> }',
        '<Component if={condition} />',
        '{condition && <Component />}',
        '<Component condition={true} />'
      ],
      answer: '{condition && <Component />}',
      explanation: 'In React JSX, you can use the logical AND operator (&&) for conditional rendering.'
    },
    {
      language: 'java',
      question: 'What is the default access modifier in Java?',
      options: ['public', 'private', 'protected', 'package-private (no modifier)'],
      answer: 'package-private (no modifier)',
      explanation: 'If no access modifier is specified for a class, method, or variable in Java, it\'s assigned the default "package-private" visibility.'
    },
    {
      language: 'java',
      question: 'Which collection type is best for frequent insertions and deletions in the middle of the list?',
      options: ['ArrayList', 'LinkedList', 'Vector', 'HashMap'],
      answer: 'LinkedList',
      explanation: 'LinkedList provides efficient insertions and deletions from any position because it doesn\'t require element shifting.'
    },
    {
      language: 'cpp',
      question: 'What does the "virtual" keyword do in C++?',
      options: [
        'Creates a virtual machine',
        'Indicates that a function can be overridden in derived classes',
        'Makes a variable volatile',
        'Creates a temporary object'
      ],
      answer: 'Indicates that a function can be overridden in derived classes',
      explanation: 'The virtual keyword is used to declare a function that can be overridden in derived classes, enabling polymorphism.'
    },
    {
      language: 'typescript',
      question: 'Which TypeScript type represents a variable that can be either null or a string?',
      options: ['string | null', 'string?', 'Optional<string>', 'Nullable<string>'],
      answer: 'string | null',
      explanation: 'In TypeScript, the union type "string | null" represents a variable that can be either a string or null.'
    },
    {
      language: 'go',
      question: 'What symbol is used to declare a variable in Go without specifying its type explicitly?',
      options: ['var', ':', ':=', 'auto'],
      answer: ':=',
      explanation: 'In Go, the := operator (short variable declaration) is used to declare and initialize variables without specifying their type.'
    },
    {
      language: 'sql',
      question: 'Which SQL statement is used to update data in a database?',
      options: ['MODIFY', 'SAVE', 'UPDATE', 'CHANGE'],
      answer: 'UPDATE',
      explanation: 'The UPDATE statement is used to modify existing records in a database table.'
    },
    {
      language: 'css',
      question: 'Which CSS property is used to control the space between elements?',
      options: ['spacing', 'margin', 'padding', 'gap'],
      answer: 'margin',
      explanation: 'The margin property in CSS is used to create space around elements, outside of any defined borders.'
    },
    {
      language: 'html',
      question: 'Which HTML5 element is used to specify a footer for a document or section?',
      options: ['<bottom>', '<section>', '<footer>', '<end>'],
      answer: '<footer>',
      explanation: 'The <footer> element in HTML5 defines a footer for a document or section.'
    },
    {
      language: 'node',
      question: 'How do you include an external module in Node.js?',
      options: ['#include "module"', 'import module', 'require("module")', 'using module'],
      answer: 'require("module")',
      explanation: 'In Node.js, the require() function is used to include external modules, though newer versions also support import syntax.'
    }
  ];

  // Code examples for different languages
  const codeExamples = {
    javascript: {
      basic: `// Variables and data types
let name = "JavaScript"; // String
const year = 1995;       // Number
let isPopular = true;    // Boolean
let features = ["functions", "objects", "arrays"]; // Array
let language = {
  name: "JavaScript",
  paradigm: "multi-paradigm",
  typing: "dynamic"
}; // Object

// Function declaration
function greet(name) {
  return \`Hello, \${name}!\`;
}

// Arrow function
const multiply = (a, b) => a * b;

// Async/await example
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}`,
      
      arrays: `// Array methods in JavaScript
const numbers = [1, 2, 3, 4, 5];

// Map - transform each element
const doubled = numbers.map(num => num * 2);
// Result: [2, 4, 6, 8, 10]

// Filter - create a new array with elements that pass the test
const evenNumbers = numbers.filter(num => num % 2 === 0);
// Result: [2, 4]

// Reduce - reduce array to a single value
const sum = numbers.reduce((total, num) => total + num, 0);
// Result: 15

// Sort - sort the elements
const sorted = [...numbers].sort((a, b) => b - a); // Descending
// Result: [5, 4, 3, 2, 1]

// Find - returns first element that satisfies condition
const found = numbers.find(num => num > 3);
// Result: 4

// Some - tests if at least one element passes the test
const hasEven = numbers.some(num => num % 2 === 0);
// Result: true`
    },
    
    python: {
      basic: `# Variables and data types
name = "Python"  # str
year = 1991      # int
is_popular = True  # bool
features = ["readable", "dynamic", "object-oriented"]  # list
language = {
    "name": "Python",
    "paradigm": "multi-paradigm",
    "typing": "dynamic"
}  # dict

# Function definition
def greet(name):
    return f"Hello, {name}!"

# List comprehension
squares = [x**2 for x in range(10)]

# Error handling
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Can't divide by zero!")
finally:
    print("This always executes")

# Class definition
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def introduce(self):
        return f"Hi, I'm {self.name} and I'm {self.age} years old."`,
      
      dataScience: `# Data Science in Python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Create a DataFrame
data = {
    'Name': ['Alice', 'Bob', 'Charlie', 'David'],
    'Age': [25, 30, 35, 40],
    'Score': [85, 92, 78, 96]
}
df = pd.DataFrame(data)

# Basic statistics
mean_age = df['Age'].mean()
max_score = df['Score'].max()

# Data visualization
plt.figure(figsize=(10, 6))
sns.barplot(x='Name', y='Score', data=df)
plt.title('Scores by Person')
plt.xlabel('Name')
plt.ylabel('Score')

# NumPy operations
matrix = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
transposed = matrix.transpose()
inverse = np.linalg.inv(matrix)`
    },
    
    react: {
      component: `import React, { useState, useEffect } from 'react';

function ProductList({ category }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch products
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // In a real app, replace with your API endpoint
        const response = await fetch(\`https://api.example.com/products?category=\${category}\`);
        
        if (!response.ok) {
          throw new Error(\`Error: \${response.status}\`);
        }
        
        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]); // Re-fetch when category changes

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (products.length === 0) return <div>No products found in {category}.</div>;

  return (
    <div className="product-list">
      <h2>{category} Products</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;`,
      
      hooks: `import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';

function HooksExample() {
  // useState: State management
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: '', email: '' });
  
  // useRef: Access to DOM elements and persistent values
  const inputRef = useRef(null);
  const previousCount = useRef(count);
  
  // useEffect: Side effects
  useEffect(() => {
    // Similar to componentDidMount
    document.title = \`Count: \${count}\`;
    
    // Similar to componentWillUnmount
    return () => {
      document.title = 'React App';
    };
  }, [count]); // Only re-run when count changes
  
  // useCallback: Memoized callbacks
  const incrementCount = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []); // Empty dependency array means this function never changes
  
  // useMemo: Memoized values
  const expensiveCalculation = useMemo(() => {
    console.log('Calculating...');
    let result = 0;
    for (let i = 0; i < count * 100; i++) {
      result += i;
    }
    return result;
  }, [count]); // Only recalculate when count changes
  
  // Update previousCount after render
  useEffect(() => {
    previousCount.current = count;
  }, [count]);
  
  // Focus the input on mount
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  
  return (
    <div>
      <h2>Hooks Example</h2>
      <p>Count: {count} (Previous: {previousCount.current})</p>
      <p>Expensive Calculation: {expensiveCalculation}</p>
      
      <button onClick={incrementCount}>Increment</button>
      
      <div>
        <input 
          ref={inputRef}
          value={user.name}
          onChange={(e) => setUser({...user, name: e.target.value})}
          placeholder="Name"
        />
      </div>
    </div>
  );
}`
    },
    
    java: {
      basic: `// Java Basic Example
public class JavaBasics {
    // Class variables
    private String name;
    private int age;
    
    // Constructor
    public JavaBasics(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    // Getter methods
    public String getName() {
        return name;
    }
    
    public int getAge() {
        return age;
    }
    
    // Setter methods
    public void setName(String name) {
        this.name = name;
    }
    
    public void setAge(int age) {
        if (age > 0) {
            this.age = age;
        }
    }
    
    // Method overloading
    public void displayInfo() {
        System.out.println("Name: " + name + ", Age: " + age);
    }
    
    public void displayInfo(String title) {
        System.out.println(title + " - Name: " + name + ", Age: " + age);
    }
    
    // Main method
    public static void main(String[] args) {
        JavaBasics person = new JavaBasics("John Doe", 30);
        person.displayInfo();
        person.displayInfo("Person Details");
        
        // Using arrays
        int[] numbers = {1, 2, 3, 4, 5};
        for (int num : numbers) {
            System.out.println(num);
        }
    }
}`
    },
    
    cpp: {
      basic: `// C++ Basic Example
#include <iostream>
#include <vector>
#include <string>

// Class definition
class Person {
private:
    std::string name;
    int age;

public:
    // Constructor
    Person(std::string n, int a) : name(n), age(a) {}
    
    // Member functions
    void displayInfo() const {
        std::cout << "Name: " << name << ", Age: " << age << std::endl;
    }
    
    // Getters
    std::string getName() const { return name; }
    int getAge() const { return age; }
    
    // Setters
    void setName(const std::string& n) { name = n; }
    void setAge(int a) { 
        if (a > 0) age = a; 
    }
};

// Function template
template<typename T>
T add(T a, T b) {
    return a + b;
}

int main() {
    // Creating objects
    Person person("Alice", 25);
    person.displayInfo();
    
    // Using vectors
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    
    // Range-based for loop
    for (const auto& num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    // Using function template
    std::cout << "Sum of ints: " << add<int>(5, 10) << std::endl;
    std::cout << "Sum of doubles: " << add<double>(3.5, 7.2) << std::endl;
    
    return 0;
}`
    },
    
    typescript: {
      basic: `// TypeScript Basic Example
// Interface definition
interface Person {
  name: string;
  age: number;
  email?: string; // Optional property
}

// Type alias
type UserRole = 'admin' | 'editor' | 'viewer';

// Class implementation
class User implements Person {
  // Property with access modifier
  private id: number;
  
  constructor(
    public name: string,
    public age: number,
    public role: UserRole = 'viewer',
    email?: string
  ) {
    this.id = Math.floor(Math.random() * 1000);
    if (email) this.email = email;
  }
  
  // Method with return type
  getInfo(): string {
    return \`\${this.name} (ID: \${this.id}), \${this.age} years old, Role: \${this.role}\`;
  }
  
  // Generic method
  static createUserList<T extends Person>(users: T[]): T[] {
    return [...users].sort((a, b) => a.name.localeCompare(b.name));
  }
}

// Function with parameter types and return type
function calculateDiscount(price: number, percentage: number): number {
  return price * (1 - percentage / 100);
}

// Union types
function processValue(value: string | number): string {
  if (typeof value === 'string') {
    return value.toUpperCase();
  } else {
    return \`Numeric value: \${value}\`;
  }
}

// Using the classes and functions
const admin = new User('Alice', 30, 'admin', 'alice@example.com');
console.log(admin.getInfo());

const price = calculateDiscount(100, 20); // 80
console.log(price);

const result = processValue('hello'); // "HELLO"
console.log(result);`
    },
    
    sql: {
      basic: `-- Basic SQL Examples

-- Create a table
CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    hire_date DATE,
    salary DECIMAL(10, 2),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

-- Insert data
INSERT INTO employees (employee_id, first_name, last_name, email, hire_date, salary, department_id)
VALUES (1, 'John', 'Doe', 'john.doe@example.com', '2023-01-15', 75000.00, 1);

-- Select query with conditions
SELECT 
    e.employee_id,
    e.first_name,
    e.last_name,
    d.department_name,
    e.salary
FROM 
    employees e
JOIN 
    departments d ON e.department_id = d.department_id
WHERE 
    e.salary > 50000
    AND d.department_name = 'Engineering'
ORDER BY 
    e.salary DESC;

-- Update records
UPDATE employees
SET salary = salary * 1.1
WHERE department_id = 2
AND hire_date < '2023-01-01';

-- Aggregate functions
SELECT 
    department_id,
    COUNT(*) as employee_count,
    AVG(salary) as average_salary,
    MAX(salary) as highest_salary
FROM 
    employees
GROUP BY 
    department_id
HAVING 
    COUNT(*) > 5;

-- Delete records
DELETE FROM employees
WHERE hire_date < '2020-01-01'
AND salary < 40000;`
    }
  };

  // Auto-scroll to latest message
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Function to check if query is coding-related
  const isCodingRelated = (query) => {
    const codingKeywords = [
      'code', 'program', 'function', 'variable', 'array', 'object', 
      'class', 'method', 'algorithm', 'syntax', 'error', 'debug', 
      'javascript', 'python', 'java', 'c++', 'c#', 'go', 'rust', 'swift',
      'typescript', 'php', 'ruby', 'kotlin', 'scala', 'perl', 'bash',
      'html', 'css', 'scss', 'sass', 'less', 'bootstrap', 'tailwind',
      'node', 'express', 'django', 'flask', 'spring', 'laravel', 'rails',
      'react', 'angular', 'vue', 'svelte', 'ember', 'backbone',
      'mongodb', 'sql', 'mysql', 'postgresql', 'sqlite', 'oracle', 'nosql',
      'redis', 'firebase', 'graphql', 'rest', 'api', 'json', 'xml',
      'git', 'github', 'gitlab', 'bitbucket', 'docker', 'kubernetes',
      'aws', 'azure', 'gcp', 'heroku', 'netlify', 'vercel',
      'compiler', 'interpreter', 'runtime', 'framework', 'library',
      'frontend', 'backend', 'fullstack', 'devops', 'sysadmin',
      'agile', 'scrum', 'kanban', 'waterfall', 'ci/cd', 'jenkins',
      'test', 'unit test', 'integration test', 'e2e test', 'jest', 'mocha',
      'cypress', 'selenium', 'webpack', 'babel', 'eslint', 'prettier',
      'npm', 'yarn', 'pnpm', 'pip', 'maven', 'gradle', 'nuget',
      'quiz', 'challenge', 'project', 'tutorial', 'course', 'bootcamp',
      'help', 'learn', 'teach', 'example', 'how to', 'fix', 'solve'
    ];
    
    const query_lower = query.toLowerCase();
    
    // Allow simple "yes" or "no" answers to be context-aware
    if (/^(yes|no|sure|okay|1|2|3|4)$/i.test(query_lower.trim())) {
      return true;
    }
    
    return codingKeywords.some(keyword => query_lower.includes(keyword));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: inputMessage }]);
    
    const userQuery = inputMessage;
    setInputMessage('');
    setIsLoading(true);
    
    // Process the user's message
    setTimeout(() => {
      setIsLoading(false);
      
      if (!isCodingRelated(userQuery)) {
        addBotMessage("Sorry, can't help you with this.");
        return;
      }
      
      respondToCodingQuery(userQuery);
    }, 1000);
  };
  
  const addBotMessage = (text) => {
    setMessages(prev => [...prev, { sender: 'bot', text }]);
  };

  const handleQuizAnswer = (answer) => {
    if (!activeQuiz) return;
    
    const numAnswer = parseInt(answer);
    if (numAnswer < 1 || numAnswer > 4) return;
    
    const selectedAnswer = activeQuiz.options[numAnswer - 1];
    const isCorrect = selectedAnswer === activeQuiz.answer;
    
    let responseMessage = isCorrect 
      ? `✅ Correct! "${selectedAnswer}" is the right answer.\n\n${activeQuiz.explanation}`
      : `❌ Not quite. The correct answer is "${activeQuiz.answer}".\n\n${activeQuiz.explanation}`;
    
    responseMessage += "\n\nWould you like another quiz?";
    
    addBotMessage(responseMessage);
    setActiveQuiz(null);
  };

  const getLanguageFromQuery = (query) => {
    const query_lower = query.toLowerCase();
    return Object.keys(languages).find(lang => query_lower.includes(lang)) || null;
  };

  const getQuizForLanguage = (language) => {
    // Filter quizzes by language
    const languageQuizzes = language 
      ? codingQuizzes.filter(quiz => quiz.language === language)
      : codingQuizzes;
    
    if (languageQuizzes.length === 0) return null;
    
    // Return a random quiz
    return languageQuizzes[Math.floor(Math.random() * languageQuizzes.length)];
  };

  const getCodeExampleForLanguage = (language, topic = null) => {
    if (!language || !codeExamples[language]) return null;
    
    // If topic is specified and exists, return that specific example
    if (topic && codeExamples[language][topic]) {
      return {
        language: language,
        code: codeExamples[language][topic],
        topic: topic
      };
    }
    
    // Otherwise return the basic example
    const exampleKey = Object.keys(codeExamples[language])[0];
    return {
      language: language,
      code: codeExamples[language][exampleKey],
      topic: exampleKey
    };
  };

  const respondToCodingQuery = (query) => {
    const query_lower = query.toLowerCase();
    
    // Handle quiz answers (1-4)
    if (activeQuiz && /^[1-4]$/.test(query_lower.trim())) {
      handleQuizAnswer(query_lower);
      return;
    }
    
    // Handle quiz requests
    if (query_lower.includes('quiz') || query_lower.includes('test') || 
        query_lower.includes('challenge') || query_lower.includes('question') ||
        (query_lower.includes('another') && messages[messages.length - 2]?.text?.includes('quiz'))) {
      
      const language = getLanguageFromQuery(query);
      const quiz = getQuizForLanguage(language);
      
      if (quiz) {
        setActiveQuiz(quiz);
        const quizMessage = `
Here's a ${languages[quiz.language].name} quiz for you:

Question: ${quiz.question}

Options:
1. ${quiz.options[0]}
2. ${quiz.options[1]}
3. ${quiz.options[2]}
4. ${quiz.options[3]}

Reply with the number of your answer (1-4).
`;
        addBotMessage(quizMessage);
        return;
      }
    }
    
    // Handle code example requests
    if (query_lower.includes('example') || query_lower.includes('code') || 
        query_lower.includes('how to') || query_lower.includes('syntax') || 
        query_lower.includes('show me')) {
      
      const language = getLanguageFromQuery(query);
      
      // Identify topic if any
      let topic = null;
      if (language) {
        const topicKeywords = {
          javascript: {
            'array': 'arrays', 'arrays': 'arrays', 'map': 'arrays', 'filter': 'arrays',
            'basic': 'basic', 'intro': 'basic', 'syntax': 'basic'
          },
          python: {
            'data science': 'dataScience', 'numpy': 'dataScience', 'pandas': 'dataScience',
            'basic': 'basic', 'intro': 'basic', 'syntax': 'basic'
          },
          react: {
            'component': 'component', 'components': 'component', 'class': 'component',
            'basic': 'basic', 'intro': 'basic', 'syntax': 'basic'
        },