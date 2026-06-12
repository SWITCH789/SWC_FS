import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Navigate, NavLink, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import './App.css'
import MovieCard from './components/MovieCard'
import ProtectedRoute from './components/ProtectedRoute'
import SeatGrid from './components/SeatGrid'
import SharedLayout from './components/SharedLayout'
import { locations, movies, seatLayout, showtimes, theatres } from './data/mockData'

const AuthContext = createContext(null)

function useAuth() {
  return useContext(AuthContext)
}

function App() {
  return <AppShell />
}

function AppShell() {
  const [user, setUser] = useState(() => {
    try {
      const cached = localStorage.getItem('cineverse_user')
      return cached ? JSON.parse(cached) : null
    } catch {
      return null
    }
  })
  const [booking, setBooking] = useState({
    movie: movies[0],
    location: locations[0],
    theatre: theatres[0],
    screen: 'Audi 1',
    showtime: showtimes[0],
    seats: [],
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem('cineverse_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('cineverse_user')
    }
  }, [user])

  const login = (profile, token = null) => {
    setUser(profile)
    if (token) {
      localStorage.setItem('cineverse_token', token)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('cineverse_token')
    setBooking({
      movie: movies[0],
      location: locations[0],
      theatre: theatres[0],
      screen: 'Audi 1',
      showtime: showtimes[0],
      seats: [],
    })
  }

  const authValue = useMemo(() => ({ user, login, logout }), [user])

  return (
    <AuthContext.Provider value={authValue}>
      <Routes>
        <Route path="/" element={user ? <Navigate to={getDashboardPath(user.role)} replace /> : <LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute user={user} role="user">
              <SharedLayout user={user} onLogout={logout} role={user?.role} />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<UserDashboardPage booking={booking} />} />
          <Route path="movies" element={<MoviesPage />} />
          <Route path="movie/:movieId" element={<MovieDetailsPage booking={booking} setBooking={setBooking} />} />
          <Route path="location" element={<LocationPage booking={booking} setBooking={setBooking} />} />
          <Route path="theatres" element={<TheatrePage booking={booking} setBooking={setBooking} />} />
          <Route path="screens" element={<ScreenPage booking={booking} setBooking={setBooking} />} />
          <Route path="showtimes" element={<ShowtimePage booking={booking} setBooking={setBooking} />} />
          <Route path="seats" element={<SeatSelectionPage booking={booking} setBooking={setBooking} />} />
          <Route path="summary" element={<BookingSummaryPage booking={booking} />} />
          <Route path="confirmation" element={<ConfirmationPage booking={booking} />} />
          <Route path="profile" element={<ProfilePage user={user} />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="history" element={<BookingHistoryPage />} />
        </Route>

        <Route
          path="/owner-dashboard"
          element={
            <ProtectedRoute user={user} role="owner">
              <SharedLayout user={user} onLogout={logout} role={user?.role} />
            </ProtectedRoute>
          }
        >
          <Route index element={<OwnerDashboardPage />} />
          <Route path="movies" element={<OwnerMoviesPage />} />
          <Route path="shows" element={<OwnerShowsPage />} />
          <Route path="bookings" element={<OwnerBookingsPage />} />
          <Route path="screens" element={<OwnerScreensPage />} />
          <Route path="layout" element={<OwnerLayoutPage />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user} role="admin">
              <SharedLayout user={user} onLogout={logout} role={user?.role} />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="theatres" element={<AdminTheatresPage />} />
          <Route path="requests" element={<AdminRequestsPage />} />
          <Route path="reports" element={<AdminReportsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthContext.Provider>
  )
}

function getDashboardPath(role) {
  if (role === 'owner') return '/owner-dashboard'
  if (role === 'admin') return '/admin/dashboard'
  return '/dashboard'
}

function normalizeRole(role) {
  if (role === 'owner') return 'owner'
  if (role === 'admin') return 'admin'
  return 'user'
}

function toBackendRole(role) {
  if (role === 'owner') return 'THEATRE_OWNER'
  if (role === 'admin') return 'ADMIN'
  return 'USER'
}

async function authenticate(endpoint, payload) {
  const response = await fetch(`/api/auth${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data.error || 'Authentication failed')
  }

  return data
}

function LandingPage() {
  const { user } = useAuth()
  return (
    <div className="hero-page">
      <div className="hero-card">
        <p className="eyebrow">CineVerse</p>
        <h2>Plan your next cinema night in minutes.</h2>
        <p>A polished booking journey for customers, theatre owners, and admins, backed by a live authentication service.</p>
        <div className="button-row">
          <NavLink className="btn btn-primary" to="/login">
            Sign in
          </NavLink>
          <NavLink className="btn btn-secondary" to="/signup">
            Create account
          </NavLink>
        </div>
        {user && <NavLink to={getDashboardPath(user.role)}>Continue to dashboard</NavLink>}
      </div>
    </div>
  )
}

function AuthForm({ title, subtitle, buttonLabel, onSubmit, switchText, switchTo, roleDefault = 'user' }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState(roleDefault)
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await onSubmit({ email, password, name, role })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="auth-page">
      <form className="card auth-card" onSubmit={handleSubmit}>
        <h2>{title}</h2>
        <p>{subtitle}</p>
        {buttonLabel === 'Create account' && (
          <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" required />
        )}
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" required />
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" required />
        <select value={role} onChange={(event) => setRole(event.target.value)}>
          <option value="user">Customer</option>
          <option value="owner">Theatre Owner</option>
          <option value="admin">Admin</option>
        </select>
        {error && <p className="error-text">{error}</p>}
        <button className="btn btn-primary" type="submit">
          {buttonLabel}
        </button>
        <NavLink to={switchTo}>{switchText}</NavLink>
      </form>
    </div>
  )
}

function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState('')

  const handleLogin = async ({ email, password, role }) => {
    try {
      const response = await authenticate('/login', { email, password })
      const profile = {
        email,
        role: normalizeRole(role),
        name: response.name || email.split('@')[0],
      }
      login(profile, response.token)
      const redirect = location.state?.from?.pathname || getDashboardPath(profile.role)
      navigate(redirect, { replace: true })
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  return (
    <>
      <AuthForm
        title="Welcome back"
        subtitle="Sign in to continue your booking journey."
        buttonLabel="Log in"
        onSubmit={handleLogin}
        switchText="Need a new account?"
        switchTo="/signup"
      />
      {error && <p className="error-text centered">{error}</p>}
    </>
  )
}

function SignupPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleSignup = async ({ email, password, role, name }) => {
    try {
      const response = await authenticate('/register', {
        name,
        email,
        password,
        role: toBackendRole(role),
      })
      const profile = {
        email,
        role: normalizeRole(role),
        name: response.name || name,
      }
      login(profile, response.token)
      navigate(getDashboardPath(profile.role), { replace: true })
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  return (
    <>
      <AuthForm
        title="Create an account"
        subtitle="Join CineVerse and start choosing seats instantly."
        buttonLabel="Create account"
        onSubmit={handleSignup}
        switchText="Already have an account?"
        switchTo="/login"
        roleDefault="user"
      />
      {error && <p className="error-text centered">{error}</p>}
    </>
  )
}

function UserDashboardPage({ booking }) {
  return (
    <div className="dashboard-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Customer dashboard</p>
          <h2>Welcome back to CineVerse</h2>
        </div>
        <NavLink className="btn btn-primary" to="/movies">
          Browse movies
        </NavLink>
      </div>
      <div className="stats-grid">
        <div className="card stat-card">
          <h3>Next booking</h3>
          <p>{booking.movie.title}</p>
          <p>{booking.theatre.name}</p>
        </div>
        <div className="card stat-card">
          <h3>Member perks</h3>
          <p>Priority access to premium seats</p>
        </div>
        <div className="card stat-card">
          <h3>Rewards points</h3>
          <p>1,250 XP</p>
        </div>
      </div>
      <div className="section-header">
        <h3>Trending movies</h3>
        <NavLink to="/movies">View all</NavLink>
      </div>
      <div className="cards-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}

function MoviesPage() {
  return (
    <div>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Movie catalog</p>
          <h2>Choose your next watch</h2>
        </div>
      </div>
      <div className="cards-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}

function MovieDetailsPage({ booking, setBooking }) {
  const { movieId } = useParams()
  const navigate = useNavigate()
  const movie = movies.find((item) => item.id === Number(movieId)) || movies[0]

  const startBooking = () => {
    setBooking((current) => ({ ...current, movie }))
    navigate('/location')
  }

  return (
    <div className="detail-page">
      <div className="card detail-card">
        <div className="card-top" style={{ background: movie.accent }}>
          <span className="tag">{movie.tag}</span>
          <h3>{movie.title}</h3>
        </div>
        <div className="card-body">
          <p>{movie.genre}</p>
          <p>{movie.duration}</p>
          <p>⭐ {movie.rating}</p>
          <p>{movie.description}</p>
          <p>Language: {movie.language}</p>
          <button className="btn btn-primary" onClick={startBooking} type="button">
            Book this movie
          </button>
        </div>
      </div>
      <div className="card">
        <h3>Current selection</h3>
        <p>{booking.movie.title}</p>
        <p>{booking.location.area}</p>
      </div>
    </div>
  )
}

function LocationPage({ booking, setBooking }) {
  const navigate = useNavigate()

  return (
    <div>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Location</p>
          <h2>Select a nearby cinema area</h2>
        </div>
      </div>
      <div className="cards-grid">
        {locations.map((location) => (
          <button
            key={location.id}
            className="card card-action"
            onClick={() => {
              setBooking((current) => ({ ...current, location }))
              navigate('/theatres')
            }}
            type="button"
          >
            <h3>{location.area}</h3>
            <p>{location.city}</p>
            <p>{location.note}</p>
          </button>
        ))}
      </div>
      <p className="caption">Current pick: {booking.location.area}</p>
    </div>
  )
}

function TheatrePage({ booking, setBooking }) {
  const navigate = useNavigate()

  return (
    <div>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Theatre</p>
          <h2>Pick a theatre</h2>
        </div>
      </div>
      <div className="cards-grid">
        {theatres
          .filter((theatre) => theatre.city === booking.location.city)
          .map((theatre) => (
            <button
              key={theatre.id}
              className="card card-action"
              onClick={() => {
                setBooking((current) => ({ ...current, theatre }))
                navigate('/screens')
              }}
              type="button"
            >
              <h3>{theatre.name}</h3>
              <p>{theatre.area}</p>
              <p>Screens: {theatre.screens.join(', ')}</p>
            </button>
          ))}
      </div>
    </div>
  )
}

function ScreenPage({ booking, setBooking }) {
  const navigate = useNavigate()

  return (
    <div>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Screen</p>
          <h2>Select your auditorium</h2>
        </div>
      </div>
      <div className="cards-grid">
        {theatres.find((theatre) => theatre.name === booking.theatre.name)?.screens.map((screen) => (
          <button
            key={screen}
            className="card card-action"
            onClick={() => {
              setBooking((current) => ({ ...current, screen }))
              navigate('/showtimes')
            }}
            type="button"
          >
            <h3>{screen}</h3>
            <p>Dolby Atmos • Recliner seats</p>
          </button>
        ))}
      </div>
    </div>
  )
}

function ShowtimePage({ booking, setBooking }) {
  const navigate = useNavigate()

  return (
    <div>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Showtime</p>
          <h2>Choose a show</h2>
        </div>
      </div>
      <div className="cards-grid">
        {showtimes.map((showtime) => (
          <button
            key={showtime.id}
            className="card card-action"
            onClick={() => {
              setBooking((current) => ({ ...current, showtime }))
              navigate('/seats')
            }}
            type="button"
          >
            <h3>{showtime.time}</h3>
            <p>{showtime.label}</p>
          </button>
        ))}
      </div>
      <p className="caption">Current show: {booking.showtime.time}</p>
    </div>
  )
}

function SeatSelectionPage({ booking, setBooking }) {
  const navigate = useNavigate()
  const [selectedSeats, setSelectedSeats] = useState([])

  const toggleSeat = (seatId) => {
    setSelectedSeats((current) => (current.includes(seatId) ? current.filter((seat) => seat !== seatId) : [...current, seatId]))
  }

  const continueBooking = () => {
    setBooking((current) => ({ ...current, seats: selectedSeats }))
    navigate('/summary')
  }

  return (
    <div>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Seat selection</p>
          <h2>Choose premium seats</h2>
        </div>
      </div>
      <div className="card">
        <p>Screen: {booking.screen}</p>
        <p>Show: {booking.showtime.time}</p>
        <SeatGrid seats={seatLayout} selectedSeats={selectedSeats} onSelectSeat={toggleSeat} />
        <div className="button-row">
          <button className="btn btn-primary" onClick={continueBooking} type="button">
            Continue to summary
          </button>
        </div>
      </div>
    </div>
  )
}

function BookingSummaryPage({ booking }) {
  const navigate = useNavigate()
  const total = booking.seats.length * 300

  return (
    <div className="summary-page">
      <div className="card summary-card">
        <h2>Booking summary</h2>
        <p>Movie: {booking.movie.title}</p>
        <p>Theatre: {booking.theatre.name}</p>
        <p>Screen: {booking.screen}</p>
        <p>Showtime: {booking.showtime.time}</p>
        <p>Seats: {booking.seats.join(', ') || 'No seats selected'}</p>
        <p>Total: ₹{total}</p>
        <button className="btn btn-primary" onClick={() => navigate('/confirmation')} type="button">
          Confirm booking
        </button>
      </div>
    </div>
  )
}

function ConfirmationPage({ booking }) {
  return (
    <div className="confirmation-page">
      <div className="card success-card">
        <h2>Booking confirmed!</h2>
        <p>Your seats for {booking.movie.title} are reserved.</p>
        <p>Enjoy your experience at {booking.theatre.name}.</p>
        <NavLink className="btn btn-secondary" to="/history">
          View booking history
        </NavLink>
      </div>
    </div>
  )
}

function ProfilePage({ user }) {
  return (
    <div>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Profile</p>
          <h2>{user?.name || 'Guest profile'}</h2>
        </div>
      </div>
      <div className="cards-grid">
        <div className="card">
          <h3>Personal details</h3>
          <p>Email: {user?.email || 'guest@example.com'}</p>
          <p>Role: {user?.role || 'Customer'}</p>
        </div>
        <div className="card">
          <h3>Favorites</h3>
          <p>Neon Horizon</p>
          <p>Midnight Sonata</p>
        </div>
      </div>
    </div>
  )
}

function SettingsPage() {
  return (
    <div>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Settings</p>
          <h2>Customize preferences</h2>
        </div>
      </div>
      <div className="card">
        <p>Notifications: Enabled</p>
        <p>Preferred language: English</p>
        <p>Payment methods: Saved</p>
      </div>
    </div>
  )
}

function BookingHistoryPage() {
  return (
    <div>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Booking history</p>
          <h2>Past and upcoming visits</h2>
        </div>
      </div>
      <div className="card">
        <p>Neon Horizon • 12 Jun • Audi 1 • Seats A1, A2</p>
        <p>Shadow Circuit • 18 Jun • Audi 3 • Seats B2</p>
      </div>
    </div>
  )
}

function OwnerDashboardPage() {
  return (
    <div>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Theatre owner</p>
          <h2>Operations overview</h2>
        </div>
      </div>
      <div className="stats-grid">
        <div className="card stat-card"><h3>Shows today</h3><p>6 scheduled</p></div>
        <div className="card stat-card"><h3>Bookings</h3><p>48 confirmed</p></div>
        <div className="card stat-card"><h3>Occupancy</h3><p>74%</p></div>
      </div>
    </div>
  )
}

function OwnerMoviesPage() {
  return <div className="card"><h2>Add or edit movies</h2><p>Upload posters, update genres, and control display timing.</p></div>
}

function OwnerShowsPage() {
  return <div className="card"><h2>Manage shows</h2><p>Create new show timings for each auditorium and movie.</p></div>
}

function OwnerBookingsPage() {
  return <div className="card"><h2>View bookings</h2><p>Monitor customer reservations and occupancy by session.</p></div>
}

function OwnerScreensPage() {
  return <div className="card"><h2>Screen management</h2><p>Configure screen availability, formats, and maintenance windows.</p></div>
}

function OwnerLayoutPage() {
  return <div className="card"><h2>Seat layout configuration</h2><p>Adjust seat blocks, VIP rows, and wheelchair-accessible areas.</p></div>
}

function AdminDashboardPage() {
  return <div className="card"><h2>Admin panel</h2><p>Monitor theatres, user activity, and platform health.</p></div>
}

function AdminUsersPage() {
  return <div className="card"><h2>Manage users</h2><p>Review accounts, permissions, and recent signups.</p></div>
}

function AdminTheatresPage() {
  return <div className="card"><h2>Manage theatres</h2><p>Keep theatre listings, managers, and capacities aligned.</p></div>
}

function AdminRequestsPage() {
  return <div className="card"><h2>Theatre requests</h2><p>Approve or reject theatre owner onboarding requests.</p></div>
}

function AdminReportsPage() {
  return <div className="card"><h2>System overview</h2><p>Review reports, occupancy metrics, and revenue insights.</p></div>
}

function NotFoundPage() {
  return <div className="card"><h2>Page not found</h2><p>The route you requested is not available in this mock UI.</p></div>
}

export default App
