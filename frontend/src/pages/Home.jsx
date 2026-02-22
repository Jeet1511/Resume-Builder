import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { templates, sampleResumeData } from '../data/templates';
import { FiZap, FiLayout, FiDownload, FiShield, FiArrowRight, FiStar } from 'react-icons/fi';
import TemplatePreviewMini from '../components/resume/TemplatePreviewMini';

const Home = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const features = [
        {
            icon: <FiLayout />,
            title: '12 Unique Templates',
            description: 'Choose from our curated collection of industry-specific, ATS-friendly resume templates designed by career experts.',
        },
        {
            icon: <FiZap />,
            title: 'Lightning Fast Builder',
            description: 'Build your resume in minutes with our intuitive drag-and-drop editor. Real-time preview shows changes instantly.',
        },
        {
            icon: <FiDownload />,
            title: 'Export PDF & Word',
            description: 'Download your polished resume in PDF or Word format, ready to submit to any employer or applicant tracking system.',
        },
        {
            icon: <FiShield />,
            title: 'Save & Access Anywhere',
            description: 'Create an account to save your resumes securely. Edit and update them anytime from any device.',
        },
    ];

    const handleBuildTemp = (templateId) => {
        navigate(`/build/temp/${templateId}`);
    };

    const handleBuildPermanent = (templateId) => {
        if (isAuthenticated) {
            navigate(`/build/${templateId}`);
        } else {
            navigate('/login', { state: { redirect: `/build/${templateId}` } });
        }
    };

    return (
        <div>
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-orb hero-orb-1"></div>
                <div className="hero-orb hero-orb-2"></div>
                <div className="hero-orb hero-orb-3"></div>

                <div className="hero-content">
                    <div className="hero-badge">
                        <FiStar style={{ color: '#ffd93d' }} />
                        <span>Trusted by 50,000+ professionals</span>
                    </div>

                    <h1 className="hero-title">
                        Build Your <span className="highlight">Dream Resume</span> in Minutes
                    </h1>

                    <p className="hero-subtitle">
                        Create stunning, ATS-friendly resumes with our professional templates.
                        No design skills needed — just fill in your details and export.
                    </p>

                    <div className="hero-actions">
                        <button onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })} className="btn btn-primary btn-lg">
                            Browse Templates <FiArrowRight />
                        </button>
                        {!isAuthenticated && (
                            <Link to="/signup" className="btn btn-secondary btn-lg">
                                Create Free Account
                            </Link>
                        )}
                    </div>

                    <div className="hero-stats">
                        <div className="hero-stat">
                            <div className="hero-stat-value">12</div>
                            <div className="hero-stat-label">Pro Templates</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-value">PDF</div>
                            <div className="hero-stat-label">& Word Export</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-value">100%</div>
                            <div className="hero-stat-label">Free to Try</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="section">
                <div className="section-header">
                    <h2 className="section-title">
                        Everything You Need to <span className="highlight">Land the Job</span>
                    </h2>
                    <p className="section-subtitle">
                        Evo Frame gives you all the tools to create a professional resume that gets you noticed.
                    </p>
                </div>

                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="glass-card feature-card">
                            <div className="feature-icon">{feature.icon}</div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Templates Section */}
            <section className="section" id="templates">
                <div className="section-header">
                    <h2 className="section-title">
                        Choose Your <span className="highlight">Perfect Template</span>
                    </h2>
                    <p className="section-subtitle">
                        12 professionally designed templates for every industry and career level.
                        Try any template for free — no signup required.
                    </p>
                </div>

                <div className="templates-grid">
                    {templates.map((template) => (
                        <div key={template.id} className="glass-card template-card">
                            <div className="template-preview" style={{ position: 'relative' }}>
                                <TemplatePreviewMini
                                    template={template}
                                    data={sampleResumeData}
                                    color={template.color}
                                    accent={template.accent}
                                />
                                {template.recommended && (
                                    <div style={{
                                        position: 'absolute', top: '8px', right: '8px',
                                        background: 'linear-gradient(135deg, #6c63ff, #a78bfa)',
                                        color: '#fff', fontSize: '10px', fontWeight: 600,
                                        padding: '3px 10px', borderRadius: '20px',
                                        boxShadow: '0 2px 8px rgba(108,99,255,0.4)',
                                        letterSpacing: '0.3px', whiteSpace: 'nowrap',
                                        zIndex: 2,
                                    }}>{template.recommendedLabel}</div>
                                )}
                                <div className="template-overlay">
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => handleBuildTemp(template.id)}
                                    >
                                        Try Free
                                    </button>
                                    <button
                                        className="btn btn-secondary btn-sm"
                                        onClick={() => handleBuildPermanent(template.id)}
                                    >
                                        Save & Build
                                    </button>
                                </div>
                            </div>
                            <div className="template-info">
                                <div>
                                    <div className="template-name">{template.name}</div>
                                    <div className="template-category">{template.category}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="section" style={{ textAlign: 'center', paddingBottom: '6rem' }}>
                <h2 className="section-title" style={{ marginBottom: '1rem' }}>
                    Ready to Build Your <span className="highlight">Resume?</span>
                </h2>
                <p className="section-subtitle" style={{ marginBottom: '2rem' }}>
                    Start building for free today. No credit card required.
                </p>
                <div className="hero-actions">
                    <button onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })} className="btn btn-primary btn-lg">
                        Get Started Now <FiArrowRight />
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Home;
