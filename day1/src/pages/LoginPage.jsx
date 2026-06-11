import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('traveller@example.com')
  const [password, setPassword] = useState('demo123')
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    onLogin({ email, password })
    navigate('/tickets')
  }

  return (
    <section className="page-card auth-card">
      <p className="eyebrow">UI auth layer</p>
      <h2>Sign in with a demo JWT</h2>
      <p>Use any email and password to simulate an authentication flow.</p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          <span>Email</span>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="name@example.com"
          />
        </label>

        <label>
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
          />
        </label>

        <button className="primary-btn" type="submit">
          Log in
        </button>
      </form>
    </section>
  )
}

export default LoginPage
