import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { templates } from '../data/templates';
import api from '../services/api';
import { FiPlus, FiEdit2, FiTrash2, FiDownload, FiGrid, FiFileText, FiSettings, FiLayout } from 'react-icons/fi';

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('resumes');
    const [showTemplateModal, setShowTemplateModal] = useState(false);

    useEffect(() => {
        fetchResumes();
    }, []);

    const fetchResumes = async () => {
        try {
            const res = await api.get('/resumes');
            setResumes(res.data);
        } catch (err) {
            console.error('Failed to fetch resumes:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this resume?')) return;
        try {
            await api.delete(`/resumes/${id}`);
            setResumes(resumes.filter(r => r._id !== id));
        } catch (err) {
            console.error('Failed to delete resume:', err);
        }
    };

    const handleCreateNew = (templateId) => {
        navigate(`/build/${templateId}`);
    };

    const handleEdit = (resumeId) => {
        navigate(`/edit/${resumeId}`);
    };

    const sidebarItems = [
        { key: 'resumes', icon: <FiFileText />, label: 'My Resumes' },
        { key: 'templates', icon: <FiLayout />, label: 'Templates' },
        { key: 'settings', icon: <FiSettings />, label: 'Settings' },
    ];

    return (
        <div className="dashboard">
            {/* Sidebar */}
            <aside className="sidebar">
                <div style={{ padding: '0 var(--space-md)', marginBottom: 'var(--space-xl)' }}>
                    <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-muted)' }}>Welcome back,</div>
                    <div style={{ fontSize: 'var(--fs-md)', fontWeight: '700', marginTop: '4px' }}>{user?.name || 'User'}</div>
                </div>

                <div className="sidebar-section-title">Menu</div>
                <div className="sidebar-menu">
                    {sidebarItems.map(item => (
                        <button
                            key={item.key}
                            className={`sidebar-item ${activeTab === item.key ? 'active' : ''}`}
                            onClick={() => setActiveTab(item.key)}
                        >
                            <span className="sidebar-item-icon">{item.icon}</span>
                            {item.label}
                        </button>
                    ))}
                </div>
            </aside>

            {/* Main Content */}
            <main className="dashboard-content">
                {activeTab === 'resumes' && (
                    <>
                        <div className="dashboard-header">
                            <div>
                                <h1 className="dashboard-title">My Resumes</h1>
                                <p className="dashboard-subtitle">Manage and edit your saved resumes</p>
                            </div>
                            <button className="btn btn-primary" onClick={() => setShowTemplateModal(true)}>
                                <FiPlus /> Create New
                            </button>
                        </div>

                        {loading ? (
                            <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
                                <div className="spinner"></div>
                            </div>
                        ) : (
                            <div className="resumes-grid">
                                <div className="new-resume-card" onClick={() => setShowTemplateModal(true)}>
                                    <div className="new-resume-icon"><FiPlus /></div>
                                    <span>Create New Resume</span>
                                </div>

                                {resumes.map(resume => {
                                    const template = templates.find(t => t.id === resume.templateId);
                                    return (
                                        <div key={resume._id} className="glass-card resume-card">
                                            <div className="resume-card-preview" style={{ background: template?.color || '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 'var(--fs-xl)', fontWeight: '700' }}>
                                                <div style={{ textAlign: 'center', padding: '1rem' }}>
                                                    <div style={{ fontSize: 'var(--fs-sm)', opacity: 0.7, marginBottom: '0.5rem' }}>{template?.name || 'Template'}</div>
                                                    <div>{resume.personalInfo?.fullName || resume.title}</div>
                                                </div>
                                            </div>
                                            <div className="resume-card-body">
                                                <div className="resume-card-title">{resume.title || 'Untitled Resume'}</div>
                                                <div className="resume-card-date">
                                                    Updated {new Date(resume.updatedAt).toLocaleDateString()}
                                                </div>
                                                <div className="resume-card-actions">
                                                    <button className="btn btn-secondary btn-sm" onClick={() => handleEdit(resume._id)}>
                                                        <FiEdit2 /> Edit
                                                    </button>
                                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(resume._id)}>
                                                        <FiTrash2 />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </>
                )}

                {activeTab === 'templates' && (
                    <>
                        <div className="dashboard-header">
                            <div>
                                <h1 className="dashboard-title">Template Gallery</h1>
                                <p className="dashboard-subtitle">Choose a template to start building</p>
                            </div>
                        </div>
                        <div className="templates-grid">
                            {templates.map(template => (
                                <div key={template.id} className="glass-card template-card" onClick={() => handleCreateNew(template.id)}>
                                    <div className="template-preview" style={{
                                        background: template.color,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexDirection: 'column',
                                        gap: '0.5rem',
                                        color: 'white',
                                        padding: '2rem',
                                    }}>
                                        <div style={{ fontSize: 'var(--fs-xl)', fontWeight: '700' }}>{template.name}</div>
                                        <div style={{ fontSize: 'var(--fs-xs)', opacity: 0.7 }}>{template.description}</div>
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
                    </>
                )}

                {activeTab === 'settings' && (
                    <>
                        <div className="dashboard-header">
                            <div>
                                <h1 className="dashboard-title">Settings</h1>
                                <p className="dashboard-subtitle">Manage your account preferences</p>
                            </div>
                        </div>
                        <div className="glass-card" style={{ padding: 'var(--space-2xl)' }}>
                            <div className="form-group" style={{ marginBottom: 'var(--space-lg)' }}>
                                <label className="form-label">Full Name</label>
                                <input className="form-input" value={user?.name || ''} readOnly />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input className="form-input" value={user?.email || ''} readOnly />
                            </div>
                        </div>
                    </>
                )}

                {/* Template Selection Modal */}
                {showTemplateModal && (
                    <div className="modal-overlay" onClick={() => setShowTemplateModal(false)}>
                        <div className="modal" onClick={e => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2 className="modal-title">Choose a Template</h2>
                                <button className="modal-close" onClick={() => setShowTemplateModal(false)}>✕</button>
                            </div>
                            <div className="templates-grid">
                                {templates.map(template => (
                                    <div
                                        key={template.id}
                                        className="glass-card template-card"
                                        onClick={() => { setShowTemplateModal(false); handleCreateNew(template.id); }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="template-preview" style={{
                                            background: template.color,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            fontSize: 'var(--fs-lg)',
                                            fontWeight: '700',
                                        }}>
                                            {template.name}
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
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
