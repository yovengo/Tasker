import React from 'react';
import NavBar from './components/ui/NavBar/NavBar';
import SignUpPage from './components/ui/SignUpPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainPage from './components/page/MainPage';
import AuthLayout from './layouts/AuthLayout';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-150 flex flex-col">
      <NavBar />
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="auth" element={<AuthLayout />}>
          <Route index element={<Navigate to="/auth/signup" />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="*" element={<Navigate to="auth/signup" />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
