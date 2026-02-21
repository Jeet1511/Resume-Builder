import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div>
                    <div className="footer-brand">
                        <span>ResumeForge</span>
                    </div>
                    <p className="footer-description">
                        Create professional resumes in minutes with our stunning templates.
                        Stand out from the crowd and land your dream job.
                    </p>
                </div>

                <div>
                    <h4 className="footer-title">Product</h4>
                    <div className="footer-links">
                        <Link to="/" className="footer-link">Templates</Link>
                        <Link to="/" className="footer-link">Features</Link>
                        <Link to="/" className="footer-link">Pricing</Link>
                        <Link to="/" className="footer-link">FAQ</Link>
                    </div>
                </div>

                <div>
                    <h4 className="footer-title">Resources</h4>
                    <div className="footer-links">
                        <Link to="/" className="footer-link">Resume Tips</Link>
                        <Link to="/" className="footer-link">Cover Letters</Link>
                        <Link to="/" className="footer-link">Career Blog</Link>
                        <Link to="/" className="footer-link">Help Center</Link>
                    </div>
                </div>

                <div>
                    <h4 className="footer-title">Company</h4>
                    <div className="footer-links">
                        <Link to="/" className="footer-link">About Us</Link>
                        <Link to="/" className="footer-link">Contact</Link>
                        <Link to="/" className="footer-link">Privacy</Link>
                        <Link to="/" className="footer-link">Terms</Link>
                    </div>
                </div>
            </div>

            <div className="footer-bottom" style={{ flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '1px', textTransform: 'uppercase' }}>Creator</span>
                    <a href="https://github.com/Jeet1511" target="_blank" rel="noopener noreferrer" className="footer-social" style={{ display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '13px' }}>
                        <FiGithub /> jeet1511
                    </a>
                    <a href="https://instagram.com/_echo.del.alma_" target="_blank" rel="noopener noreferrer" className="footer-social" style={{ display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '13px' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                        _echo.del.alma_
                    </a>
                    <a href="mailto:jeetmondal@gmail.com" className="footer-social" style={{ display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '13px' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                        Jeet (jeetmondal@gmail.com)
                    </a>
                </div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>© 2026 ResumeForge. All rights reserved.</span>
            </div>
        </footer>
    );
};

export default Footer;
