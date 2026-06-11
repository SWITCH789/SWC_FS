import { Link } from 'react-router-dom'

function HomePage({ events }) {
  return (
    <section className="page-grid">
      <div className="hero-card">
        <p className="eyebrow">Day 02 • Static UI & Navigation</p>
        <h2>Reserve a seat for the next great journey.</h2>
        <p className="hero-copy">
          Skyline Travel combines a polished booking experience with simple routes,
          mock authentication, and static data for a complete frontend preview.
        </p>
        <div className="hero-actions">
          <Link className="primary-btn" to="/events">
            Browse events
          </Link>
          <Link className="secondary-btn" to="/login">
            Simulate login
          </Link>
        </div>
      </div>

      <div className="stats-card">
        <h3>Why travelers love it</h3>
        <ul>
          <li>Fast event discovery</li>
          <li>Safe-looking ticket flow</li>
          <li>UI-ready auth experience</li>
        </ul>
      </div>

      <div className="preview-card">
        <h3>Popular this week</h3>
        <div className="preview-list">
          {events.slice(0, 3).map((event) => (
            <article key={event.title} className="preview-item">
              <div>
                <h4>{event.title}</h4>
                <p>{event.location}</p>
              </div>
              <span>{event.price}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomePage
