import { Link } from 'react-router-dom'

function TicketsPage({ bookings, isLoggedIn }) {
  if (!isLoggedIn) {
    return (
      <section className="page-card">
        <p className="eyebrow">Protected view</p>
        <h2>Sign in to view your tickets</h2>
        <p>Static JWT simulation keeps the flow simple and UI-focused.</p>
        <Link className="primary-btn" to="/login">
          Go to login
        </Link>
      </section>
    )
  }

  if (!bookings.length) {
    return (
      <section className="page-card">
        <p className="eyebrow">No bookings yet</p>
        <h2>Start by choosing an event</h2>
        <p>Your future reservations will appear here instantly.</p>
        <Link className="primary-btn" to="/events">
          Explore events
        </Link>
      </section>
    )
  }

  return (
    <section className="page-card">
      <div className="section-header">
        <div>
          <p className="eyebrow">Your reservations</p>
          <h2>Booked tickets</h2>
        </div>
        <span className="badge">{bookings.length} active</span>
      </div>

      <div className="ticket-list">
        {bookings.map((booking) => (
          <article key={booking.title + booking.bookedAt} className="ticket-card">
            <div>
              <h3>{booking.title}</h3>
              <p>{booking.date}</p>
              <p>{booking.location}</p>
            </div>
            <div className="ticket-meta">
              <span>{booking.price}</span>
              <small>Booked {booking.bookedAt}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default TicketsPage
