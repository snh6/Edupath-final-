import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
 
const API = 'https://edupath-api-7ct9.onrender.com'
 
export default function Quiz() {
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [filters, setFilters] = useState({ max_fees: '', location: '', min_ranking: '' })
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.state?.path || 'engineering'
 
  const pathColors = {
    engineering: '#6c63ff', medical: '#ff6584',
    arts: '#f7971e', commerce: '#43e97b', law: '#00c6ff'
  }
  const color = pathColors[path]
 
  useEffect(() => {
    axios.get(`${API}/api/questions/${path}`)
      .then(res => {
        setQuestions(res.data.questions)
        setLoading(false)
      })
  }, [])
 
  const answered = Object.keys(answers).length
  const progress = (answered / 20) * 100
 
  const handleSubmit = async () => {
    if (answered < 20) {
      alert('Please answer all questions!')
      return
    }
    setSubmitting(true)
    const score = Object.values(answers).filter(a => a === 'yes').length
    const payload = {
      path,
      score,
      max_fees: filters.max_fees ? parseInt(filters.max_fees) : null,
      location: filters.location || null,
      min_ranking: filters.min_ranking ? parseInt(filters.min_ranking) : null
    }
    const res = await axios.post(`${API}/api/recommend/`, payload)
    localStorage.setItem('results', JSON.stringify(res.data))
    navigate('/results')
  }
 
  if (loading) return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: '#0a0a1a'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '50px', height: '50px', border: `3px solid ${color}`,
          borderTopColor: 'transparent', borderRadius: '50%',
          animation: 'spin 0.8s linear infinite', margin: '0 auto 16px'
        }} />
        <p style={{ color: 'var(--text-muted)' }}>Loading questions...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
 
  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at top, #1a1a3a 0%, #0a0a1a 60%)',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <button
            onClick={() => navigate('/home')}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginBottom: '16px', fontSize: '14px' }}
          >
            ← Back to Home
          </button>
          <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>
            <span style={{ color }}>
              {path.charAt(0).toUpperCase() + path.slice(1)}
            </span> Assessment
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>Answer all 20 questions honestly for best results</p>
        </div>
 
        {/* Progress */}
        <div className="card" style={{ marginBottom: '24px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Progress</span>
            <span style={{ fontSize: '14px', fontWeight: '600', color }}>{answered}/20 answered</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '10px', height: '8px' }}>
            <div style={{
              height: '100%', borderRadius: '10px',
              background: `linear-gradient(90deg, ${color}, ${color}99)`,
              width: `${progress}%`, transition: 'width 0.3s ease'
            }} />
          </div>
        </div>
 
        {/* Filters */}
        <div className="card" style={{ marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '16px' }}>🎯 Filters <span style={{ color: 'var(--text-muted)', fontWeight: '400', fontSize: '13px' }}>(optional)</span></h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Max Fees (₹/year)</label>
              <input className="input" style={{ padding: '10px 14px', fontSize: '14px' }}
                placeholder="e.g. 200000"
                value={filters.max_fees}
                onChange={e => setFilters({ ...filters, max_fees: e.target.value })}
              />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Preferred Location</label>
              <input className="input" style={{ padding: '10px 14px', fontSize: '14px' }}
                placeholder="e.g. Chennai"
                value={filters.location}
                onChange={e => setFilters({ ...filters, location: e.target.value })}
              />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Top N Ranking</label>
              <input className="input" style={{ padding: '10px 14px', fontSize: '14px' }}
                placeholder="e.g. 10"
                value={filters.min_ranking}
                onChange={e => setFilters({ ...filters, min_ranking: e.target.value })}
              />
            </div>
          </div>
        </div>
 
        {/* Questions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
          {questions.map((q, i) => (
            <div key={i} className="card" style={{
              padding: '20px',
              borderColor: answers[i] ? color : 'rgba(255,255,255,0.1)',
              transition: 'all 0.3s ease'
            }}>
              <p style={{ marginBottom: '14px', fontSize: '16px', lineHeight: '1.5' }}>
                <span style={{ color, fontWeight: '700', marginRight: '8px' }}>{i + 1}.</span>
                {q}
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                {['yes', 'no'].map(option => (
                  <button
                    key={option}
                    onClick={() => setAnswers({ ...answers, [i]: option })}
                    style={{
                      padding: '8px 24px', borderRadius: '10px', border: 'none',
                      cursor: 'pointer', fontWeight: '600', fontSize: '14px',
                      transition: 'all 0.2s ease',
                      background: answers[i] === option
                        ? option === 'yes' ? color : '#ff6584'
                        : 'rgba(255,255,255,0.1)',
                      color: answers[i] === option ? 'white' : 'var(--text-muted)',
                      transform: answers[i] === option ? 'scale(1.05)' : 'scale(1)'
                    }}
                  >
                    {option === 'yes' ? '👍 Yes' : '👎 No'}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
 
        {/* Submit */}
        <button
          className="btn btn-primary"
          style={{ width: '100%', justifyContent: 'center', fontSize: '18px', padding: '16px' }}
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? 'Generating...' : '🎯 Get My Recommendations'}
        </button>
      </div>
    </div>
  )
}