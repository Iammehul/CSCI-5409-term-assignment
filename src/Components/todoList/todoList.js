import React, { useState, useEffect } from 'react';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://0sqoqw260g.execute-api.us-east-1.amazonaws.com/dev/get-all');
                const data = await response.json();

                // Check if data has a tasks property and it is an array
                if (data.tasks && Array.isArray(data.tasks)) {
                    setTasks(data.tasks);
                } else {
                    console.error('Invalid data format:', data);
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchData();
    }, []);

    const handleCompleteTask = async (taskId) => {
        try {
            // Add logic to update the task status or perform other actions
            // For example, you can send a request to mark the task as completed
            const response = await fetch(`https://0sqoqw260g.execute-api.us-east-1.amazonaws.com/dev/complete-task/${taskId}`, {
                method: 'PUT',
            });

            if (response.ok) {
                console.log('Task completed successfully');
                // Optionally, you can fetch the updated task list or update the local state
            } else {
                console.error('Failed to complete task');
            }
        } catch (error) {
            console.error('Error completing task:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1>Todo List</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>End Date</th>
                        <th>Priority</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task.taskId}>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.endDate}</td>
                            <td>{task.priority}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => handleCompleteTask(task.taskId)}>Complete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TodoList;
