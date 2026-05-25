import React from 'react';

export default function ItemCard({ id, title, image, year, rating, onDelete }) {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', display: 'flex', flexDirection: 'column', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
      <img src={image} alt={title} style={{ width: '100%', height: '320px', objectFit: 'cover', borderRadius: '4px' }} />
      <h3 style={{ margin: '12px 0 6px 0', fontSize: '1.1rem', color: '#222' }}>{title}</h3>
      <p style={{ margin: '0 0 6px 0', color: '#666', fontSize: '0.9rem' }}>Рік: {year}</p>
      <p style={{ margin: '0 0 15px 0', fontWeight: 'bold', color: '#ff9800' }}>⭐ {rating}</p>
      <button 
        onClick={() => onDelete(id)}
        style={{ marginTop: 'auto', padding: '8px', backgroundColor: '#ff4d4d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        Видалити
      </button>
    </div>
  );
}
