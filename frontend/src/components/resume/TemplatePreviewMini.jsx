const TemplatePreviewMini = ({ template, data, color, accent }) => {
    const s = { fontFamily: 'Inter, sans-serif', padding: '14px', height: '100%', fontSize: '6px', lineHeight: 1.4, color: '#333', overflow: 'hidden', background: '#fff' };
    const name = data?.personalInfo?.fullName || 'Your Name';
    const title = data?.personalInfo?.jobTitle || 'Job Title';
    const pic = data?.profilePicture;
    const layout = template?.layout || 'classic';

    const MiniAvatar = ({ size = 20, border = '1px solid rgba(255,255,255,0.3)' }) =>
        pic ? <img src={pic} alt="" style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', border, display: 'block', margin: '0 auto 4px' }} /> : null;

    // Sidebar layout
    if (layout === 'sidebar') {
        return (
            <div style={{ ...s, display: 'flex', gap: '6px', padding: 0 }}>
                <div style={{ width: '35%', background: `linear-gradient(170deg, ${color}, ${accent}55)`, color: '#fff', padding: '10px 6px', borderRadius: '4px 0 0 4px' }}>
                    <MiniAvatar size={18} />
                    <div style={{ fontWeight: 700, fontSize: '8px', marginBottom: '2px' }}>{name}</div>
                    <div style={{ fontSize: '5px', opacity: 0.8, marginBottom: '6px' }}>{title}</div>
                    {data?.skills?.slice(0, 3).map((sk, i) => (
                        <div key={i} style={{ marginBottom: '3px' }}>
                            <div style={{ fontSize: '4.5px', marginBottom: '1px' }}>{sk.name}</div>
                            <div style={{ height: '2px', background: 'rgba(255,255,255,0.15)', borderRadius: '1px' }}>
                                <div style={{ width: `${({ Beginner: 25, Intermediate: 50, Advanced: 75, Expert: 95 }[sk.level] || 50)}%`, height: '100%', background: 'rgba(255,255,255,0.6)', borderRadius: '1px' }} />
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ flex: 1, padding: '8px 6px' }}>
                    {data?.experience?.slice(0, 2).map((exp, i) => (
                        <div key={i} style={{ marginBottom: '5px' }}>
                            <div style={{ fontWeight: 700, fontSize: '6px', color }}>{exp.position}</div>
                            <div style={{ fontSize: '4.5px', color: '#888' }}>{exp.company} | {exp.startDate}</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Banner layout
    if (layout === 'banner') {
        return (
            <div style={{ ...s, padding: 0 }}>
                <div style={{ background: color, color: '#fff', padding: '10px 10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MiniAvatar size={16} border="1px solid rgba(255,255,255,0.3)" />
                    <div>
                        <div style={{ fontWeight: 800, fontSize: '9px' }}>{name}</div>
                        <div style={{ fontSize: '5px', color: accent }}>{title}</div>
                    </div>
                </div>
                <div style={{ padding: '6px 10px' }}>
                    {data?.experience?.slice(0, 2).map((exp, i) => (
                        <div key={i} style={{ marginBottom: '4px' }}>
                            <div style={{ fontWeight: 700, fontSize: '5.5px' }}>{exp.position}</div>
                            <div style={{ fontSize: '4.5px', color: accent }}>{exp.company}</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Serif layout
    if (layout === 'serif') {
        return (
            <div style={{ ...s, fontFamily: "'Georgia', serif" }}>
                <div style={{ textAlign: 'center', borderBottom: `1.5px double ${color}`, borderTop: `1.5px double ${color}`, padding: '6px 0', marginBottom: '6px' }}>
                    <MiniAvatar size={20} border={`1px solid ${accent}`} />
                    <div style={{ fontWeight: 700, fontSize: '10px', color, fontStyle: 'italic' }}>{name}</div>
                    <div style={{ fontSize: '5px', color: accent, letterSpacing: '1px', textTransform: 'uppercase' }}>{title}</div>
                </div>
                {data?.experience?.slice(0, 2).map((exp, i) => (
                    <div key={i} style={{ marginBottom: '4px' }}>
                        <div style={{ fontWeight: 700, fontSize: '5.5px' }}>{exp.position}</div>
                        <div style={{ fontSize: '4.5px', color: '#888', fontStyle: 'italic' }}>{exp.company}</div>
                    </div>
                ))}
            </div>
        );
    }

    // Border layout
    if (layout === 'border') {
        return (
            <div style={s}>
                <div style={{ borderLeft: `3px solid ${accent}`, paddingLeft: '8px', marginBottom: '6px' }}>
                    <MiniAvatar size={18} border={`1px solid ${accent}`} />
                    <div style={{ fontWeight: 800, fontSize: '10px', color }}>{name}</div>
                    <div style={{ fontSize: '5.5px', color: accent, fontWeight: 600 }}>{title}</div>
                </div>
                {data?.experience?.slice(0, 2).map((exp, i) => (
                    <div key={i} style={{ marginBottom: '4px' }}>
                        <div style={{ fontWeight: 700, fontSize: '5.5px' }}>{exp.position}</div>
                        <div style={{ fontSize: '4.5px', color: accent }}>{exp.company}</div>
                    </div>
                ))}
            </div>
        );
    }

    // Split layout
    if (layout === 'split') {
        return (
            <div style={{ ...s, padding: 0 }}>
                <div style={{ height: '3px', background: `linear-gradient(90deg, ${color}, ${accent})` }} />
                <div style={{ padding: '8px 10px' }}>
                    <div style={{ background: `${color}0a`, borderRadius: '6px', padding: '8px', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <MiniAvatar size={16} border={`1px solid ${accent}`} />
                        <div>
                            <div style={{ fontWeight: 800, fontSize: '9px', color }}>{name}</div>
                            <div style={{ fontSize: '5px', color: accent }}>{title}</div>
                        </div>
                    </div>
                    {data?.skills?.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px', marginBottom: '4px' }}>
                            {data.skills.slice(0, 4).map((sk, i) => <span key={i} style={{ background: `${accent}18`, color: accent, padding: '1px 4px', borderRadius: '6px', fontSize: '4px' }}>{sk.name}</span>)}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Grid layout
    if (layout === 'grid') {
        return (
            <div style={{ ...s, fontFamily: "'JetBrains Mono', monospace" }}>
                <div style={{ borderBottom: `1.5px solid ${accent}`, paddingBottom: '5px', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MiniAvatar size={16} border={`1px solid ${accent}`} />
                    <div>
                        <div style={{ fontWeight: 800, fontSize: '9px', color }}>{name}</div>
                        <div style={{ fontSize: '5px', color: accent }}>{title}</div>
                    </div>
                </div>
                {data?.experience?.slice(0, 2).map((exp, i) => (
                    <div key={i} style={{ paddingLeft: '8px', borderLeft: `1.5px solid ${accent}30`, marginBottom: '4px', position: 'relative' }}>
                        <div style={{ position: 'absolute', left: '-3px', top: '2px', width: '5px', height: '5px', borderRadius: '50%', background: accent }} />
                        <div style={{ fontWeight: 700, fontSize: '5.5px' }}>{exp.position}</div>
                        <div style={{ fontSize: '4px', color: accent }}>{exp.company}</div>
                    </div>
                ))}
            </div>
        );
    }

    // Minimal layout
    if (layout === 'minimal') {
        return (
            <div style={s}>
                <div style={{ borderBottom: '1px solid #ddd', paddingBottom: '5px', marginBottom: '5px' }}>
                    <div style={{ fontWeight: 800, fontSize: '10px', color: '#111' }}>{name}</div>
                    <div style={{ fontSize: '5px', color: '#666' }}>{title}</div>
                    <div style={{ fontSize: '4px', color: '#999', marginTop: '2px' }}>
                        {[data?.personalInfo?.email, data?.personalInfo?.phone].filter(Boolean).join(' | ')}
                    </div>
                </div>
                {data?.experience?.slice(0, 2).map((exp, i) => (
                    <div key={i} style={{ marginBottom: '4px' }}>
                        <div style={{ fontWeight: 700, fontSize: '5.5px', color: '#333' }}>{exp.position}</div>
                        <div style={{ fontSize: '4.5px', color: '#888' }}>{exp.company}</div>
                    </div>
                ))}
            </div>
        );
    }

    // Timeline layout
    if (layout === 'timeline') {
        return (
            <div style={s}>
                <div style={{ borderBottom: `1.5px solid ${accent}`, paddingBottom: '5px', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MiniAvatar size={16} border={`1px solid ${accent}`} />
                    <div>
                        <div style={{ fontWeight: 800, fontSize: '9px', color }}>{name}</div>
                        <div style={{ fontSize: '5px', color: accent }}>{title}</div>
                    </div>
                </div>
                {data?.experience?.slice(0, 2).map((exp, i) => (
                    <div key={i} style={{ paddingLeft: '10px', borderLeft: `1.5px solid ${accent}`, marginBottom: '4px', position: 'relative' }}>
                        <div style={{ position: 'absolute', left: '-3.5px', top: '2px', width: '5px', height: '5px', borderRadius: '50%', background: accent, border: '1px solid #fff' }} />
                        <div style={{ fontWeight: 700, fontSize: '5.5px' }}>{exp.position}</div>
                        <div style={{ fontSize: '4px', color: accent }}>{exp.company}</div>
                    </div>
                ))}
            </div>
        );
    }

    // Cards layout
    if (layout === 'cards') {
        return (
            <div style={{ ...s, background: '#f4f5f7', padding: '8px' }}>
                <div style={{ background: color, color: '#fff', borderRadius: '6px', padding: '8px', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <MiniAvatar size={14} border="1px solid rgba(255,255,255,0.3)" />
                    <div>
                        <div style={{ fontWeight: 800, fontSize: '8px' }}>{name}</div>
                        <div style={{ fontSize: '4.5px', opacity: 0.8 }}>{title}</div>
                    </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px' }}>
                    <div style={{ background: '#fff', borderRadius: '4px', padding: '4px', border: '1px solid #e8e8ee', gridColumn: '1 / -1' }}>
                        <div style={{ fontWeight: 700, fontSize: '4.5px', color, marginBottom: '2px' }}>EXPERIENCE</div>
                        {data?.experience?.slice(0, 1).map((exp, i) => (
                            <div key={i} style={{ fontSize: '4px', color: '#666' }}>{exp.position} at {exp.company}</div>
                        ))}
                    </div>
                    <div style={{ background: '#fff', borderRadius: '4px', padding: '4px', border: '1px solid #e8e8ee' }}>
                        <div style={{ fontWeight: 700, fontSize: '4.5px', color }}>SKILLS</div>
                    </div>
                    <div style={{ background: '#fff', borderRadius: '4px', padding: '4px', border: '1px solid #e8e8ee' }}>
                        <div style={{ fontWeight: 700, fontSize: '4.5px', color }}>EDUCATION</div>
                    </div>
                </div>
            </div>
        );
    }

    // Magazine layout
    if (layout === 'magazine') {
        return (
            <div style={{ ...s, padding: 0 }}>
                <div style={{ background: color, color: '#fff', padding: '8px 10px', display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '5px', alignItems: 'center' }}>
                    <MiniAvatar size={14} border="1px solid rgba(255,255,255,0.2)" />
                    <div>
                        <div style={{ fontWeight: 900, fontSize: '9px' }}>{name}</div>
                        <div style={{ fontSize: '4.5px', color: accent, textTransform: 'uppercase', letterSpacing: '1px' }}>{title}</div>
                    </div>
                    <div style={{ fontSize: '3.5px', opacity: 0.7, textAlign: 'right' }}>
                        {data?.personalInfo?.email && <div>{data.personalInfo.email}</div>}
                    </div>
                </div>
                <div style={{ height: '2px', background: accent }} />
                <div style={{ padding: '6px 10px', display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '8px' }}>
                    <div>
                        {data?.experience?.slice(0, 1).map((exp, i) => (
                            <div key={i}>
                                <div style={{ fontWeight: 700, fontSize: '5.5px' }}>{exp.position}</div>
                                <div style={{ fontSize: '4px', color: accent }}>{exp.company}</div>
                            </div>
                        ))}
                    </div>
                    <div>
                        {data?.skills?.slice(0, 3).map((sk, i) => (
                            <div key={i} style={{ fontSize: '4px', color: '#666' }}>{sk.name}</div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Infographic layout
    if (layout === 'infographic') {
        return (
            <div style={{ ...s, display: 'flex', gap: '4px', padding: 0 }}>
                <div style={{ width: '36%', background: color, color: '#fff', padding: '8px 5px', borderRadius: '4px 0 0 4px' }}>
                    <MiniAvatar size={16} border={`1px solid ${accent}`} />
                    <div style={{ fontWeight: 700, fontSize: '7px', marginBottom: '2px' }}>{name}</div>
                    <div style={{ fontSize: '4px', color: accent, textTransform: 'uppercase' }}>{title}</div>
                    {data?.skills?.slice(0, 2).map((sk, i) => (
                        <div key={i} style={{ marginTop: '3px', textAlign: 'center' }}>
                            <svg width="18" height="18" viewBox="0 0 48 48" style={{ display: 'block', margin: '0 auto' }}>
                                <circle cx="24" cy="24" r="18" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="5" />
                                <circle cx="24" cy="24" r="18" fill="none" stroke={accent} strokeWidth="5" strokeDasharray={2 * Math.PI * 18} strokeDashoffset={2 * Math.PI * 18 - (({ Beginner: 25, Intermediate: 50, Advanced: 75, Expert: 95 }[sk.level] || 50) / 100) * 2 * Math.PI * 18} strokeLinecap="round" transform="rotate(-90 24 24)" />
                            </svg>
                            <div style={{ fontSize: '3.5px', marginTop: '1px', opacity: 0.8 }}>{sk.name}</div>
                        </div>
                    ))}
                </div>
                <div style={{ flex: 1, padding: '6px 5px' }}>
                    <div style={{ display: 'flex', gap: '3px', marginBottom: '4px' }}>
                        {[{ n: data?.experience?.length || 0, l: 'Jobs' }, { n: data?.skills?.length || 0, l: 'Skills' }].map((s, i) => (
                            <div key={i} style={{ flex: 1, background: `${accent}10`, borderRadius: '4px', padding: '3px', textAlign: 'center' }}>
                                <div style={{ fontSize: '8px', fontWeight: 800, color }}>{s.n}</div>
                                <div style={{ fontSize: '3.5px', color: '#888' }}>{s.l}</div>
                            </div>
                        ))}
                    </div>
                    {data?.experience?.slice(0, 1).map((exp, i) => (
                        <div key={i} style={{ marginBottom: '3px' }}>
                            <div style={{ fontWeight: 700, fontSize: '5px', color }}>{exp.position}</div>
                            <div style={{ fontSize: '4px', color: '#888' }}>{exp.company}</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Default: Classic
    return (
        <div style={s}>
            <div style={{ textAlign: 'center', borderBottom: `2px solid ${accent || color}`, paddingBottom: '6px', marginBottom: '6px' }}>
                <MiniAvatar size={22} border={`1.5px solid ${accent}`} />
                <div style={{ fontWeight: 800, fontSize: '10px', color }}>{name}</div>
                <div style={{ fontSize: '5.5px', color: accent, fontWeight: 600 }}>{title}</div>
            </div>
            {data?.experience?.slice(0, 2).map((exp, i) => (
                <div key={i} style={{ marginBottom: '4px' }}>
                    <div style={{ fontWeight: 700, fontSize: '5.5px' }}>{exp.position}</div>
                    <div style={{ fontSize: '4.5px', color: accent }}>{exp.company}</div>
                </div>
            ))}
            {data?.skills?.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px', marginTop: '3px' }}>
                    {data.skills.slice(0, 5).map((sk, i) => <span key={i} style={{ background: `${accent}18`, color: accent, padding: '1px 3px', borderRadius: '6px', fontSize: '4px', fontWeight: 500 }}>{sk.name}</span>)}
                </div>
            )}
        </div>
    );
};

export default TemplatePreviewMini;
