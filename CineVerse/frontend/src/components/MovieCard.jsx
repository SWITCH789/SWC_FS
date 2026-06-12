import { Link } from 'react-router-dom'

function MovieCard({ movie }) {
  return (
    <article className="card movie-card">
      <div className="card-top" style={{ background: movie.accent }}>
        <span className="tag">{movie.tag}</span>
        <h3>{movie.title}</h3>
      </div>
      <div className="card-body">
        <p>{movie.genre}</p>
        <p>{movie.duration}</p>
        <p>⭐ {movie.rating}</p>
        <p>{movie.description}</p>
        <Link className="btn btn-primary" to={`/movie/${movie.id}`}>
          View Details
        </Link>
      </div>
    </article>
  )
}

export default MovieCard
