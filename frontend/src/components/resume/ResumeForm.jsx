import { User, Briefcase, GraduationCap, Star, FolderOpen, Award, Globe, Plus, Trash2, FileText, Camera, Github, Layers, Mail, Phone, MapPin, Linkedin, Link } from 'lucide-react';
import { useRef, useState } from 'react';
import ImageCropper from './ImageCropper';

const iconSm = { size: 14, strokeWidth: 2 };
const iconLabel = { size: 13, strokeWidth: 2, style: { marginRight: '5px', verticalAlign: 'middle', opacity: 0.7 } };

const ResumeForm = ({ data, onChange }) => {
    const fileInputRef = useRef(null);
    const [rawImage, setRawImage] = useState(null);
    const [showCropper, setShowCropper] = useState(false);

    const updateField = (section, field, value) => {
        onChange({
            ...data,
            [section]: typeof field === 'string'
                ? { ...data[section], [field]: value }
                : value,
        });
    };

    const updateArrayItem = (section, index, field, value) => {
        const updated = [...data[section]];
        updated[index] = { ...updated[index], [field]: value };
        onChange({ ...data, [section]: updated });
    };

    const addArrayItem = (section, template) => {
        onChange({ ...data, [section]: [...data[section], { ...template }] });
    };

    const removeArrayItem = (section, index) => {
        const updated = data[section].filter((_, i) => i !== index);
        onChange({ ...data, [section]: updated });
    };

    const handleProfilePicture = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) {
            alert('Image must be under 2MB');
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setRawImage(reader.result);
            setShowCropper(true);
        };
        reader.readAsDataURL(file);
        // Reset file input so same file can be re-selected
        e.target.value = '';
    };

    const handleCropComplete = (croppedImage) => {
        onChange({ ...data, profilePicture: croppedImage });
        setShowCropper(false);
        setRawImage(null);
    };

    const handleCropCancel = () => {
        setShowCropper(false);
        setRawImage(null);
    };

    const removeProfilePicture = () => {
        onChange({ ...data, profilePicture: '' });
    };

    // Custom sections helpers
    const addCustomSection = () => {
        const sections = data.customSections || [];
        onChange({ ...data, customSections: [...sections, { title: '', items: [{ label: '', value: '' }] }] });
    };

    const updateCustomSectionTitle = (sectionIdx, title) => {
        const sections = [...(data.customSections || [])];
        sections[sectionIdx] = { ...sections[sectionIdx], title };
        onChange({ ...data, customSections: sections });
    };

    const addCustomItem = (sectionIdx) => {
        const sections = [...(data.customSections || [])];
        sections[sectionIdx] = { ...sections[sectionIdx], items: [...sections[sectionIdx].items, { label: '', value: '' }] };
        onChange({ ...data, customSections: sections });
    };

    const updateCustomItem = (sectionIdx, itemIdx, field, value) => {
        const sections = [...(data.customSections || [])];
        const items = [...sections[sectionIdx].items];
        items[itemIdx] = { ...items[itemIdx], [field]: value };
        sections[sectionIdx] = { ...sections[sectionIdx], items };
        onChange({ ...data, customSections: sections });
    };

    const removeCustomItem = (sectionIdx, itemIdx) => {
        const sections = [...(data.customSections || [])];
        sections[sectionIdx] = { ...sections[sectionIdx], items: sections[sectionIdx].items.filter((_, i) => i !== itemIdx) };
        onChange({ ...data, customSections: sections });
    };

    const removeCustomSection = (sectionIdx) => {
        onChange({ ...data, customSections: (data.customSections || []).filter((_, i) => i !== sectionIdx) });
    };

    return (
        <div>
            {/* Profile Picture */}
            <div className="builder-section">
                <div className="builder-section-header">
                    <h3 className="builder-section-title"><Camera {...iconSm} /> Profile Picture <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 400 }}>(optional)</span></h3>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)' }}>
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        style={{
                            width: '80px', height: '80px', borderRadius: '50%', border: '2px dashed var(--border-color)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                            overflow: 'hidden', background: 'var(--bg-glass)', flexShrink: 0,
                        }}
                    >
                        {data.profilePicture ? (
                            <img src={data.profilePicture} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <Camera size={24} color="var(--text-muted)" />
                        )}
                    </div>
                    <div>
                        <button className="btn btn-secondary btn-sm" onClick={() => fileInputRef.current?.click()} style={{ marginBottom: '0.5rem' }}>
                            Upload Photo
                        </button>
                        {data.profilePicture && (
                            <button className="btn btn-sm" onClick={removeProfilePicture} style={{ color: 'var(--error)', background: 'none', marginLeft: '0.5rem' }}>
                                Remove
                            </button>
                        )}
                        <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', marginTop: '4px' }}>Max 2MB, JPG/PNG</div>
                    </div>
                    <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleProfilePicture} style={{ display: 'none' }} />
                </div>
            </div>

            {/* Personal Info */}
            <div className="builder-section">
                <div className="builder-section-header">
                    <h3 className="builder-section-title"><User {...iconSm} /> Personal Information</h3>
                </div>
                <div className="builder-row">
                    <div className="form-group">
                        <label className="form-label"><User {...iconLabel} /> Full Name</label>
                        <input className="form-input" placeholder="John Doe" value={data.personalInfo.fullName} onChange={e => updateField('personalInfo', 'fullName', e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className="form-label"><Briefcase {...iconLabel} /> Job Title</label>
                        <input className="form-input" placeholder="Software Engineer" value={data.personalInfo.jobTitle} onChange={e => updateField('personalInfo', 'jobTitle', e.target.value)} />
                    </div>
                </div>
                <div className="builder-row" style={{ marginTop: 'var(--space-md)' }}>
                    <div className="form-group">
                        <label className="form-label"><Mail {...iconLabel} /> Email</label>
                        <input className="form-input" type="email" placeholder="email@example.com" value={data.personalInfo.email} onChange={e => updateField('personalInfo', 'email', e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className="form-label"><Phone {...iconLabel} /> Phone</label>
                        <input className="form-input" placeholder="+1 (555) 123-4567" value={data.personalInfo.phone} onChange={e => updateField('personalInfo', 'phone', e.target.value)} />
                    </div>
                </div>
                <div className="builder-row" style={{ marginTop: 'var(--space-md)' }}>
                    <div className="form-group">
                        <label className="form-label"><MapPin {...iconLabel} /> Address</label>
                        <input className="form-input" placeholder="City, State" value={data.personalInfo.address} onChange={e => updateField('personalInfo', 'address', e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className="form-label"><Linkedin {...iconLabel} /> LinkedIn</label>
                        <input className="form-input" placeholder="linkedin.com/in/username" value={data.personalInfo.linkedin} onChange={e => updateField('personalInfo', 'linkedin', e.target.value)} />
                    </div>
                </div>
                <div className="builder-row" style={{ marginTop: 'var(--space-md)' }}>
                    <div className="form-group">
                        <label className="form-label"><Github {...iconLabel} /> GitHub</label>
                        <input className="form-input" placeholder="github.com/username" value={data.personalInfo.github || ''} onChange={e => updateField('personalInfo', 'github', e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className="form-label"><Globe {...iconLabel} /> Website / Portfolio</label>
                        <input className="form-input" placeholder="yourwebsite.com" value={data.personalInfo.website} onChange={e => updateField('personalInfo', 'website', e.target.value)} />
                    </div>
                </div>
            </div>

            {/* Summary */}
            <div className="builder-section">
                <div className="builder-section-header">
                    <h3 className="builder-section-title"><FileText {...iconSm} /> Professional Summary</h3>
                </div>
                <div className="form-group">
                    <textarea className="form-input" placeholder="A brief professional summary highlighting your key qualifications..." value={data.summary} onChange={e => onChange({ ...data, summary: e.target.value })} rows={4} />
                </div>
            </div>

            {/* Experience */}
            <div className="builder-section">
                <div className="builder-section-header">
                    <h3 className="builder-section-title"><Briefcase {...iconSm} /> Work Experience</h3>
                    <button className="builder-add-btn" onClick={() => addArrayItem('experience', { company: '', position: '', startDate: '', endDate: '', current: false, description: '' })}><Plus {...iconSm} /> Add</button>
                </div>
                {data.experience.map((exp, i) => (
                    <div key={i} className="builder-entry">
                        <div className="builder-entry-header">
                            <span style={{ fontWeight: 600, fontSize: 'var(--fs-sm)' }}>Experience {i + 1}</span>
                            <button className="builder-entry-remove" onClick={() => removeArrayItem('experience', i)}><Trash2 {...iconSm} /></button>
                        </div>
                        <div className="builder-row">
                            <div className="form-group"><label className="form-label">Company</label><input className="form-input" placeholder="Company Name" value={exp.company} onChange={e => updateArrayItem('experience', i, 'company', e.target.value)} /></div>
                            <div className="form-group"><label className="form-label">Position</label><input className="form-input" placeholder="Job Title" value={exp.position} onChange={e => updateArrayItem('experience', i, 'position', e.target.value)} /></div>
                        </div>
                        <div className="builder-row" style={{ marginTop: 'var(--space-md)' }}>
                            <div className="form-group"><label className="form-label">Start Date</label><input className="form-input" placeholder="Jan 2021" value={exp.startDate} onChange={e => updateArrayItem('experience', i, 'startDate', e.target.value)} /></div>
                            <div className="form-group"><label className="form-label">End Date</label><input className="form-input" placeholder="Present" value={exp.endDate} onChange={e => updateArrayItem('experience', i, 'endDate', e.target.value)} disabled={exp.current} /></div>
                        </div>
                        <div className="form-group" style={{ marginTop: 'var(--space-md)' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                                <input type="checkbox" checked={exp.current} onChange={e => { updateArrayItem('experience', i, 'current', e.target.checked); if (e.target.checked) updateArrayItem('experience', i, 'endDate', 'Present'); }} />
                                Currently working here
                            </label>
                        </div>
                        <div className="form-group" style={{ marginTop: 'var(--space-md)' }}>
                            <label className="form-label">Description</label>
                            <textarea className="form-input" placeholder="Key responsibilities and achievements..." value={exp.description} onChange={e => updateArrayItem('experience', i, 'description', e.target.value)} rows={3} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Education */}
            <div className="builder-section">
                <div className="builder-section-header">
                    <h3 className="builder-section-title"><GraduationCap {...iconSm} /> Education</h3>
                    <button className="builder-add-btn" onClick={() => addArrayItem('education', { institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' })}><Plus {...iconSm} /> Add</button>
                </div>
                {data.education.map((edu, i) => (
                    <div key={i} className="builder-entry">
                        <div className="builder-entry-header">
                            <span style={{ fontWeight: 600, fontSize: 'var(--fs-sm)' }}>Education {i + 1}</span>
                            <button className="builder-entry-remove" onClick={() => removeArrayItem('education', i)}><Trash2 {...iconSm} /></button>
                        </div>
                        <div className="builder-row">
                            <div className="form-group"><label className="form-label">Institution</label><input className="form-input" placeholder="University Name" value={edu.institution} onChange={e => updateArrayItem('education', i, 'institution', e.target.value)} /></div>
                            <div className="form-group"><label className="form-label">Degree</label><input className="form-input" placeholder="Bachelor of Science" value={edu.degree} onChange={e => updateArrayItem('education', i, 'degree', e.target.value)} /></div>
                        </div>
                        <div className="builder-row" style={{ marginTop: 'var(--space-md)' }}>
                            <div className="form-group"><label className="form-label">Field of Study</label><input className="form-input" placeholder="Computer Science" value={edu.field} onChange={e => updateArrayItem('education', i, 'field', e.target.value)} /></div>
                            <div className="form-group"><label className="form-label">GPA</label><input className="form-input" placeholder="3.8" value={edu.gpa} onChange={e => updateArrayItem('education', i, 'gpa', e.target.value)} /></div>
                        </div>
                        <div className="builder-row" style={{ marginTop: 'var(--space-md)' }}>
                            <div className="form-group"><label className="form-label">Start Year</label><input className="form-input" placeholder="2014" value={edu.startDate} onChange={e => updateArrayItem('education', i, 'startDate', e.target.value)} /></div>
                            <div className="form-group"><label className="form-label">End Year</label><input className="form-input" placeholder="2018" value={edu.endDate} onChange={e => updateArrayItem('education', i, 'endDate', e.target.value)} /></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Skills */}
            <div className="builder-section">
                <div className="builder-section-header">
                    <h3 className="builder-section-title"><Star {...iconSm} /> Skills</h3>
                    <button className="builder-add-btn" onClick={() => addArrayItem('skills', { name: '', level: 'Intermediate' })}><Plus {...iconSm} /> Add</button>
                </div>
                {data.skills.map((skill, i) => (
                    <div key={i} className="builder-entry" style={{ padding: 'var(--space-md)' }}>
                        <div className="builder-row">
                            <div className="form-group"><input className="form-input" placeholder="Skill name" value={skill.name} onChange={e => updateArrayItem('skills', i, 'name', e.target.value)} /></div>
                            <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center' }}>
                                <select className="form-input" value={skill.level} onChange={e => updateArrayItem('skills', i, 'level', e.target.value)} style={{ flex: 1 }}>
                                    <option>Beginner</option><option>Intermediate</option><option>Advanced</option><option>Expert</option>
                                </select>
                                <button className="builder-entry-remove" onClick={() => removeArrayItem('skills', i)}><Trash2 {...iconSm} /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Projects */}
            <div className="builder-section">
                <div className="builder-section-header">
                    <h3 className="builder-section-title"><FolderOpen {...iconSm} /> Projects</h3>
                    <button className="builder-add-btn" onClick={() => addArrayItem('projects', { name: '', description: '', technologies: '', link: '' })}><Plus {...iconSm} /> Add</button>
                </div>
                {data.projects.map((proj, i) => (
                    <div key={i} className="builder-entry">
                        <div className="builder-entry-header">
                            <span style={{ fontWeight: 600, fontSize: 'var(--fs-sm)' }}>Project {i + 1}</span>
                            <button className="builder-entry-remove" onClick={() => removeArrayItem('projects', i)}><Trash2 {...iconSm} /></button>
                        </div>
                        <div className="builder-row">
                            <div className="form-group"><label className="form-label">Project Name</label><input className="form-input" placeholder="My Project" value={proj.name} onChange={e => updateArrayItem('projects', i, 'name', e.target.value)} /></div>
                            <div className="form-group"><label className="form-label">Technologies</label><input className="form-input" placeholder="React, Node.js" value={proj.technologies} onChange={e => updateArrayItem('projects', i, 'technologies', e.target.value)} /></div>
                        </div>
                        <div className="form-group" style={{ marginTop: 'var(--space-md)' }}>
                            <label className="form-label">Description</label>
                            <textarea className="form-input" placeholder="Brief project description..." value={proj.description} onChange={e => updateArrayItem('projects', i, 'description', e.target.value)} rows={2} />
                        </div>
                        <div className="form-group" style={{ marginTop: 'var(--space-md)' }}>
                            <label className="form-label">Link</label>
                            <input className="form-input" placeholder="github.com/project" value={proj.link} onChange={e => updateArrayItem('projects', i, 'link', e.target.value)} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Certifications */}
            <div className="builder-section">
                <div className="builder-section-header">
                    <h3 className="builder-section-title"><Award {...iconSm} /> Certifications</h3>
                    <button className="builder-add-btn" onClick={() => addArrayItem('certifications', { name: '', issuer: '', date: '' })}><Plus {...iconSm} /> Add</button>
                </div>
                {data.certifications.map((cert, i) => (
                    <div key={i} className="builder-entry" style={{ padding: 'var(--space-md)' }}>
                        <div className="builder-row">
                            <div className="form-group"><input className="form-input" placeholder="Certification name" value={cert.name} onChange={e => updateArrayItem('certifications', i, 'name', e.target.value)} /></div>
                            <div className="form-group"><input className="form-input" placeholder="Issuing Organization" value={cert.issuer} onChange={e => updateArrayItem('certifications', i, 'issuer', e.target.value)} /></div>
                        </div>
                        <div style={{ display: 'flex', gap: 'var(--space-sm)', marginTop: 'var(--space-sm)', alignItems: 'center' }}>
                            <input className="form-input" placeholder="Year" value={cert.date} onChange={e => updateArrayItem('certifications', i, 'date', e.target.value)} style={{ flex: 1 }} />
                            <button className="builder-entry-remove" onClick={() => removeArrayItem('certifications', i)}><Trash2 {...iconSm} /></button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Languages */}
            <div className="builder-section">
                <div className="builder-section-header">
                    <h3 className="builder-section-title"><Globe {...iconSm} /> Languages</h3>
                    <button className="builder-add-btn" onClick={() => addArrayItem('languages', { name: '', proficiency: 'Intermediate' })}><Plus {...iconSm} /> Add</button>
                </div>
                {data.languages.map((lang, i) => (
                    <div key={i} className="builder-entry" style={{ padding: 'var(--space-md)' }}>
                        <div className="builder-row">
                            <div className="form-group"><input className="form-input" placeholder="Language" value={lang.name} onChange={e => updateArrayItem('languages', i, 'name', e.target.value)} /></div>
                            <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center' }}>
                                <select className="form-input" value={lang.proficiency} onChange={e => updateArrayItem('languages', i, 'proficiency', e.target.value)} style={{ flex: 1 }}>
                                    <option>Basic</option><option>Conversational</option><option>Intermediate</option><option>Fluent</option><option>Native</option>
                                </select>
                                <button className="builder-entry-remove" onClick={() => removeArrayItem('languages', i)}><Trash2 {...iconSm} /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Custom Sections */}
            <div className="builder-section">
                <div className="builder-section-header">
                    <h3 className="builder-section-title"><Layers {...iconSm} /> Custom Sections</h3>
                    <button className="builder-add-btn" onClick={addCustomSection}><Plus {...iconSm} /> Add Section</button>
                </div>
                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', marginBottom: 'var(--space-md)' }}>
                    Add custom sections like GitHub stats, open source contributions, hobbies, volunteering, publications, etc.
                </div>
                {(data.customSections || []).map((section, si) => (
                    <div key={si} className="builder-entry">
                        <div className="builder-entry-header">
                            <input
                                className="form-input"
                                placeholder="Section Title (e.g. GitHub Repos, Open Source, Hobbies)"
                                value={section.title}
                                onChange={e => updateCustomSectionTitle(si, e.target.value)}
                                style={{ fontWeight: 700, fontSize: 'var(--fs-sm)', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-color)', borderRadius: 0, padding: '4px 0', flex: 1 }}
                            />
                            <button className="builder-entry-remove" onClick={() => removeCustomSection(si)}><Trash2 {...iconSm} /></button>
                        </div>
                        {section.items.map((item, ii) => (
                            <div key={ii} className="builder-row" style={{ marginTop: 'var(--space-sm)' }}>
                                <div className="form-group">
                                    <input className="form-input" placeholder="Label (e.g. Repo Name)" value={item.label} onChange={e => updateCustomItem(si, ii, 'label', e.target.value)} />
                                </div>
                                <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center' }}>
                                    <input className="form-input" placeholder="Value / Description" value={item.value} onChange={e => updateCustomItem(si, ii, 'value', e.target.value)} style={{ flex: 1 }} />
                                    <button className="builder-entry-remove" onClick={() => removeCustomItem(si, ii)}><Trash2 {...iconSm} /></button>
                                </div>
                            </div>
                        ))}
                        <button className="builder-add-btn" onClick={() => addCustomItem(si)} style={{ marginTop: 'var(--space-sm)' }}><FiPlus /> Add Item</button>
                    </div>
                ))}
            </div>
            {/* Image Cropper Modal */}
            {showCropper && rawImage && (
                <ImageCropper
                    imageSrc={rawImage}
                    onCropComplete={handleCropComplete}
                    onCancel={handleCropCancel}
                />
            )}
        </div>
    );
};

export default ResumeForm;
