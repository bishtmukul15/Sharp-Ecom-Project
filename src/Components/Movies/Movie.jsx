import React, { useCallback, useRef, useState, useEffect } from "react";

const API_URL =
  "https://react-http-1c2c7-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json";

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retrying, setRetrying] = useState(false);
  const [newMovie, setNewMovie] = useState({
    title: "",
    openingText: "",
    releaseDate: "",
  });

  const retryTimeout = useRef(null);

  // 🎬 Fetch Movies
  const fetchMovies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setRetrying(false);

    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
        throw new Error("Something went wrong...Retrying");
      }

      const data = await res.json();

      // Firebase returns object → convert to array
      const loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setMovies(loadedMovies);
      setIsLoading(false);

      if (retryTimeout.current) {
        clearTimeout(retryTimeout.current);
        retryTimeout.current = null;
      }
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      setRetrying(true);

      console.error("Error fetching movies:", error);

      retryTimeout.current = setTimeout(() => {
        fetchMovies();
      }, 5000);
    }
  }, []);

  useEffect(() => {
    fetchMovies();

    return () => {
      if (retryTimeout.current) clearTimeout(retryTimeout.current);
    };
  }, [fetchMovies]);

  // ❌ Cancel retry
  const cancelRetry = () => {
    if (retryTimeout.current) {
      clearTimeout(retryTimeout.current);
      retryTimeout.current = null;
      setRetrying(false);
      setError("Retry cancelled by user");
    }
  };

  // 📝 Input change handler
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewMovie((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // 🎬 Add Movie (POST to Firebase)
  const addMoviesHandler = async (e) => {
    e.preventDefault();

    const newMovieObj = {
      title: newMovie.title.trim(),
      openingText: newMovie.openingText.trim(),
      releaseDate: newMovie.releaseDate.trim(),
    };

    if (
      !newMovieObj.title ||
      !newMovieObj.openingText ||
      !newMovieObj.releaseDate
    ) {
      alert("Please fill all fields before adding!");
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(newMovieObj),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to add movie");

      console.log("New Movie Added:", newMovieObj);
      // 🔁 Fetch again to update UI
      fetchMovies();
      setNewMovie({ title: "", openingText: "", releaseDate: "" });
    } catch (err) {
      console.error(err);
      setError("Failed to add movie.");
    }
  };

  // ❌ Delete Movie
  const deleteMovieHandler = async (id) => {
    try {
      const res = await fetch(
        `https://react-http-1c2c7-default-rtdb.asia-southeast1.firebasedatabase.app/movies/${id}.json`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Failed to delete movie");

      // 🔄 Update UI instantly
      setMovies((prevMovies) => prevMovies.filter((m) => m.id !== id));
      console.log("Deleted movie with id:", id);
    } catch (err) {
      console.error("Error deleting movie:", err);
      setError("Failed to delete movie.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🎬 Star Wars Movies (Firebase CRUD)</h2>

      {/* 🧾 Add Movie Form */}
      <form
        onSubmit={addMoviesHandler}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "15px",
          background: "#f3f3f3",
          maxWidth: "400px",
        }}
      >
        <label htmlFor="title">🎞️ Title:</label>
        <input
          type="text"
          id="title"
          value={newMovie.title}
          onChange={handleInputChange}
          placeholder="Enter movie title"
        />

        <label htmlFor="openingText">📝 Opening Text:</label>
        <input
          type="text"
          id="openingText"
          value={newMovie.openingText}
          onChange={handleInputChange}
          placeholder="Enter opening text"
        />

        <label htmlFor="releaseDate">📅 Release Date:</label>
        <input
          type="text"
          id="releaseDate"
          value={newMovie.releaseDate}
          onChange={handleInputChange}
          placeholder="YYYY-MM-DD"
        />

        <button
          type="submit"
          style={{
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            padding: "8px",
            borderRadius: "6px",
          }}
        >
          Add Movie
        </button>
      </form>

      {/* 🎥 Fetch & Cancel Buttons */}
      <div style={{ marginBottom: "15px" }}>
        <button onClick={fetchMovies}>Fetch List</button>
        {retrying && (
          <button onClick={cancelRetry} style={{ marginLeft: "10px" }}>
            Cancel Retry
          </button>
        )}
      </div>

      {/* ⏳ Loading / Error / Movie List */}
      {isLoading && <p>Loading movies...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {movies.map((movie) => (
          <li
            key={movie.id}
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
              <strong>Release Date:</strong> {movie.releaseDate}
            </p>
            <p>
              <strong>Opening Text:</strong> {movie.openingText}
            </p>
            <button
              onClick={() => deleteMovieHandler(movie.id)}
              style={{
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                padding: "5px 8px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Delete Movie
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movie;
