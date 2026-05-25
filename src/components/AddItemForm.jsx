import React, { useState } from 'react';

export default function AddItemForm({ onAddMovie }) {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !year.trim()) return;

    const newMovie = {
      id: Date.now().toString(),
      title,
      year,
      rating: rating ? parseFloat(rating).toFixed(1) : '7.0',
      image: 'https://placeholder.com'
    };

    onAddMovie(newMovie);

    setTitle('');
    setYear('');
    setRating('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', maxWidth: '400px', marginBottom: '40px', backgroundColor: '#f9f9f9' }}>
      <h3 style={{ marginTop: 0 }}>➕ Додати фільм у каталог</h3>
      <div style={{ marginBottom: '10px' }}>
        <input 
          type="text" 
          placeholder="Назва фільму" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} 
          required 
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input 
          type="number" 
          placeholder="Рік випуску" 
          value={year} 
          onChange={(e) => setYear(e.target.value)} 
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} 
          required 
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <input 
          type="number" 
          step="0.1" 
          min="1" 
          max="10" 
          placeholder="Рейтинг (наприклад, 8.5)" 
          value={rating} 
          onChange={(e) => setRating(e.target.value)} 
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} 
        />
      </div>
      <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%', fontWeight: 'bold' }}>
        Створити картку
      </button>
    </form>
  );
}
