import React, { useEffect, useState } from "react";
const API_URL = "https://swapi.dev/api/films";
const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // ye ek function bana rahe hain taaki hum usko call kar saken
  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      console.log(data);
      setMovies(data.results);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
    //   fetch(API_URL)
    //     .then((res) => {
    //       // response object ko JSON me convert karna zaruri hai
    //       return res.json();
    //     })
    //     .then((data) => {
    //       console.log("Fetched Data:", data);
    //       setMovies(data.results || []); // data.results me movies list aati hai
    //     })
    //     .catch((err) => {
    //       console.error("Error fetching movies:", err);
    //     });
    // };
  };

  // useEffect(() => {
  //   fetchMovies(); // function call kar diya
  // }, []);
  return (
    <div style={{ padding: "20px" }}>
      <h2>🎬 Star Wars Movies</h2>
      <div>
        <button onClick={fetchMovies}>Fetch List</button>
      </div>
      {/* Loading indicator */}
      {isLoading ? (
        <p>Loading movies...</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {movies.map((movie) => (
            <li
              key={movie.episode_id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "10px",
                marginBottom: "10px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h3>{movie.title}</h3>
              <p>
                <strong>Release Date:</strong> {movie.release_date}
              </p>
              <p>
                <strong>Director:</strong> {movie.director}
              </p>
              <p>{movie.opening_crawl.slice(0, 100)}...</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Movie;
