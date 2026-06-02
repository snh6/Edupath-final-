import { useNavigate, useLocation } from 'react-router-dom'
import { MapPin, Star, DollarSign, ExternalLink, BookOpen, ArrowLeft } from 'lucide-react'
 
export default function CollegeDetail() {
  const navigate = useNavigate()
  const location = useLocation()
  const college = location.state?.college
 
  if (!college) {
    navigate('/results')
    return null
  }
 
  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at top, #1a1a3a 0%, #0a0a1a 60%)',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
 
        {/* Back Button */}
        <button
          onClick={() => navigate('/results')}
          style={{
            background: 'none', border: 'none', color: 'var(--text-muted)',
            cursor: 'pointer', marginBottom: '24px', fontSize: '14px',
            display: 'flex', alignItems: 'center', gap: '6px'
          }}
        >
          <ArrowLeft size={16} /> Back to Results
        </button>
 
        {/* Hero Card */}
        <div className="card" style={{ marginBottom: '24px', padding: '36px' }}>
          <div style={{ marginBottom: '24px' }}>
            <span style={{
              background: 'var(--gradient)', color: 'white',
              borderRadius: '8px', padding: '4px 14px',
              fontSize: '12px', fontWeight: '700',
              textTransform: 'uppercase', letterSpacing: '1px'
            }}>
              {college.field}
            </span>
          </div>
          <h1 style={{ fontSize: '36px', marginBottom: '12px', fontFamily: 'Syne' }}>
            {college.name}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: '1.6', marginBottom: '28px' }}>
            {college.description}
          </p>
 
          {/* Stats Grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '28px'
          }}>
            {[
              { icon: <MapPin size={18} />, label: 'Location', value: college.location, color: '#6c63ff' },
              { icon: <Star size={18} />, label: 'Rating', value: `${college.rating}/10`, color: '#f7971e' },
              { icon: <DollarSign size={18} />, label: 'Fees per year', value: `₹${college.fees.toLocaleString()}`, color: '#43e97b' },
              { icon: <BookOpen size={18} />, label: 'National Ranking', value: `#${college.ranking}`, color: '#ff6584' },
            ].map((stat, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.05)', borderRadius: '12px',
                padding: '16px', display: 'flex', alignItems: 'center', gap: '12px'
              }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  background: `${stat.color}20`, display: 'flex',
                  alignItems: 'center', justifyContent: 'center', color: stat.color, flexShrink: 0
                }}>
                  {stat.icon}
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '2px' }}>{stat.label}</div>
                  <div style={{ fontSize: '16px', fontWeight: '700' }}>{stat.value}</div>
                </div>
              </div>
            ))}
          </div>
 
          {/* Website Button */}
          <a href={college.website} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '16px', padding: '14px' }}>
              <ExternalLink size={18} /> Visit Official Website
            </button>
          </a>
        </div>
 
        {/* Courses Card */}
        <div className="card">
          <h2 style={{ fontSize: '22px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BookOpen size={22} style={{ color: 'var(--primary)' }} />
            Courses Offered
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {college.courses.map((course, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '14px 16px'
              }}>
                <div style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: 'var(--gradient)', flexShrink: 0
                }} />
                <span style={{ fontSize: '15px' }}>{course}</span>
              </div>
            ))}
          </div>
        </div>
 
      </div>
    </div>
  )
}