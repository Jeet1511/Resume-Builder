import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import BuildResume from '../pages/BuildResume';
import ProtectedRoute from '../components/common/ProtectedRoute';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            } />
            <Route path="/build/temp/:templateId" element={<BuildResume mode="temp" />} />
            <Route path="/build/:templateId" element={
                <ProtectedRoute>
                    <BuildResume mode="permanent" />
                </ProtectedRoute>
            } />
            <Route path="/edit/:resumeId" element={
                <ProtectedRoute>
                    <BuildResume mode="edit" />
                </ProtectedRoute>
            } />
        </Routes>
    );
};

export default AppRoutes;
