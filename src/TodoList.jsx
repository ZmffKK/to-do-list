import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Task Manager</h1>
      
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add a new task..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <motion.button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
          onClick={addTodo}
          whileTap={{ scale: 0.95 }}
        >
          Add
        </motion.button>
      </div>
      
      <AnimatePresence>
        {todos.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            className="text-center text-gray-500 my-4"
          >
            No tasks yet. Add one above!
          </motion.p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {todos.map(todo => (
              <motion.li
                key={todo.id}
                className="flex items-center justify-between py-3"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.3 }}
                layout
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-5 w-5 text-blue-500 rounded focus:ring-blue-500"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id)}
                  />
                  <motion.span
                    className={`ml-3 text-gray-800 ${todo.completed ? 'line-through text-gray-400' : ''}`}
                    animate={{ opacity: todo.completed ? 0.6 : 1 }}
                  >
                    {todo.text}
                  </motion.span>
                </div>
                <motion.button
                  className="text-red-500 hover:text-red-700 transition-colors duration-300"
                  onClick={() => deleteTodo(todo.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </motion.button>
              </motion.li>
            ))}
          </ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TodoList; 