import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                <span>ResumeForge</span>
            </Link>

            <div className="navbar-links">
                <Link to="/" className="navbar-link">Home</Link>
                <Link to="/#templates" className="navbar-link">Templates</Link>
                {isAuthenticated && <Link to="/dashboard" className="navbar-link">Dashboard</Link>}
            </div>

            <div className="navbar-actions">
                {isAuthenticated ? (
                    <>
                        <Link to="/dashboard" className="navbar-user">
                            <div className="navbar-avatar">
                                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                            <span>{user?.name || 'User'}</span>
                        </Link>
                        <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="btn btn-secondary btn-sm">Login</Link>
                        <Link to="/signup" className="btn btn-primary btn-sm">Sign Up Free</Link>
                    </>
                )}
            </div>

            <button className="navbar-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <FiX /> : <FiMenu />}
            </button>
        </nav>
    );
};

export default Navbar;
