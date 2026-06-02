import { useNavigate } from 'react-router-dom'
import { Trophy, MapPin, DollarSign, Star, ExternalLink } from 'lucide-react'
 
export default function Results() {
  const navigate = useNavigate()
  const data = JSON.parse(localStorage.getItem('results') || '{}')
  const colleges = data.recommended_colleges || []
  const score = data.score || 0
  const compatibility = data.compatibility || ''
 
  const compatibilityColor = {
    'Excellent Match': '#43e97b',
    'Good Match': '#f7971e',
    'Moderate Match': '#ff6584'
  }
 
  const color = compatibilityColor[compatibility] || '#6c63ff'
 
  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at top, #1a1a3a 0%, #0a0a1a 60%)',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
 
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <button
            onClick={() => navigate('/home')}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginBottom: '24px', fontSize: '14px', display: 'block', margin: '0 auto 24px' }}
          >
            ← Back to Home
          </button>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎓</div>
          <h1 style={{ fontSize: '36px', marginBottom: '16px' }}>
            Your <span className="gradient-text">Results</span>
          </h1>
 
          {/* Score Card */}
          <div className="card" style={{
            display: 'inline-block', padding: '24px 48px', marginBottom: '16px',
            borderColor: color
          }}>
            <div style={{ fontSize: '48px', fontWeight: '800', color, fontFamily: 'Syne' }}>
              {score}/20
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>Quiz Score</div>
          </div>
 
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: `${color}20`, border: `1px solid ${color}40`,
            borderRadius: '20px', padding: '8px 20px', marginLeft: '16px'
          }}>
            <Trophy size={16} style={{ color }} />
            <span style={{ color, fontWeight: '600' }}>{compatibility}</span>
          </div>
        </div>
 
        {/* College Cards */}
        <h2 style={{ fontSize: '24px', marginBottom: '24px', textAlign: 'center' }}>
          Recommended <span className="gradient-text">Colleges</span>
        </h2>
 
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {colleges.map((college, i) => (
            <div
              key={i}
              className="card"
              style={{ padding: '28px', transition: 'all 0.3s ease', cursor: 'pointer' }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateX(6px)'
                e.currentTarget.style.borderColor = 'var(--primary)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateX(0)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <span style={{
                      background: 'var(--gradient)', color: 'white',
                      borderRadius: '8px', padding: '4px 12px', fontSize: '13px', fontWeight: '700'
                    }}>#{i + 1}</span>
                    <h3 style={{ fontSize: '22px', fontFamily: 'Syne' }}>{college.name}</h3>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '16px' }}>
                    {college.description}
                  </p>
 
                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
                    <span style={{
                      display: 'flex', alignItems: 'center', gap: '4px',
                      background: 'rgba(108,99,255,0.15)', borderRadius: '8px',
                      padding: '4px 12px', fontSize: '13px', color: 'var(--primary)'
                    }}>
                      <MapPin size={12} /> {college.location}
                    </span>
                    <span style={{
                      display: 'flex', alignItems: 'center', gap: '4px',
                      background: 'rgba(67,233,123,0.15)', borderRadius: '8px',
                      padding: '4px 12px', fontSize: '13px', color: '#43e97b'
                    }}>
                      <DollarSign size={12} /> ₹{college.fees.toLocaleString()}/yr
                    </span>
                    <span style={{
                      display: 'flex', alignItems: 'center', gap: '4px',
                      background: 'rgba(247,151,30,0.15)', borderRadius: '8px',
                      padding: '4px 12px', fontSize: '13px', color: '#f7971e'
                    }}>
                      <Star size={12} /> {college.rating}/10
                    </span>
                    <span style={{
                      background: 'rgba(255,101,132,0.15)', borderRadius: '8px',
                      padding: '4px 12px', fontSize: '13px', color: '#ff6584'
                    }}>
                      Rank #{college.ranking}
                    </span>
                  </div>
 
                  {/* Courses */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {college.courses.slice(0, 3).map((course, j) => (
                      <span key={j} style={{
                        background: 'rgba(255,255,255,0.07)', borderRadius: '6px',
                        padding: '3px 10px', fontSize: '12px', color: 'var(--text-muted)'
                      }}>{course}</span>
                    ))}
                  </div>
                </div>
 
                {/* Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <a href={college.website} target="_blank" rel="noreferrer">
                    <button className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>
                      <ExternalLink size={14} /> Visit Website
                    </button>
                  </a>
                  <button
                    className="btn btn-outline"
                    style={{ padding: '10px 20px', fontSize: '14px' }}
                    onClick={() => navigate(`/college/${encodeURIComponent(college.name)}`, { state: { college } })}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
 
        {/* Retake */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button className="btn btn-outline" onClick={() => navigate('/home')}>
            🔄 Take Another Assessment
          </button>
        </div>
      </div>
    </div>
  )
}