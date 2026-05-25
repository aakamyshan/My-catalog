import React from 'react';

export default function Header({ query, onSearchChange }) {
  return (
    <header style={{ padding: '20px 0', borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
      <h1 style={{ margin: 0, color: '#333' }}>🎬 Мій Каталог Фільмів</h1>
      <input
        type="text"
        placeholder="Пошук фільму за назвою..."
        value={query}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{ padding: '8px', width: '100%', maxWidth: '400px', marginTop: '15px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
    </header>
  );
}
