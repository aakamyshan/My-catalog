import React from 'react';
import ItemCard from './ItemCard';

export default function ItemList({ movies, onDeleteMovie }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px', marginBottom: '40px' }}>
      {movies.map((movie) => (
        <ItemCard
          key={movie.id} 
          {...movie}     
          onDelete={onDeleteMovie}
        />
      ))}
    </div>
  );
}
