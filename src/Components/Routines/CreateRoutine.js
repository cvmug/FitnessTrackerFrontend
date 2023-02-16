import { useState } from 'react';

function CreateRoutine() {
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');

  const handleNameChange = (e) => setName(e.target.value);
  const handleGoalChange = (e) => setGoal(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Make API request to create new routine with name and goal
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <label>
        Goal:
        <input type="text" value={goal} onChange={handleGoalChange} />
      </label>
      <button type="submit">Create Routine</button>
    </form>
  );
}
