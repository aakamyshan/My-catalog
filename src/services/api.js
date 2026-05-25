const API_KEY = '7774c86'; 
const BASE_URL = `https://omdbapi.com{API_KEY}&s=marvel`; 

// Локальні дані на випадок помилки мережі (Failed to fetch)
const fallbackMovies = [
  { id: "m1", title: "The Avengers", year: "2012", rating: "8.0", image: "https://images.jpg" },
  { id: "m2", title: "Iron Man", year: "2008", rating: "7.9", image: "https://images.jpg" },
  { id: "m3", title: "Spider-Man: No Way Home", year: "2021", rating: "8.2", image: "https://images.jpg" },
  { id: "m4", title: "Thor: Ragnarok", year: "2017", rating: "7.9", image: "https://images.jpg" },
  { id: "m5", title: "Guardians of the Galaxy", year: "2014", rating: "8.0", image: "https://images.jpg" }
];

export const fetchMovies = async (signal) => {
  try {
    const response = await fetch(BASE_URL, { signal });
    if (!response.ok) throw new Error('Помилка сервера');
    
    const data = await response.json();
    if (data.Response === "False") throw new Error(data.Error);

    return data.Search.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      image: movie.Poster !== "N/A" ? movie.Poster : "https://placeholder.com",
      year: movie.Year,
      rating: (Math.random() * 2 + 7.5).toFixed(1) 
    }));
  } catch (err) {
    // Якщо запит скасовано навмисно, прокидаємо помилку далі
    if (err.name === 'AbortError') throw err;
    
    // При будь-якій іншій помилці мережі (Failed to fetch) повертаємо локальні фільми
    console.warn("API недоступне, завантажено локальний список:", err.message);
    return fallbackMovies;
  }
};
