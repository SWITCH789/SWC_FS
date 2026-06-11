import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import './App.css'

const tickets = [
  { id: 1, name: 'CTU Bus (Chandigarh - Delhi)', time: '4:00 PM', price: 'Rs. 435' },
  { id: 2, name: 'Haryana Roadways (Chandigarh - Delhi)', time: '3:30 PM', price: 'Rs. 300' },
]

function HomePage() {
  return (
    <section className="card">
      <h2>Welcome to EasyBus</h2>
      <p>Book your seat in a few clicks.</p>
      <Link className="button" to="/book">
        Book a ticket
      </Link>
    </section>
  )
}

function BookingPage({ tickets, selectedTicket, onSelect }) {
  return (
    <section className="card">
      <h2>Available tickets</h2>
      {tickets.map((ticket) => (
        <div key={ticket.id} className="ticket-row">
          <div>
            <strong>{ticket.name}</strong>
            <p>{ticket.time}</p>
          </div>
          <div className="ticket-actions">
            <span>{ticket.price}</span>
            <button type="button" onClick={() => onSelect(ticket)}>
              {selectedTicket?.id === ticket.id ? 'Selected' : 'Select'}
            </button>
          </div>
        </div>
      ))}
    </section>
  )
}

function App() {
  const [selectedTicket, setSelectedTicket] = useState(null)

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">SWC_FS_Day2</p>
          <h1>EasyBus</h1>
        </div>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/book">Book</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/book"
            element={
              <BookingPage
                tickets={tickets}
                selectedTicket={selectedTicket}
                onSelect={setSelectedTicket}
              />
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
