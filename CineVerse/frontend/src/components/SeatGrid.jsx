function SeatGrid({ seats, selectedSeats, onSelectSeat }) {
  return (
    <div className="seat-grid">
      {seats.map((seat) => {
        const isSelected = selectedSeats.includes(seat.id)
        const isBooked = seat.status === 'booked'
        return (
          <button
            key={seat.id}
            className={`seat ${isSelected ? 'selected' : ''} ${isBooked ? 'booked' : ''}`}
            disabled={isBooked}
            onClick={() => onSelectSeat(seat.id)}
            type="button"
          >
            {seat.id}
          </button>
        )
      })}
    </div>
  )
}

export default SeatGrid
