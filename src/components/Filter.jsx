import React from 'react';

export default function Filter({ sortBy, onSortChange }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <label htmlFor="sort-select" style={{ marginRight: '10px', fontWeight: 'bold' }}>Сортувати за:</label>
      <select 
        id="sort-select"
        value={sortBy} 
        onChange={(e) => onSortChange(e.target.value)}
        style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
      >
        <option value="default">Без сортування</option>
        <option value="rating-desc">Рейтинг: спочатку високий</option>
        <option value="year-desc">Рік: спочатку нові</option>
        <option value="year-asc">Рік: спочатку старі</option>
      </select>
    </div>
  );
}
