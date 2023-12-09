import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ... (your imports)

const TodoList = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://xzvbd8tg1i.execute-api.us-east-1.amazonaws.com/dev/get-all');
                const data = await response.json();

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

    const handleCompleteTask = async (task) => {
        console.log("TASK:::", task);
        try {
            const response = await fetch(`https://xzvbd8tg1i.execute-api.us-east-1.amazonaws.com/dev/edit-task`, {
                method: 'POST',
                body: JSON.stringify({ taskId: task.taskId, title: task.title, completed: true, deleted: false }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log('Task completed successfully');
            } else {
                console.error('Failed to complete task');
            }
        } catch (error) {
            console.error('Error completing task:', error);
        }
    };

    const handleDeleteTask = async (task) => {
        console.log("TASK:::", task);
        try {
            const response = await fetch(`https://xzvbd8tg1i.execute-api.us-east-1.amazonaws.com/dev/edit-task`, {
                method: 'POST',
                body: JSON.stringify({ taskId: task.taskId, title: task.title, completed: false, deleted: true }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                console.log('Task deleted successfully');
            } else {
                console.error('Failed to delete task');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };
    
    const navigateToAddTask = () => {
        navigate('/add-task');
    };

    return (
        <div className="container mt-5">
            <h1>Todo List</h1>
            <button className="btn btn-success mb-3" onClick={navigateToAddTask}>Add Task</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>End Date</th>
                        <th>Priority</th>
                        <th>Actions</th>
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
                                {!task.completed && (
                                    <button className="btn btn-primary" onClick={() => handleCompleteTask(task)}>Complete</button>
                                )}
                                <button className="btn btn-danger ml-2" onClick={() => handleDeleteTask(task)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TodoList;
