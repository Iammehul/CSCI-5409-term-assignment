import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import LandingPage from './Components/LandingPage/LandingPage';
import './App.css';
import TodoList from './Components/todoList/todoList';
import TodoForm from './Components/TodoForm/TodoForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/todo-list" element={<TodoList />} />
        <Route path="/add-task" element={<TodoForm />} />
      </Routes>
    </Router>
  );
}

export default App;
