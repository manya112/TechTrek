export const quizData = [
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

  