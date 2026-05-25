import React, { useState, useEffect } from 'react';
import Container from './components/Container';
import Header from './components/Header';
import Filter from './components/Filter';
import AddItemForm from './components/AddItemForm';
import ItemList from './components/ItemList';
import { fetchMovies } from './services/api';

export default function App() {
  // Ініціалізація станів згідно з вимогами лабораторної
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Завантаження стартових даних з API за допомогою useEffect та AbortController
  useEffect(() => {
    const controller = new AbortController();

    const getMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchMovies(controller.signal);
        setMovies(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getMovies();

    // Функція очищення (Cleanup) для скасування запиту при розмонтуванні
    return () => controller.abort();
  }, []);

  // Іммутабельне додавання нового фільму
  const handleAddMovie = (newMovie) => {
    setMovies((prev) => [newMovie, ...prev]);
  };

  // Іммутабельне видалення фільму за ID
  const handleDeleteMovie = (id) => {
    setMovies((prev) => prev.filter((movie) => movie.id !== id));
  };

  // Фільтрація списку за пошуковим запитом з Header
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Сортування відфільтрованого списку за обраним критерієм з Filter
  const sortedMovies = [...filteredMovies].sort((a, b) => {
    if (sortBy === 'rating-desc') return b.rating - a.rating;
    if (sortBy === 'year-desc') return b.year.localeCompare(a.year);
    if (sortBy === 'year-asc') return a.year.localeCompare(b.year);
    return 0;
  });

  return (
    <Container>
      <Header query={searchQuery} onSearchChange={setSearchQuery} />
      <Filter sortBy={sortBy} onSortChange={setSortBy} />
      <AddItemForm onAddMovie={handleAddMovie} />

      {/* Умовний рендеринг (Conditional Rendering) для 4 станів */}
      {isLoading && (
        <p style={{ fontSize: '1.2rem', color: '#666', textAlign: 'center' }}>
          Завантаження фільмів із сервера...
        </p>
      )}
      
      {error && (
        <p style={{ color: '#ff4d4d', fontWeight: 'bold', textAlign: 'center' }}>
          Помилка: {error}
        </p>
      )}
      
      {!isLoading && !error && sortedMovies.length === 0 && (
        <p style={{ fontStyle: 'italic', color: '#999', textAlign: 'center' }}>
          Фільмів не знайдено за вашим запитом
        </p>
      )}
      
      {!isLoading && !error && sortedMovies.length > 0 && (
        <ItemList movies={sortedMovies} onDeleteMovie={handleDeleteMovie} />
      )}
    </Container>
  );
}
