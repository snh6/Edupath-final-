import { useNavigate } from 'react-router-dom'
import { GraduationCap, Brain, TrendingUp, LogOut, ArrowRight } from 'lucide-react'
 
export default function Home() {
  const navigate = useNavigate()
  const username = localStorage.getItem('username')
 
  const logout = () => {
    localStorage.clear()
    navigate('/')
  }
 
  const paths = [
    { id: 'engineering', label: 'Engineering', emoji: '⚙️', desc: 'IITs, NITs, BITS and top engineering colleges', color: '#6c63ff' },
    { id: 'medical', label: 'Medical', emoji: '🏥', desc: 'AIIMS, CMC, JIPMER and top medical colleges', color: '#ff6584' },
    { id: 'arts', label: 'Arts & Design', emoji: '🎨', desc: 'NID, Sir JJ, Shantiniketan and top art schools', color: '#f7971e' },
    { id: 'commerce', label: 'Commerce', emoji: '📊', desc: 'SRCC, St Xaviers, Christ and top commerce colleges', color: '#43e97b' },
    { id: 'law', label: 'Law', emoji: '⚖️', desc: 'NLSIU, NALSAR, NLU and top law schools', color: '#00c6ff' },
  ]
 
  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at top, #1a1a3a 0%, #0a0a1a 60%)',
      padding: '40px 20px'
    }}>
      {/* Navbar */}
      <div style={{
        maxWidth: '900px', margin: '0 auto 60px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '40px', height: '40px',
            background: 'linear-gradient(135deg, #6c63ff, #ff6584)',
            borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>🎓</div>
          <span style={{ fontFamily: 'Syne', fontWeight: '700', fontSize: '20px' }}>EduPath</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            Hey, <strong style={{ color: 'white' }}>{username}</strong> 👋
          </span>
          <button className="btn btn-outline" onClick={logout} style={{ padding: '8px 16px', fontSize: '14px' }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>
 
      {/* Hero */}
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', marginBottom: '60px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(108,99,255,0.15)', border: '1px solid rgba(108,99,255,0.3)',
          borderRadius: '20px', padding: '6px 16px', marginBottom: '24px', fontSize: '13px', color: 'var(--primary)'
        }}>
          <Brain size={14} /> AI Powered Recommendations
        </div>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: '1.2', marginBottom: '20px' }}>
          Find Your Perfect <span className="gradient-text">College Path</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '18px', maxWidth: '500px', margin: '0 auto' }}>
          Take a smart assessment and get personalized college recommendations based on your interests and preferences.
        </p>
      </div>
 
      {/* Stats */}
      <div style={{
        maxWidth: '900px', margin: '0 auto 60px',
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px'
      }}>
        {[
          { icon: <GraduationCap size={24} />, value: '20+', label: 'Top Colleges' },
          { icon: <Brain size={24} />, value: '5', label: 'Career Paths' },
          { icon: <TrendingUp size={24} />, value: '100%', label: 'Free to Use' },
        ].map((stat, i) => (
          <div key={i} className="card" style={{ textAlign: 'center', padding: '24px' }}>
            <div style={{ color: 'var(--primary)', marginBottom: '8px' }}>{stat.icon}</div>
            <div style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'Syne' }}>{stat.value}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{stat.label}</div>
          </div>
        ))}
      </div>
 
      {/* Path Cards */}
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '24px', textAlign: 'center' }}>
          Choose Your <span className="gradient-text">Career Path</span>
        </h2>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px'
        }}>
          {paths.map(path => (
            <div
              key={path.id}
              className="card"
              onClick={() => navigate('/quiz', { state: { path: path.id } })}
              style={{ cursor: 'pointer', transition: 'all 0.3s ease', position: 'relative', overflow: 'hidden' }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)'
                e.currentTarget.style.borderColor = path.color
                e.currentTarget.style.boxShadow = `0 20px 40px ${path.color}30`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>{path.emoji}</div>
              <h3 style={{ fontSize: '20px', marginBottom: '8px', fontFamily: 'Syne' }}>{path.label}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '16px' }}>{path.desc}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: path.color, fontSize: '14px', fontWeight: '600' }}>
                Start Assessment <ArrowRight size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}