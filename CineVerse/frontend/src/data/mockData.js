export const movies = [
  {
    id: 1,
    title: 'Neon Horizon',
    genre: 'Sci-Fi / Adventure',
    duration: '2h 10m',
    rating: '8.7',
    language: 'English',
    description: 'A daring pilot uncovers a signal that could change the fate of humanity.',
    tag: 'Now Showing',
    accent: 'linear-gradient(135deg, #7c3aed, #2563eb)',
  },
  {
    id: 2,
    title: 'Midnight Sonata',
    genre: 'Drama / Music',
    duration: '1h 58m',
    rating: '8.3',
    language: 'Hindi',
    description: 'A gifted composer redefines her future during the city lights festival.',
    tag: 'Trending',
    accent: 'linear-gradient(135deg, #0f766e, #14b8a6)',
  },
  {
    id: 3,
    title: 'Shadow Circuit',
    genre: 'Thriller',
    duration: '2h 02m',
    rating: '8.9',
    language: 'English',
    description: 'A cyber investigator chases a conspiracy hidden in plain sight.',
    tag: 'Recommended',
    accent: 'linear-gradient(135deg, #b91c1c, #f59e0b)',
  },
]

export const locations = [
  { id: 1, city: 'Mumbai', area: 'Lokhandwala', note: 'Mall & parking nearby' },
  { id: 2, city: 'Mumbai', area: 'Andheri', note: 'Quick access from metro' },
  { id: 3, city: 'Pune', area: 'Viman Nagar', note: 'Premium lounges' },
]

export const theatres = [
  {
    id: 1,
    city: 'Mumbai',
    area: 'Lokhandwala',
    name: 'CineVerse Luxe',
    screens: ['Audi 1', 'Audi 3'],
  },
  {
    id: 2,
    city: 'Mumbai',
    area: 'Andheri',
    name: 'Galaxy Plaza',
    screens: ['Audi 2', 'Audi 5'],
  },
  {
    id: 3,
    city: 'Pune',
    area: 'Viman Nagar',
    name: 'Nova Cinema',
    screens: ['Audi 4'],
  },
]

export const showtimes = [
  { id: 1, time: '10:30 AM', label: 'Morning Show' },
  { id: 2, time: '1:30 PM', label: 'Matinee' },
  { id: 3, time: '7:00 PM', label: 'Prime Show' },
]

export const seatLayout = [
  { id: 'A1', status: 'available' },
  { id: 'A2', status: 'available' },
  { id: 'A3', status: 'booked' },
  { id: 'A4', status: 'available' },
  { id: 'B1', status: 'available' },
  { id: 'B2', status: 'available' },
  { id: 'B3', status: 'available' },
  { id: 'B4', status: 'booked' },
  { id: 'C1', status: 'available' },
  { id: 'C2', status: 'available' },
  { id: 'C3', status: 'available' },
  { id: 'C4', status: 'available' },
]
