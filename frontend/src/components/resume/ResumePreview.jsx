import { templates } from '../../data/templates';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

const ResumePreview = ({ data, templateId, customColor, customAccent }) => {
    const t = templates.find(tp => tp.id === templateId) || templates[0];
    const color = customColor || t.color;
    const accent = customAccent || t.accent;
    const p = data?.personalInfo || {};
    const pic = data?.profilePicture;

    // ── Shared helpers ──
    const Avatar = ({ size = 72, border = '3px solid #fff' }) =>
        pic ? <img src={pic} alt="" style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', border, flexShrink: 0 }} /> : null;

    const ico = (sz = 12) => ({ width: sz, height: sz, flexShrink: 0, verticalAlign: 'middle', marginRight: 5 });

    const contactEntries = () => [
        p.email && { icon: <Mail style={ico()} />, text: p.email },
        p.phone && { icon: <Phone style={ico()} />, text: p.phone },
        p.address && { icon: <MapPin style={ico()} />, text: p.address },
        p.linkedin && { icon: <Linkedin style={ico()} />, text: p.linkedin },
        p.github && { icon: <Github style={ico()} />, text: p.github },
        p.website && { icon: <Globe style={ico()} />, text: p.website },
    ].filter(Boolean);

    const ContactLine = ({ clr = '#666' }) => {
        const entries = contactEntries();
        return entries.length ? (
            <div style={{ fontSize: '11.5px', color: clr, marginTop: '6px', lineHeight: 2, display: 'flex', flexWrap: 'wrap', gap: '4px 16px' }}>
                {entries.map((e, i) => <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>{e.icon}{e.text}</span>)}
            </div>
        ) : null;
    };

    const ContactStack = ({ clr = '#fff' }) => (
        <div style={{ fontSize: '11px', color: clr, lineHeight: 2.2 }}>
            {contactEntries().map((e, i) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, opacity: 0.85 }}>{e.icon}{e.text}</div>)}
        </div>
    );

    const SectionTitle = ({ children, c = color, acc = accent, style: extra = {} }) => (
        <div style={{ fontSize: '15px', fontWeight: 700, color: c, textTransform: 'uppercase', letterSpacing: '1.5px', marginTop: '18px', marginBottom: '8px', paddingBottom: '5px', borderBottom: `2px solid ${acc}`, ...extra }}>{children}</div>
    );

    const renderExp = (accentClr) => data.experience?.map((exp, i) => (
        <div key={i} style={{ marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '14px' }}>{exp.position}</strong>
                <span style={{ fontSize: '11.5px', color: '#777', whiteSpace: 'nowrap' }}>{exp.startDate} — {exp.endDate || 'Present'}</span>
            </div>
            <div style={{ color: accentClr || accent, fontWeight: 600, fontSize: '13px' }}>{exp.company}</div>
            {exp.description && <div style={{ fontSize: '12.5px', color: '#444', marginTop: '4px', lineHeight: 1.55 }}>{exp.description}</div>}
        </div>
    ));

    const renderEdu = () => data.education?.map((edu, i) => (
        <div key={i} style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '14px' }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</strong>
                <span style={{ fontSize: '11.5px', color: '#777' }}>{edu.startDate} — {edu.endDate}</span>
            </div>
            <div style={{ fontSize: '12.5px', color: '#444' }}>{edu.institution}{edu.gpa ? ` • GPA: ${edu.gpa}` : ''}</div>
        </div>
    ));

    const SkillBadges = ({ bg, fg }) => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {data.skills?.map((sk, i) => (
                <span key={i} style={{ background: bg || `${accent}18`, color: fg || accent, padding: '3px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: 500 }}>{sk.name}{sk.level ? ` (${sk.level})` : ''}</span>
            ))}
        </div>
    );

    const SkillBars = ({ barColor, bgColor = '#e5e7eb' }) =>
        data.skills?.map((sk, i) => {
            const pct = { Beginner: 25, Intermediate: 50, Advanced: 75, Expert: 95 }[sk.level] || 50;
            return (
                <div key={i} style={{ marginBottom: '7px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '3px' }}><span>{sk.name}</span><span style={{ opacity: 0.6 }}>{sk.level}</span></div>
                    <div style={{ height: '5px', background: bgColor, borderRadius: '3px' }}><div style={{ width: `${pct}%`, height: '100%', background: barColor || accent, borderRadius: '3px' }} /></div>
                </div>
            );
        });

    const SkillGrid = ({ textColor = '#333' }) => (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px 20px' }}>
            {data.skills?.map((sk, i) => (
                <div key={i} style={{ fontSize: '12px', color: textColor, display: 'flex', justifyContent: 'space-between', padding: '3px 0', borderBottom: '1px dotted #ddd' }}>
                    <span>{sk.name}</span>
                    <span style={{ color: accent, fontWeight: 600, fontSize: '11px' }}>{sk.level}</span>
                </div>
            ))}
        </div>
    );

    const renderProjects = (linkClr) => data.projects?.map((proj, i) => (
        <div key={i} style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '13.5px' }}>{proj.name}</strong>
                {proj.link && <span style={{ fontSize: '10.5px', color: linkClr || accent }}>{proj.link}</span>}
            </div>
            {proj.technologies && <div style={{ fontSize: '11px', color: '#777', fontStyle: 'italic' }}>{proj.technologies}</div>}
            {proj.description && <div style={{ fontSize: '12.5px', color: '#444', marginTop: '3px' }}>{proj.description}</div>}
        </div>
    ));

    const renderCerts = () => data.certifications?.map((c, i) => (
        <div key={i} style={{ fontSize: '12.5px', marginBottom: '6px' }}>
            <strong>{c.name}</strong> — <span style={{ color: '#555' }}>{c.issuer} ({c.date})</span>
        </div>
    ));

    const renderLangs = () => (
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            {data.languages?.map((l, i) => <span key={i} style={{ fontSize: '12.5px' }}>{l.name} <span style={{ color: '#888' }}>({l.proficiency})</span></span>)}
        </div>
    );

    const renderCustom = (titleC) => (data.customSections || []).filter(s => s.title).map((section, si) => (
        <div key={si}>
            <SectionTitle c={titleC}>{section.title}</SectionTitle>
            {section.items?.map((item, ii) => (
                <div key={ii} style={{ fontSize: '12.5px', marginBottom: '4px', display: 'flex', gap: '8px' }}>
                    {item.label && <strong style={{ minWidth: '100px' }}>{item.label}:</strong>}
                    <span style={{ color: '#444' }}>{item.value}</span>
                </div>
            ))}
        </div>
    ));

    const renderCustomSidebar = (titleClr = '#fff') => (data.customSections || []).filter(s => s.title).map((section, si) => (
        <div key={si} style={{ marginTop: '18px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.25)', paddingBottom: '4px', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px', color: titleClr }}>{section.title}</div>
            {section.items?.map((item, ii) => (
                <div key={ii} style={{ fontSize: '11px', marginBottom: '4px', opacity: 0.9 }}>
                    {item.label && <div style={{ fontWeight: 600 }}>{item.label}</div>}
                    <div style={{ opacity: 0.75 }}>{item.value}</div>
                </div>
            ))}
        </div>
    ));

    const allSections = (titleC) => (
        <>
            {data.summary && <><SectionTitle c={titleC}>Profile Summary</SectionTitle><div style={{ fontSize: '12.5px', color: '#444', lineHeight: 1.6 }}>{data.summary}</div></>}
            {data.experience?.length > 0 && <><SectionTitle c={titleC}>Professional Experience</SectionTitle>{renderExp()}</>}
            {data.education?.length > 0 && <><SectionTitle c={titleC}>Education</SectionTitle>{renderEdu()}</>}
            {data.skills?.length > 0 && <><SectionTitle c={titleC}>Skills</SectionTitle><SkillBars /></>}
            {data.projects?.length > 0 && <><SectionTitle c={titleC}>Projects</SectionTitle>{renderProjects()}</>}
            {data.certifications?.length > 0 && <><SectionTitle c={titleC}>Certifications</SectionTitle>{renderCerts()}</>}
            {data.languages?.length > 0 && <><SectionTitle c={titleC}>Languages</SectionTitle>{renderLangs()}</>}
            {renderCustom(titleC)}
        </>
    );

    const base = { fontFamily: "'Inter', sans-serif", width: '100%', height: '100%', fontSize: '13px', lineHeight: 1.55, color: '#222', overflow: 'hidden', boxSizing: 'border-box', background: '#fff' };

    // ═══════════════════════════════════════════
    // LAYOUT 1 — Classic Professional
    // Center-aligned header, single column, underline accent
    // ═══════════════════════════════════════════
    if (t.layout === 'classic') {
        return (
            <div style={{ ...base, padding: '32px 38px' }}>
                <div style={{ textAlign: 'center', paddingBottom: '14px', marginBottom: '6px', borderBottom: `2px solid ${accent}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'center' }}>
                        <Avatar size={60} border={`2px solid ${accent}`} />
                        <div>
                            <div style={{ fontSize: '28px', fontWeight: 800, color, lineHeight: 1.1 }}>{p.fullName || 'Your Name'}</div>
                            <div style={{ fontSize: '14px', fontWeight: 600, color: accent, marginTop: '4px' }}>{p.jobTitle}</div>
                        </div>
                    </div>
                    <ContactLine clr="#666" />
                </div>
                {allSections(color)}
            </div>
        );
    }

    // ═══════════════════════════════════════════
    // LAYOUT 2 — Modern Sidebar
    // Colored sidebar (left) with photo/contact/skills, main content right
    // ═══════════════════════════════════════════
    if (t.layout === 'sidebar') {
        return (
            <div style={{ ...base, display: 'flex', padding: 0 }}>
                <div style={{ width: '35%', background: `linear-gradient(170deg, ${color}, ${accent}55)`, color: '#fff', padding: '28px 16px', display: 'flex', flexDirection: 'column' }}>
                    {pic && <div style={{ textAlign: 'center', marginBottom: '14px' }}><Avatar size={80} border="3px solid rgba(255,255,255,0.3)" /></div>}
                    <div style={{ fontSize: '20px', fontWeight: 800, lineHeight: 1.2 }}>{p.fullName || 'Your Name'}</div>
                    <div style={{ fontSize: '12.5px', opacity: 0.85, marginTop: '3px', fontWeight: 500 }}>{p.jobTitle}</div>

                    <div style={{ marginTop: '18px' }}><ContactStack clr="#fff" /></div>

                    {data.skills?.length > 0 && (
                        <div style={{ marginTop: '18px' }}>
                            <div style={{ fontSize: '13px', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.25)', paddingBottom: '4px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>SKILLS</div>
                            {data.skills.map((sk, i) => {
                                const pct = { Beginner: 25, Intermediate: 50, Advanced: 75, Expert: 95 }[sk.level] || 50;
                                return (
                                    <div key={i} style={{ marginBottom: '7px' }}>
                                        <div style={{ fontSize: '11px', marginBottom: '3px', display: 'flex', justifyContent: 'space-between' }}><span>{sk.name}</span><span style={{ opacity: 0.5 }}>{sk.level}</span></div>
                                        <div style={{ height: '4px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px' }}><div style={{ width: `${pct}%`, height: '100%', background: 'rgba(255,255,255,0.75)', borderRadius: '2px' }} /></div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {data.languages?.length > 0 && (
                        <div style={{ marginTop: '18px' }}>
                            <div style={{ fontSize: '13px', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.25)', paddingBottom: '4px', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>LANGUAGES</div>
                            {data.languages.map((l, i) => <div key={i} style={{ fontSize: '11px', marginBottom: '4px' }}>{l.name} — {l.proficiency}</div>)}
                        </div>
                    )}

                    {data.certifications?.length > 0 && (
                        <div style={{ marginTop: '18px' }}>
                            <div style={{ fontSize: '13px', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.25)', paddingBottom: '4px', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>CERTIFICATIONS</div>
                            {data.certifications.map((c, i) => <div key={i} style={{ fontSize: '11px', marginBottom: '4px' }}>{c.name}<br /><span style={{ opacity: 0.65 }}>{c.issuer}</span></div>)}
                        </div>
                    )}
                    {renderCustomSidebar()}
                </div>

                <div style={{ flex: 1, padding: '28px 24px', overflowY: 'auto' }}>
                    {data.summary && <><SectionTitle c={color}>Profile</SectionTitle><div style={{ fontSize: '12.5px', color: '#444', lineHeight: 1.6 }}>{data.summary}</div></>}
                    {data.experience?.length > 0 && <><SectionTitle c={color}>Experience</SectionTitle>{renderExp(color)}</>}
                    {data.education?.length > 0 && <><SectionTitle c={color}>Education</SectionTitle>{renderEdu()}</>}
                    {data.projects?.length > 0 && <><SectionTitle c={color}>Projects</SectionTitle>{renderProjects(color)}</>}
                </div>
            </div>
        );
    }

    // ═══════════════════════════════════════════
    // LAYOUT 3 — Executive Banner
    // Full-width colored header with photo, elegant body
    // ═══════════════════════════════════════════
    if (t.layout === 'banner') {
        return (
            <div style={{ ...base, padding: '0' }}>
                <div style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)`, color: '#fff', padding: '28px 38px', display: 'flex', alignItems: 'center', gap: '18px' }}>
                    <Avatar size={68} border="3px solid rgba(255,255,255,0.3)" />
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '26px', fontWeight: 800 }}>{p.fullName || 'Your Name'}</div>
                        <div style={{ fontSize: '14px', opacity: 0.85, fontWeight: 500, marginTop: '3px', color: accent }}>{p.jobTitle}</div>
                        <ContactLine clr="rgba(255,255,255,0.7)" />
                    </div>
                </div>
                <div style={{ padding: '8px 38px 32px' }}>
                    {allSections(color)}
                </div>
            </div>
        );
    }

    // ═══════════════════════════════════════════
    // LAYOUT 4 — Elegant Serif
    // Serif fonts, double-ruled header, traditional feel
    // ═══════════════════════════════════════════
    if (t.layout === 'serif') {
        return (
            <div style={{ ...base, padding: '32px 38px', fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                <div style={{ textAlign: 'center', paddingBottom: '14px', marginBottom: '6px', borderBottom: `3px double ${color}`, borderTop: `3px double ${color}`, paddingTop: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'center' }}>
                        <Avatar size={58} border={`2px solid ${accent}`} />
                        <div>
                            <div style={{ fontSize: '30px', fontWeight: 700, color, lineHeight: 1.1, fontStyle: 'italic' }}>{p.fullName || 'Your Name'}</div>
                            <div style={{ fontSize: '14px', fontWeight: 400, color: accent, marginTop: '5px', letterSpacing: '2px', textTransform: 'uppercase' }}>{p.jobTitle}</div>
                        </div>
                    </div>
                    <ContactLine clr="#777" />
                </div>
                <div>
                    {data.summary && <><SectionTitle c={color} style={{ borderBottom: `1px solid ${accent}`, fontFamily: "'Georgia', serif" }}>Summary</SectionTitle><div style={{ fontSize: '12.5px', color: '#444', lineHeight: 1.7, fontStyle: 'italic' }}>{data.summary}</div></>}
                    {data.experience?.length > 0 && <><SectionTitle c={color} style={{ borderBottom: `1px solid ${accent}` }}>Experience</SectionTitle>{renderExp()}</>}
                    {data.education?.length > 0 && <><SectionTitle c={color} style={{ borderBottom: `1px solid ${accent}` }}>Education</SectionTitle>{renderEdu()}</>}
                    {data.skills?.length > 0 && <><SectionTitle c={color} style={{ borderBottom: `1px solid ${accent}` }}>Skills</SectionTitle><SkillBadges /></>}
                    {data.projects?.length > 0 && <><SectionTitle c={color} style={{ borderBottom: `1px solid ${accent}` }}>Projects</SectionTitle>{renderProjects()}</>}
                    {data.certifications?.length > 0 && <><SectionTitle c={color} style={{ borderBottom: `1px solid ${accent}` }}>Certifications</SectionTitle>{renderCerts()}</>}
                    {data.languages?.length > 0 && <><SectionTitle c={color} style={{ borderBottom: `1px solid ${accent}` }}>Languages</SectionTitle>{renderLangs()}</>}
                    {renderCustom(color)}
                </div>
            </div>
        );
    }

    // ═══════════════════════════════════════════
    // LAYOUT 5 — Accent Border
    // Left accent border on header, clean corporate style
    // ═══════════════════════════════════════════
    if (t.layout === 'border') {
        return (
            <div style={{ ...base, padding: '32px 38px' }}>
                <div style={{ borderLeft: `5px solid ${accent}`, paddingLeft: '18px', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <Avatar size={58} border={`2px solid ${accent}`} />
                        <div>
                            <div style={{ fontSize: '28px', fontWeight: 800, color, lineHeight: 1.1 }}>{p.fullName || 'Your Name'}</div>
                            <div style={{ fontSize: '14px', fontWeight: 600, color: accent, marginTop: '4px' }}>{p.jobTitle}</div>
                        </div>
                    </div>
                    <ContactLine clr="#666" />
                </div>
                {allSections(color)}
            </div>
        );
    }

    // ═══════════════════════════════════════════
    // LAYOUT 6 — Split Modern
    // Gradient-accent top strip, rounded badges, two-tone header
    // ═══════════════════════════════════════════
    if (t.layout === 'split') {
        return (
            <div style={{ ...base, padding: '0' }}>
                {/* Thin gradient accent strip */}
                <div style={{ height: '6px', background: `linear-gradient(90deg, ${color}, ${accent})` }} />
                <div style={{ padding: '24px 38px' }}>
                    {/* Header with pill-shaped background */}
                    <div style={{ background: `${color}0a`, borderRadius: '14px', padding: '20px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '18px' }}>
                        <Avatar size={64} border={`3px solid ${accent}`} />
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '26px', fontWeight: 800, color, lineHeight: 1.1 }}>{p.fullName || 'Your Name'}</div>
                            <div style={{ fontSize: '14px', fontWeight: 600, color: accent, marginTop: '4px' }}>{p.jobTitle}</div>
                            <ContactLine clr="#666" />
                        </div>
                    </div>
                    {data.summary && <><SectionTitle c={color}>About Me</SectionTitle><div style={{ fontSize: '12.5px', color: '#444', lineHeight: 1.6 }}>{data.summary}</div></>}
                    {data.experience?.length > 0 && <><SectionTitle c={color}>Experience</SectionTitle>{renderExp()}</>}
                    {data.education?.length > 0 && <><SectionTitle c={color}>Education</SectionTitle>{renderEdu()}</>}
                    {data.skills?.length > 0 && <><SectionTitle c={color}>Skills</SectionTitle><SkillBadges /></>}
                    {data.projects?.length > 0 && <><SectionTitle c={color}>Projects</SectionTitle>{renderProjects()}</>}
                    {data.certifications?.length > 0 && <><SectionTitle c={color}>Certifications</SectionTitle>{renderCerts()}</>}
                    {data.languages?.length > 0 && <><SectionTitle c={color}>Languages</SectionTitle>{renderLangs()}</>}
                    {renderCustom(color)}
                </div>
            </div>
        );
    }

    // ═══════════════════════════════════════════
    // LAYOUT 7 — Compact Grid
    // Tech-style with 2-column skills grid, timeline dots on experience
    // ═══════════════════════════════════════════
    if (t.layout === 'grid') {
        return (
            <div style={{ ...base, padding: '28px 34px', fontFamily: "'JetBrains Mono', 'Fira Code', 'Inter', monospace" }}>
                {/* Header — left-aligned, minimal */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingBottom: '12px', borderBottom: `2px solid ${accent}` }}>
                    <Avatar size={54} border={`2px solid ${accent}`} />
                    <div>
                        <div style={{ fontSize: '24px', fontWeight: 800, color, lineHeight: 1.1 }}>{p.fullName || 'Your Name'}</div>
                        <div style={{ fontSize: '13px', fontWeight: 500, color: accent, marginTop: '3px' }}>{p.jobTitle}</div>
                        <ContactLine clr="#888" />
                    </div>
                </div>

                {data.summary && <><SectionTitle c={color}>// About</SectionTitle><div style={{ fontSize: '12px', color: '#555', lineHeight: 1.6, background: '#f8f9fa', padding: '10px 14px', borderRadius: '6px', borderLeft: `3px solid ${accent}` }}>{data.summary}</div></>}

                {data.experience?.length > 0 && (
                    <>
                        <SectionTitle c={color}>// Experience</SectionTitle>
                        {data.experience.map((exp, i) => (
                            <div key={i} style={{ marginBottom: '14px', paddingLeft: '18px', borderLeft: `2px solid ${accent}30`, position: 'relative' }}>
                                <div style={{ position: 'absolute', left: '-5px', top: '4px', width: '8px', height: '8px', borderRadius: '50%', background: accent }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <strong style={{ fontSize: '13.5px' }}>{exp.position}</strong>
                                    <span style={{ fontSize: '11px', color: '#888', fontFamily: 'monospace' }}>{exp.startDate} → {exp.endDate || 'Present'}</span>
                                </div>
                                <div style={{ color: accent, fontWeight: 600, fontSize: '12px' }}>{exp.company}</div>
                                {exp.description && <div style={{ fontSize: '12px', color: '#555', marginTop: '3px', lineHeight: 1.5 }}>{exp.description}</div>}
                            </div>
                        ))}
                    </>
                )}

                {data.education?.length > 0 && <><SectionTitle c={color}>// Education</SectionTitle>{renderEdu()}</>}
                {data.skills?.length > 0 && <><SectionTitle c={color}>// Skills</SectionTitle><SkillGrid textColor="#333" /></>}
                {data.projects?.length > 0 && <><SectionTitle c={color}>// Projects</SectionTitle>{renderProjects()}</>}
                {data.certifications?.length > 0 && <><SectionTitle c={color}>// Certifications</SectionTitle>{renderCerts()}</>}
                {data.languages?.length > 0 && <><SectionTitle c={color}>// Languages</SectionTitle>{renderLangs()}</>}
                {renderCustom(color)}
            </div>
        );
    }

    // ═══════════════════════════════════════════
    // LAYOUT 9 — Timeline Pro
    // Vertical timeline with connecting dots
    // ═══════════════════════════════════════════
    if (t.layout === 'timeline') {
        const TimelineSection = ({ title, children }) => (
            <div style={{ marginTop: '18px' }}>
                <div style={{ fontSize: '15px', fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '10px' }}>{title}</div>
                <div style={{ borderLeft: `3px solid ${accent}`, paddingLeft: '20px', position: 'relative' }}>
                    {children}
                </div>
            </div>
        );

        const TimelineDot = () => (
            <div style={{ position: 'absolute', left: '-31px', width: '12px', height: '12px', borderRadius: '50%', background: accent, border: `2px solid #fff`, boxShadow: `0 0 0 2px ${accent}40` }} />
        );

        return (
            <div style={{ ...base, padding: '28px 34px' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingBottom: '16px', borderBottom: `3px solid ${accent}` }}>
                    <Avatar size={64} border={`3px solid ${accent}`} />
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '26px', fontWeight: 800, color, lineHeight: 1.1 }}>{p.fullName || 'Your Name'}</div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: accent, marginTop: '4px' }}>{p.jobTitle}</div>
                        <ContactLine clr="#666" />
                    </div>
                </div>

                {data.summary && <div style={{ marginTop: '14px', fontSize: '12.5px', color: '#444', lineHeight: 1.6, padding: '10px 14px', background: `${accent}08`, borderRadius: '8px' }}>{data.summary}</div>}

                {data.experience?.length > 0 && (
                    <TimelineSection title="Experience">
                        {data.experience.map((exp, i) => (
                            <div key={i} style={{ marginBottom: '16px', position: 'relative' }}>
                                <TimelineDot />
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <strong style={{ fontSize: '14px' }}>{exp.position}</strong>
                                    <span style={{ fontSize: '11px', color: '#888', background: `${accent}10`, padding: '2px 8px', borderRadius: '10px' }}>{exp.startDate} — {exp.endDate || 'Present'}</span>
                                </div>
                                <div style={{ color: accent, fontWeight: 600, fontSize: '12.5px' }}>{exp.company}</div>
                                {exp.description && <div style={{ fontSize: '12px', color: '#555', marginTop: '4px', lineHeight: 1.5 }}>{exp.description}</div>}
                            </div>
                        ))}
                    </TimelineSection>
                )}

                {data.education?.length > 0 && (
                    <TimelineSection title="Education">
                        {data.education.map((edu, i) => (
                            <div key={i} style={{ marginBottom: '12px', position: 'relative' }}>
                                <TimelineDot />
                                <strong style={{ fontSize: '13.5px' }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</strong>
                                <div style={{ fontSize: '12px', color: '#555' }}>{edu.institution}{edu.gpa ? ` • GPA: ${edu.gpa}` : ''}</div>
                                <div style={{ fontSize: '11px', color: '#888' }}>{edu.startDate} — {edu.endDate}</div>
                            </div>
                        ))}
                    </TimelineSection>
                )}

                {data.skills?.length > 0 && <><SectionTitle c={color}>Skills</SectionTitle><SkillBars /></>}
                {data.projects?.length > 0 && <><SectionTitle c={color}>Projects</SectionTitle>{renderProjects()}</>}
                {data.certifications?.length > 0 && <><SectionTitle c={color}>Certifications</SectionTitle>{renderCerts()}</>}
                {data.languages?.length > 0 && <><SectionTitle c={color}>Languages</SectionTitle>{renderLangs()}</>}
                {renderCustom(color)}
            </div>
        );
    }

    // ═══════════════════════════════════════════
    // LAYOUT 10 — Card Stack
    // Each section in elevated cards with rounded corners
    // ═══════════════════════════════════════════
    if (t.layout === 'cards') {
        const Card = ({ title, children, style: extra = {} }) => (
            <div style={{ background: '#fff', border: '1px solid #e8e8ee', borderRadius: '12px', padding: '16px 18px', marginBottom: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', ...extra }}>
                {title && <div style={{ fontSize: '14px', fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', paddingBottom: '6px', borderBottom: `2px solid ${accent}30` }}>{title}</div>}
                {children}
            </div>
        );

        return (
            <div style={{ ...base, padding: '24px 28px', background: '#f4f5f7' }}>
                {/* Header card */}
                <Card style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)`, color: '#fff', border: 'none', textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'center' }}>
                        <Avatar size={60} border="3px solid rgba(255,255,255,0.3)" />
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: '24px', fontWeight: 800, lineHeight: 1.1 }}>{p.fullName || 'Your Name'}</div>
                            <div style={{ fontSize: '13px', opacity: 0.85, fontWeight: 500, marginTop: '3px' }}>{p.jobTitle}</div>
                        </div>
                    </div>
                    <ContactLine clr="rgba(255,255,255,0.7)" />
                </Card>

                {/* Two-column cards */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    {data.summary && (
                        <Card title="Profile" style={{ gridColumn: '1 / -1' }}>
                            <div style={{ fontSize: '12.5px', color: '#444', lineHeight: 1.6 }}>{data.summary}</div>
                        </Card>
                    )}

                    {data.experience?.length > 0 && (
                        <Card title="Experience" style={{ gridColumn: '1 / -1' }}>
                            {renderExp()}
                        </Card>
                    )}

                    {data.education?.length > 0 && (
                        <Card title="Education">
                            {renderEdu()}
                        </Card>
                    )}

                    {data.skills?.length > 0 && (
                        <Card title="Skills">
                            <SkillBadges />
                        </Card>
                    )}

                    {data.projects?.length > 0 && (
                        <Card title="Projects" style={{ gridColumn: '1 / -1' }}>
                            {renderProjects()}
                        </Card>
                    )}

                    {data.certifications?.length > 0 && <Card title="Certifications">{renderCerts()}</Card>}
                    {data.languages?.length > 0 && <Card title="Languages">{renderLangs()}</Card>}
                </div>
                {renderCustom(color)}
            </div>
        );
    }

    // ═══════════════════════════════════════════
    // LAYOUT 11 — Magazine Layout
    // Editorial three-column header, bold serif name
    // ═══════════════════════════════════════════
    if (t.layout === 'magazine') {
        return (
            <div style={{ ...base, padding: '0' }}>
                {/* Top bar */}
                <div style={{ background: color, padding: '24px 34px', color: '#fff' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '20px', alignItems: 'center' }}>
                        <Avatar size={70} border="3px solid rgba(255,255,255,0.2)" />
                        <div>
                            <div style={{ fontSize: '28px', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.5px' }}>{p.fullName || 'Your Name'}</div>
                            <div style={{ fontSize: '14px', fontWeight: 400, color: accent, marginTop: '4px', textTransform: 'uppercase', letterSpacing: '3px' }}>{p.jobTitle}</div>
                        </div>
                        <div style={{ fontSize: '10.5px', opacity: 0.8, lineHeight: 2, textAlign: 'right' }}>
                            {p.email && <div>{p.email}</div>}
                            {p.phone && <div>{p.phone}</div>}
                            {p.address && <div>{p.address}</div>}
                            {p.linkedin && <div>{p.linkedin}</div>}
                            {p.github && <div>{p.github}</div>}
                        </div>
                    </div>
                </div>
                {/* Accent divider */}
                <div style={{ height: '4px', background: accent }} />

                <div style={{ padding: '16px 34px 28px' }}>
                    {data.summary && (
                        <div style={{ fontSize: '13px', color: '#444', lineHeight: 1.65, fontStyle: 'italic', borderLeft: `4px solid ${accent}`, paddingLeft: '14px', margin: '14px 0' }}>{data.summary}</div>
                    )}

                    {/* Two-column body */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '24px', marginTop: '8px' }}>
                        <div>
                            {data.experience?.length > 0 && <><SectionTitle c={color}>Experience</SectionTitle>{renderExp()}</>}
                            {data.projects?.length > 0 && <><SectionTitle c={color}>Projects</SectionTitle>{renderProjects()}</>}
                        </div>
                        <div>
                            {data.education?.length > 0 && <><SectionTitle c={color}>Education</SectionTitle>{renderEdu()}</>}
                            {data.skills?.length > 0 && <><SectionTitle c={color}>Skills</SectionTitle><SkillBars /></>}
                            {data.certifications?.length > 0 && <><SectionTitle c={color}>Certifications</SectionTitle>{renderCerts()}</>}
                            {data.languages?.length > 0 && <><SectionTitle c={color}>Languages</SectionTitle>{renderLangs()}</>}
                        </div>
                    </div>
                    {renderCustom(color)}
                </div>
            </div>
        );
    }

    // ═══════════════════════════════════════════
    // LAYOUT 12 — Infographic
    // Progress rings for skills, visual metrics, icon-heavy
    // ═══════════════════════════════════════════
    if (t.layout === 'infographic') {
        const SkillRing = ({ name, level }) => {
            const pct = { Beginner: 25, Intermediate: 50, Advanced: 75, Expert: 95 }[level] || 50;
            const r = 18, c = 2 * Math.PI * r;
            const offset = c - (pct / 100) * c;
            return (
                <div style={{ textAlign: 'center', width: '62px' }}>
                    <svg width="48" height="48" viewBox="0 0 48 48" style={{ display: 'block', margin: '0 auto' }}>
                        <circle cx="24" cy="24" r={r} fill="none" stroke={`${accent}20`} strokeWidth="4" />
                        <circle cx="24" cy="24" r={r} fill="none" stroke={accent} strokeWidth="4" strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round" transform="rotate(-90 24 24)" />
                        <text x="24" y="26" textAnchor="middle" fill={color} fontSize="10" fontWeight="700">{pct}%</text>
                    </svg>
                    <div style={{ fontSize: '10px', marginTop: '3px', color: '#444', fontWeight: 500, lineHeight: 1.2 }}>{name}</div>
                </div>
            );
        };

        return (
            <div style={{ ...base, display: 'flex', padding: 0 }}>
                {/* Left info panel */}
                <div style={{ width: '36%', background: color, color: '#fff', padding: '26px 16px', display: 'flex', flexDirection: 'column' }}>
                    {pic && <div style={{ textAlign: 'center', marginBottom: '14px' }}><Avatar size={80} border={`3px solid ${accent}`} /></div>}
                    <div style={{ fontSize: '20px', fontWeight: 800, lineHeight: 1.2 }}>{p.fullName || 'Your Name'}</div>
                    <div style={{ fontSize: '12px', color: accent, marginTop: '3px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>{p.jobTitle}</div>

                    <div style={{ marginTop: '18px' }}><ContactStack clr="#fff" /></div>

                    {/* Skills as progress rings */}
                    {data.skills?.length > 0 && (
                        <div style={{ marginTop: '18px' }}>
                            <div style={{ fontSize: '13px', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '4px', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>SKILLS</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                                {data.skills.map((sk, i) => (
                                    <div key={i} style={{ textAlign: 'center', width: '55px' }}>
                                        <svg width="42" height="42" viewBox="0 0 48 48" style={{ display: 'block', margin: '0 auto' }}>
                                            <circle cx="24" cy="24" r={18} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="4" />
                                            <circle cx="24" cy="24" r={18} fill="none" stroke={accent} strokeWidth="4" strokeDasharray={2 * Math.PI * 18} strokeDashoffset={2 * Math.PI * 18 - (({ Beginner: 25, Intermediate: 50, Advanced: 75, Expert: 95 }[sk.level] || 50) / 100) * 2 * Math.PI * 18} strokeLinecap="round" transform="rotate(-90 24 24)" />
                                            <text x="24" y="26" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="700">{({ Beginner: 25, Intermediate: 50, Advanced: 75, Expert: 95 }[sk.level] || 50)}%</text>
                                        </svg>
                                        <div style={{ fontSize: '9px', marginTop: '2px', opacity: 0.85, lineHeight: 1.2 }}>{sk.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {data.languages?.length > 0 && (
                        <div style={{ marginTop: '18px' }}>
                            <div style={{ fontSize: '13px', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '4px', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>LANGUAGES</div>
                            {data.languages.map((l, i) => <div key={i} style={{ fontSize: '11px', marginBottom: '4px' }}>{l.name} — {l.proficiency}</div>)}
                        </div>
                    )}
                    {renderCustomSidebar()}
                </div>

                {/* Right content */}
                <div style={{ flex: 1, padding: '26px 22px', overflowY: 'auto' }}>
                    {/* Quick stats row */}
                    {(data.experience?.length > 0 || data.education?.length > 0 || data.skills?.length > 0) && (
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                            {data.experience?.length > 0 && (
                                <div style={{ flex: 1, background: `${accent}10`, borderRadius: '10px', padding: '10px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '20px', fontWeight: 800, color }}>{data.experience.length}</div>
                                    <div style={{ fontSize: '10px', color: '#888', textTransform: 'uppercase' }}>Positions</div>
                                </div>
                            )}
                            {data.skills?.length > 0 && (
                                <div style={{ flex: 1, background: `${accent}10`, borderRadius: '10px', padding: '10px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '20px', fontWeight: 800, color }}>{data.skills.length}</div>
                                    <div style={{ fontSize: '10px', color: '#888', textTransform: 'uppercase' }}>Skills</div>
                                </div>
                            )}
                            {data.projects?.length > 0 && (
                                <div style={{ flex: 1, background: `${accent}10`, borderRadius: '10px', padding: '10px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '20px', fontWeight: 800, color }}>{data.projects.length}</div>
                                    <div style={{ fontSize: '10px', color: '#888', textTransform: 'uppercase' }}>Projects</div>
                                </div>
                            )}
                        </div>
                    )}

                    {data.summary && <><SectionTitle c={color}>Profile</SectionTitle><div style={{ fontSize: '12.5px', color: '#444', lineHeight: 1.6 }}>{data.summary}</div></>}
                    {data.experience?.length > 0 && <><SectionTitle c={color}>Experience</SectionTitle>{renderExp(color)}</>}
                    {data.education?.length > 0 && <><SectionTitle c={color}>Education</SectionTitle>{renderEdu()}</>}
                    {data.projects?.length > 0 && <><SectionTitle c={color}>Projects</SectionTitle>{renderProjects(color)}</>}
                    {data.certifications?.length > 0 && <><SectionTitle c={color}>Certifications</SectionTitle>{renderCerts()}</>}
                </div>
            </div>
        );
    }

    // ═══════════════════════════════════════════
    // LAYOUT 8 — Minimal Clean (ATS)
    // Ultra-simple, no decorations, maximum readability
    // ═══════════════════════════════════════════
    // (default / layout === 'minimal')
    return (
        <div style={{ ...base, padding: '32px 40px' }}>
            <div style={{ textAlign: 'left', paddingBottom: '10px', marginBottom: '8px', borderBottom: `1px solid #ddd` }}>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#111', lineHeight: 1.1 }}>{p.fullName || 'Your Name'}</div>
                <div style={{ fontSize: '14px', fontWeight: 500, color: '#555', marginTop: '4px' }}>{p.jobTitle}</div>
                <div style={{ fontSize: '11.5px', color: '#777', marginTop: '6px', lineHeight: 2 }}>
                    {[p.email, p.phone, p.address, p.linkedin, p.github, p.website].filter(Boolean).join('  |  ')}
                </div>
            </div>

            {data.summary && <><div style={{ fontSize: '14px', fontWeight: 700, color: '#333', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '16px', marginBottom: '6px', borderBottom: '1px solid #ddd', paddingBottom: '4px' }}>Professional Summary</div><div style={{ fontSize: '12.5px', color: '#444', lineHeight: 1.6 }}>{data.summary}</div></>}

            {data.experience?.length > 0 && <><div style={{ fontSize: '14px', fontWeight: 700, color: '#333', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '16px', marginBottom: '6px', borderBottom: '1px solid #ddd', paddingBottom: '4px' }}>Experience</div>{renderExp('#333')}</>}

            {data.education?.length > 0 && <><div style={{ fontSize: '14px', fontWeight: 700, color: '#333', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '16px', marginBottom: '6px', borderBottom: '1px solid #ddd', paddingBottom: '4px' }}>Education</div>{renderEdu()}</>}

            {data.skills?.length > 0 && <><div style={{ fontSize: '14px', fontWeight: 700, color: '#333', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '16px', marginBottom: '6px', borderBottom: '1px solid #ddd', paddingBottom: '4px' }}>Skills</div><div style={{ fontSize: '12.5px', color: '#444' }}>{data.skills.map(s => `${s.name} (${s.level})`).join(' • ')}</div></>}

            {data.projects?.length > 0 && <><div style={{ fontSize: '14px', fontWeight: 700, color: '#333', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '16px', marginBottom: '6px', borderBottom: '1px solid #ddd', paddingBottom: '4px' }}>Projects</div>{renderProjects('#333')}</>}

            {data.certifications?.length > 0 && <><div style={{ fontSize: '14px', fontWeight: 700, color: '#333', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '16px', marginBottom: '6px', borderBottom: '1px solid #ddd', paddingBottom: '4px' }}>Certifications</div>{renderCerts()}</>}

            {data.languages?.length > 0 && <><div style={{ fontSize: '14px', fontWeight: 700, color: '#333', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '16px', marginBottom: '6px', borderBottom: '1px solid #ddd', paddingBottom: '4px' }}>Languages</div>{renderLangs()}</>}

            {renderCustom('#333')}
        </div>
    );
};

export default ResumePreview;
