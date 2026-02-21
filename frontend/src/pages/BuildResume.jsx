import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { templates, defaultResumeData } from '../data/templates';
import ResumeForm from '../components/resume/ResumeForm';
import ResumePreview from '../components/resume/ResumePreview';
import api from '../services/api';
import { Save, Download, FileText, ArrowLeft, Palette, Check } from 'lucide-react';

const BuildResume = ({ mode = 'temp' }) => {
    const { templateId, resumeId } = useParams();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const previewRef = useRef(null);

    const [resumeData, setResumeData] = useState({ ...defaultResumeData });
    const [currentTemplateId, setCurrentTemplateId] = useState(parseInt(templateId) || 1);
    const [title, setTitle] = useState('Untitled Resume');
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState(null);

    // Color customization state
    const [customColor, setCustomColor] = useState(null);
    const [customAccent, setCustomAccent] = useState(null);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [tempColor, setTempColor] = useState('#374151');
    const [tempAccent, setTempAccent] = useState('#6b7280');

    const currentTemplate = templates.find(t => t.id === currentTemplateId) || templates[0];
    const activeColor = customColor || currentTemplate.color;
    const activeAccent = customAccent || currentTemplate.accent;

    // Reset custom colors when template changes
    useEffect(() => {
        setCustomColor(null);
        setCustomAccent(null);
        setShowColorPicker(false);
    }, [currentTemplateId]);

    // Load existing resume if editing
    useEffect(() => {
        if (mode === 'edit' && resumeId) {
            loadResume(resumeId);
        }
    }, [mode, resumeId]);

    const loadResume = async (id) => {
        try {
            const res = await api.get(`/resumes/${id}`);
            setResumeData({
                profilePicture: res.data.profilePicture || '',
                personalInfo: res.data.personalInfo || defaultResumeData.personalInfo,
                summary: res.data.summary || '',
                experience: res.data.experience || [],
                education: res.data.education || [],
                skills: res.data.skills || [],
                projects: res.data.projects || [],
                certifications: res.data.certifications || [],
                languages: res.data.languages || [],
                customSections: res.data.customSections || [],
            });
            setCurrentTemplateId(res.data.templateId || 1);
            setTitle(res.data.title || 'Untitled Resume');
        } catch (err) {
            showToast('Failed to load resume', 'error');
        }
    };

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleSave = async () => {
        if (!isAuthenticated) {
            navigate('/login', { state: { redirect: window.location.pathname } });
            return;
        }

        setSaving(true);
        try {
            const payload = {
                ...resumeData,
                templateId: currentTemplateId,
                title,
            };

            if (mode === 'edit' && resumeId) {
                await api.put(`/resumes/${resumeId}`, payload);
                showToast('Resume updated successfully!');
            } else {
                const res = await api.post('/resumes', payload);
                showToast('Resume saved successfully!');
                navigate(`/edit/${res.data._id}`, { replace: true });
            }
        } catch (err) {
            showToast('Failed to save resume', 'error');
        } finally {
            setSaving(false);
        }
    };

    const handleExportPDF = async () => {
        const element = previewRef.current;
        if (!element) return;

        try {
            const html2pdf = (await import('html2pdf.js')).default;
            const opt = {
                margin: 0,
                filename: `${resumeData.personalInfo.fullName || 'resume'}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
            };
            html2pdf().set(opt).from(element).save();
            showToast('PDF exported successfully!');
        } catch (err) {
            showToast('Failed to export PDF', 'error');
        }
    };

    const handleExportWord = async () => {
        try {
            const preBody = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' 
              xmlns:w='urn:schemas-microsoft-com:office:word' 
              xmlns='http://www.w3.org/TR/REC-html40'>
        <head><meta charset='utf-8'><title>Resume</title></head><body>`;
            const postBody = '</body></html>';
            const html = preBody + (previewRef.current?.innerHTML || '') + postBody;

            const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${resumeData.personalInfo.fullName || 'resume'}.doc`;
            a.click();
            URL.revokeObjectURL(url);
            showToast('Word document exported!');
        } catch (err) {
            showToast('Failed to export Word document', 'error');
        }
    };

    const applyPresetColor = (preset) => {
        setCustomColor(preset.color);
        setCustomAccent(preset.accent);
        setShowColorPicker(false);
    };

    const applyCustomColor = () => {
        setCustomColor(tempColor);
        setCustomAccent(tempAccent);
        setShowColorPicker(false);
    };

    const isActivePreset = (preset) => activeColor === preset.color && activeAccent === preset.accent;

    return (
        <div className="builder-page">
            {/* Left Panel — Form */}
            <div className="builder-form-panel">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
                    <button className="btn btn-secondary btn-sm" onClick={() => navigate(-1)}>
                        <ArrowLeft size={16} />
                    </button>
                    <div style={{ flex: 1 }}>
                        <input
                            className="form-input"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Resume Title"
                            style={{ fontWeight: '600', fontSize: 'var(--fs-lg)', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-color)', borderRadius: 0, padding: '0.5rem 0' }}
                        />
                    </div>
                </div>

                {/* Template Selector */}
                <div className="builder-section">
                    <div className="builder-section-header">
                        <h3 className="builder-section-title">
                            <FileText size={14} strokeWidth={2} /> Template
                        </h3>
                    </div>
                    <select
                        className="form-input"
                        value={currentTemplateId}
                        onChange={(e) => setCurrentTemplateId(parseInt(e.target.value))}
                        style={{ width: '100%' }}
                    >
                        {templates.map(t => (
                            <option key={t.id} value={t.id}>{t.recommended ? '⭐ ' : ''}{t.name} — {t.category}</option>
                        ))}
                    </select>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>
                        {currentTemplate.description}
                    </p>
                </div>

                {/* Color Theme Picker */}
                <div className="builder-section">
                    <div className="builder-section-header">
                        <h3 className="builder-section-title">
                            <Palette size={14} strokeWidth={2} /> Color Theme
                        </h3>
                    </div>

                    {/* Preset colors */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
                        {currentTemplate.colorPresets?.map((preset, i) => (
                            <button
                                key={i}
                                onClick={() => applyPresetColor(preset)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '8px',
                                    padding: '8px 14px', borderRadius: '10px',
                                    background: isActivePreset(preset) ? `${preset.accent}20` : 'var(--bg-glass)',
                                    border: isActivePreset(preset) ? `2px solid ${preset.accent}` : '1px solid var(--border-color)',
                                    cursor: 'pointer', transition: 'all 0.2s',
                                    color: 'var(--text-primary)', fontSize: '13px',
                                }}
                            >
                                <div style={{ display: 'flex', gap: '3px' }}>
                                    <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: preset.color, border: '1px solid rgba(255,255,255,0.15)' }} />
                                    <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: preset.accent, border: '1px solid rgba(255,255,255,0.15)' }} />
                                </div>
                                <span style={{ fontWeight: 500 }}>{preset.name}</span>
                                {isActivePreset(preset) && <Check size={12} strokeWidth={3} color={preset.accent} />}
                            </button>
                        ))}
                    </div>

                    {/* Custom color picker toggle */}
                    <button
                        onClick={() => {
                            setShowColorPicker(!showColorPicker);
                            setTempColor(activeColor);
                            setTempAccent(activeAccent);
                        }}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            padding: '6px 12px', borderRadius: '8px', fontSize: '12px',
                            background: showColorPicker ? 'var(--bg-glass-hover)' : 'transparent',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-secondary)', cursor: 'pointer',
                        }}
                    >
                        <Palette size={12} /> Custom Colors
                    </button>

                    {/* Custom color inputs */}
                    {showColorPicker && (
                        <div style={{
                            marginTop: '12px', padding: '14px',
                            background: 'var(--bg-glass)', border: '1px solid var(--border-color)',
                            borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '12px',
                        }}>
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Primary Color</label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <input
                                            type="color"
                                            value={tempColor}
                                            onChange={(e) => setTempColor(e.target.value)}
                                            style={{ width: '36px', height: '36px', border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'transparent', padding: 0 }}
                                        />
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={tempColor}
                                            onChange={(e) => setTempColor(e.target.value)}
                                            style={{ flex: 1, padding: '6px 10px', fontSize: '12px', fontFamily: 'monospace' }}
                                        />
                                    </div>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Accent Color</label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <input
                                            type="color"
                                            value={tempAccent}
                                            onChange={(e) => setTempAccent(e.target.value)}
                                            style={{ width: '36px', height: '36px', border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'transparent', padding: 0 }}
                                        />
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={tempAccent}
                                            onChange={(e) => setTempAccent(e.target.value)}
                                            style={{ flex: 1, padding: '6px 10px', fontSize: '12px', fontFamily: 'monospace' }}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Preview strip */}
                            <div style={{ display: 'flex', gap: '4px', borderRadius: '6px', overflow: 'hidden', height: '24px' }}>
                                <div style={{ flex: 2, background: tempColor }} />
                                <div style={{ flex: 1, background: tempAccent }} />
                            </div>
                            <button
                                onClick={applyCustomColor}
                                className="btn btn-primary btn-sm"
                                style={{ alignSelf: 'flex-end' }}
                            >
                                <Check size={12} /> Apply
                            </button>
                        </div>
                    )}
                </div>

                <ResumeForm data={resumeData} onChange={setResumeData} />
            </div>

            {/* Right Panel — Preview */}
            <div className="builder-preview-panel">
                <div className="preview-container">
                    <div className="preview-toolbar">
                        <span className="preview-toolbar-title">Live Preview — {currentTemplate.name}</span>
                        <div className="preview-toolbar-actions">
                            {(mode !== 'temp' || isAuthenticated) && (
                                <button className="btn btn-primary btn-sm" onClick={handleSave} disabled={saving}>
                                    <Save size={14} /> {saving ? 'Saving...' : 'Save'}
                                </button>
                            )}
                            <button className="btn btn-secondary btn-sm" onClick={handleExportPDF}>
                                <Download size={14} /> PDF
                            </button>
                            <button className="btn btn-secondary btn-sm" onClick={handleExportWord}>
                                <FileText size={14} /> Word
                            </button>
                        </div>
                    </div>

                    <div className="preview-page" ref={previewRef}>
                        <ResumePreview
                            data={resumeData}
                            templateId={currentTemplateId}
                            customColor={customColor}
                            customAccent={customAccent}
                        />
                    </div>
                </div>
            </div>

            {/* Toast */}
            {toast && (
                <div className={`toast toast-${toast.type}`}>
                    {toast.message}
                </div>
            )}
        </div>
    );
};

export default BuildResume;
