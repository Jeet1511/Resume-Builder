import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const scrollToTemplates = () => {
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        } else {
            document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                <span>Evo Frame</span>
            </Link>

            <div className={`navbar-links ${mobileOpen ? 'mobile-open' : ''}`}>
                <Link to="/" className="navbar-link" onClick={() => setMobileOpen(false)}>Home</Link>
                <button onClick={() => { scrollToTemplates(); setMobileOpen(false); }} className="navbar-link" style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', color: 'inherit', padding: 0 }}>Templates</button>
                {isAuthenticated && <Link to="/dashboard" className="navbar-link" onClick={() => setMobileOpen(false)}>Dashboard</Link>}
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
