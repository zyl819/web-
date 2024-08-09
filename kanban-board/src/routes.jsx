import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProjectPage from './pages/ProjectPage';
import BoardPage from './pages/BoardPage';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/projects/:id/board" element={<BoardPage />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
