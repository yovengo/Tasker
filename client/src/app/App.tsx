import React from 'react';
import SignUpPage from './components/ui/SignUpPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainPage from './components/page/MainPage';
import AuthLayout from './layouts/AuthLayout';
import LoginPage from './components/ui/LoginPage';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-150 flex flex-col">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
        </Route>
        <Route path="auth" element={<AuthLayout />}>
          <Route index element={<Navigate to="/auth/signup" />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="*" element={<Navigate to="auth/signup" />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
