import React, { useState } from 'react';

const TodoForm = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    endDate: '',
    priority: 'medium',
    email: 'bhunsadiya.ca@gmail.com',
    completed: false,
    deleted: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://xzvbd8tg1i.execute-api.us-east-1.amazonaws.com/dev/create-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        console.log('Task created successfully');
        // Optionally, you can reset the form or perform other actions upon success
        setTask({
          title: '',
          description: '',
          endDate: '',
          priority: 'medium',
          email: 'bhunsadiya.ca@gmail.com',
          completed: false,
          deleted: false
        });
      } else {
        console.error('Failed to create task');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form className='container' onSubmit={handleFormSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title:</label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          value={task.title}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description:</label>
        <input
          type="text"
          className="form-control"
          id="description"
          name="description"
          value={task.description}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="endDate" className="form-label">End Date:</label>
        <input
          type="date"
          className="form-control"
          id="endDate"
          name="endDate"
          value={task.endDate}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-check-label">Priority:</label>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            id="priorityHigh"
            name="priority"
            value="high"
            checked={task.priority === 'high'}
            onChange={handleInputChange}
          />
          <label htmlFor="priorityHigh" className="form-check-label">High</label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            id="priorityMedium"
            name="priority"
            value="medium"
            checked={task.priority === 'medium'}
            onChange={handleInputChange}
          />
          <label htmlFor="priorityMedium" className="form-check-label">Medium</label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            id="priorityLow"
            name="priority"
            value="low"
            checked={task.priority === 'low'}
            onChange={handleInputChange}
          />
          <label htmlFor="priorityLow" className="form-check-label">Low</label>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">Create Task</button>
    </form>
  );
};

export default TodoForm;
