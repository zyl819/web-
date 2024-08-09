import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProjectPage from './pages/ProjectPage';
import BoardPage from './pages/BoardPage';

function App() {
  const [tasks, setTasks] = useState({});

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/projects/:id/tasks" element={<BoardPage tasks={tasks} setTasks={setTasks} />} />
      </Routes>
    </Router>
  );
}

export default App;
