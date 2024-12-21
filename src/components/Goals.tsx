import React, { useState } from 'react';

interface Goal {
  text: string;
  completed: boolean;
}

export default function GoalsInput() {
  const [goal, setGoal] = useState(''); // For the input field
  const [goalsList, setGoalsList] = useState<Goal[]>([]); // Array to store goals with completion status

  // Add a new goal
  const handleAddGoal = () => {
    if (goal.trim() !== '') { // Ensure it's not empty
      setGoalsList([...goalsList, { text: goal, completed: false }]); // Add with default 'completed: false'
      setGoal(''); // Clear the input
    }
  };

  // Toggle completion of a goal
  const handleToggleGoal = (index: number) => {
    const updatedGoals = goalsList.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setGoalsList(updatedGoals);
  };

  // Remove a goal
  const handleRemoveGoal = (index: number) => {
    const updatedGoals = goalsList.filter((_, i) => i !== index);
    setGoalsList(updatedGoals);
  };

  return (
    <div className="p-4 bg-gray-800 bg-opacity-50 text-white rounded">
      <h2 className="text-xl mb-2">Goals</h2>
      <div className="flex">
        <input
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Type here..."
          className="p-2 rounded text-black w-3/4"
        />
        <button
          onClick={handleAddGoal}
          className="ml-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded"
        >
          Submit
        </button>
      </div>

      {/* Goals List with Checkboxes */}
      <ul className="mt-4 space-y-2">
        {goalsList.map((item, index) => (
          <li key={index} className="flex items-center justify-between bg-gray-700 p-2 rounded">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => handleToggleGoal(index)}
                className="form-checkbox h-5 w-5 text-purple-500"
              />
              <span
                className={`${
                  item.completed ? 'line-through text-gray-400' : 'text-white'
                }`}
              >
                {item.text}
              </span>
            </label>
            <button
              onClick={() => handleRemoveGoal(index)}
              className="text-red-400 hover:text-red-600"
            >
              <img
                src="/assets/delete.png" // Path to your local icon
                alt="Remove"
                className="h-6 w-6" // Adjust size as needed
              />
            </button>

          </li>
        ))}
      </ul>
    </div>
  );
}
