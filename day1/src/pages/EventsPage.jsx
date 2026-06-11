function EventsPage({ events, onBook, bookings }) {
  const bookedTitles = new Set(bookings.map((booking) => booking.title))

  return (
    <section className="page-card">
      <div className="section-header">
        <div>
          <p className="eyebrow">Live departures</p>
          <h2>Choose your next ride</h2>
        </div>
        <span className="badge">{bookings.length} tickets saved</span>
      </div>

      <div className="event-grid">
        {events.map((event) => (
          <article key={event.title} className="event-card">
            <div className="event-top">
              <p className="eyebrow">{event.category}</p>
              <h3>{event.title}</h3>
            </div>
            <p className="event-meta">
              {event.date} • {event.location}
            </p>
            <p className="event-description">{event.description}</p>
            <div className="event-footer">
              <span className="price">{event.price}</span>
              <button
                type="button"
                className="primary-btn"
                onClick={() => onBook(event)}
              >
                {bookedTitles.has(event.title) ? 'Booked' : 'Book seat'}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default EventsPage
