import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProjectPage from './pages/ProjectPage';
import BoardPage from './pages/BoardPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/projects/:projectId/tasks" element={<BoardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
