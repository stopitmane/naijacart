import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../hooks/api';
import toast from 'react-hot-toast';

function AuthForm({ mode }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const isLogin = mode === 'login';

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password || (!isLogin && !form.name)) { toast.error('Please fill all required fields.'); return; }
    setLoading(true);
    try {
      const res = isLogin ? await authAPI.login({ email: form.email, password: form.password }) : await authAPI.register(form);
      login(res.data.user, res.data.token);
      toast.success(res.data.message);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong. Try again.');
    } finally { setLoading(false); }
  };

  const inp = { padding: '12px 14px', borderRadius: 8, border: '1.5px solid #E5E7EB', fontSize: 14, width: '100%', outline: 'none', fontFamily: 'Inter, sans-serif', marginTop: 6, display: 'block', transition: 'border-color 0.2s', boxSizing: 'border-box' };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 20px', background: '#F9FAFB' }}>
      <div style={{ background: 'white', borderRadius: 16, padding: '40px 36px', width: '100%', maxWidth: 420, boxShadow: '0 8px 30px rgba(0,0,0,0.10)' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1F2937' }}>🛒 Naija<span style={{ color: '#008751' }}>Cart</span></h1>
          <p style={{ color: '#6B7280', fontSize: 14, marginTop: 6 }}>{isLogin ? 'Welcome back! Login to continue.' : 'Join Nigeria\'s best marketplace.'}</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {!isLogin && (
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Full Name *</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Ajayi Taiwo" style={inp}
                onFocus={e => e.target.style.borderColor = '#008751'} onBlur={e => e.target.style.borderColor = '#E5E7EB'} />
            </div>
          )}
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Email Address *</label>
            <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="you@example.com" style={inp}
              onFocus={e => e.target.style.borderColor = '#008751'} onBlur={e => e.target.style.borderColor = '#E5E7EB'} />
          </div>
          {!isLogin && (
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Phone Number</label>
              <input name="phone" value={form.phone} onChange={handleChange} type="tel" placeholder="0812 345 6789" style={inp}
                onFocus={e => e.target.style.borderColor = '#008751'} onBlur={e => e.target.style.borderColor = '#E5E7EB'} />
            </div>
          )}
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Password *</label>
            <input name="password" value={form.password} onChange={handleChange} type="password" placeholder="Minimum 6 characters" style={inp}
              onFocus={e => e.target.style.borderColor = '#008751'} onBlur={e => e.target.style.borderColor = '#E5E7EB'} />
          </div>
          <button type="submit" disabled={loading}
            style={{ background: loading ? '#9CA3AF' : '#008751', color: 'white', padding: '13px', borderRadius: 10, fontWeight: 700, fontSize: 15, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', marginTop: 4, transition: 'background 0.2s' }}>
            {loading ? '⏳ Please wait...' : isLogin ? '🔑 Login' : '🚀 Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: 14, color: '#6B7280', marginTop: 20 }}>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <Link to={isLogin ? '/register' : '/login'} style={{ color: '#008751', fontWeight: 700 }}>
            {isLogin ? 'Register here' : 'Login here'}
          </Link>
        </p>
      </div>
    </div>
  );
}

export function Login() { return <AuthForm mode="login" />; }
export function Register() { return <AuthForm mode="register" />; }
