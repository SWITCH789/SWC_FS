import { NavLink } from 'react-router-dom'

function Navbar({ isLoggedIn, onLogout }) {
  return (
    <nav className="main-nav">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/events">Events</NavLink>
      <NavLink to="/tickets">My Tickets</NavLink>
      {isLoggedIn ? (
        <button type="button" className="nav-button" onClick={onLogout}>
          Logout
        </button>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
    </nav>
  )
}

export default Navbar
