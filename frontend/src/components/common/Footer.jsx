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

            <div className="footer-bottom">
                <span>© 2026 ResumeForge. All rights reserved.</span>
                <div className="footer-socials">
                    <a href="#" className="footer-social"><FiGithub /></a>
                    <a href="#" className="footer-social"><FiTwitter /></a>
                    <a href="#" className="footer-social"><FiLinkedin /></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
