import { NavLink, Outlet } from 'react-router-dom'

function SharedLayout({ user, onLogout, role }) {
  const dashboardPath = role === 'owner' ? '/owner-dashboard' : role === 'admin' ? '/admin/dashboard' : '/dashboard'

  const links =
    role === 'owner'
      ? [
          { to: '/owner-dashboard', label: 'Dashboard' },
          { to: '/owner-dashboard/movies', label: 'Movies' },
          { to: '/owner-dashboard/shows', label: 'Shows' },
          { to: '/owner-dashboard/bookings', label: 'Bookings' },
        ]
      : role === 'admin'
        ? [
            { to: '/admin/dashboard', label: 'Overview' },
            { to: '/admin/users', label: 'Users' },
            { to: '/admin/theatres', label: 'Theatres' },
            { to: '/admin/requests', label: 'Requests' },
          ]
        : [
            { to: '/dashboard', label: 'Home' },
            { to: '/movies', label: 'Movies' },
            { to: '/profile', label: 'Profile' },
            { to: '/history', label: 'History' },
          ]

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <h1>CineVerse</h1>
          <p>Movie booking platform with integrated auth and role-based routing.</p>
        </div>
        <div className="topbar-actions">
          <span className="pill">{user?.name || 'Guest'}</span>
          <NavLink className="btn btn-secondary" to={dashboardPath}>
            Dashboard
          </NavLink>
          <button className="btn btn-secondary" onClick={onLogout} type="button">
            Logout
          </button>
        </div>
      </header>

      <div className="content-layout">
        <aside className="sidebar">
          {links.map((link) => (
            <NavLink key={link.to} className="sidebar-link" to={link.to}>
              {link.label}
            </NavLink>
          ))}
        </aside>

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default SharedLayout
