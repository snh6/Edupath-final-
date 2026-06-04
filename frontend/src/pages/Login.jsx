import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
 
const API = 'https://edupath-api-7ct9.onrender.com/'
 
export default function Login() {
  const [isRegister, setIsRegister] = useState(false)
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
 
  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      if (isRegister) {
        await axios.post(`${API}/api/auth/register`, form)
        alert('Account created! Please login.')
        setIsRegister(false)
      } else {
        const res = await axios.post(`${API}/api/auth/login`, form)
        localStorage.setItem('token', res.data.access_token)
        localStorage.setItem('username', res.data.username)
        navigate('/home')
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Something went wrong')
    }
    setLoading(false)
  }
 
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(ellipse at top left, #1a1a3a 0%, #0a0a1a 50%, #1a0a2a 100%)',
      padding: '20px'
    }}>
      {/* Background blobs */}
      <div style={{
        position: 'fixed', top: '-100px', left: '-100px',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(108,99,255,0.15) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none'
      }} />
      <div style={{
        position: 'fixed', bottom: '-100px', right: '-100px',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(255,101,132,0.15) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none'
      }} />
 
      <div className="card" style={{ width: '100%', maxWidth: '420px', position: 'relative' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '60px', height: '60px',
            background: 'linear-gradient(135deg, #6c63ff, #ff6584)',
            borderRadius: '16px', margin: '0 auto 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '28px'
          }}>🎓</div>
          <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>
            <span className="gradient-text">EduPath</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            {isRegister ? 'Create your account' : 'Welcome back'}
          </p>
        </div>
 
        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>
              Username
            </label>
            <input
              className="input"
              placeholder="Enter username"
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
            />
          </div>
 
          {isRegister && (
            <div>
              <label style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>
                Email
              </label>
              <input
                className="input"
                placeholder="Enter email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
            </div>
          )}
 
          <div>
            <label style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>
              Password
            </label>
            <input
              className="input"
              type="password"
              placeholder="Enter password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
          </div>
 
          {error && (
            <p style={{ color: '#ff6584', fontSize: '14px', textAlign: 'center' }}>{error}</p>
          )}
 
          <button
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Please wait...' : isRegister ? 'Create Account' : 'Login'}
          </button>
 
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>
            {isRegister ? 'Already have an account?' : "Don't have an account?"}
            <span
              onClick={() => setIsRegister(!isRegister)}
              style={{ color: 'var(--primary)', cursor: 'pointer', marginLeft: '6px', fontWeight: '600' }}
            >
              {isRegister ? 'Login' : 'Sign Up'}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}