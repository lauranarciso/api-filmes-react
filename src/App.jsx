import { useState, useEffect } from "react";
import { InputText } from "./components/input/input-text";
import { Button } from "./components/buttons/button";
import { LoadingIcon } from "./components/icons/loading-icon";
import { VoltarIcon } from "./components/icons/voltar-icon";
import { ProximoIcon } from "./components/icons/proximo-icon";

function App() {
  const [movies, setMovies] = useState([]);
  const [isNotFound, setIsNotFound] = useState(false);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const favs = localStorage.getItem("favorites");
    if (favs) setFavorites(JSON.parse(favs));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (movie) => {
    if (favorites.some((fav) => fav.imdbID === movie.imdbID)) {
      setFavorites(favorites.filter((fav) => fav.imdbID !== movie.imdbID));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  const isFavorited =
    movieDetails && favorites.some((fav) => fav.imdbID === movieDetails.imdbID);

  const getMovies = async (search, page) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=840b8871&s=${search}&page=${page}&type=movie`,
        { method: "GET" }
      );

      if (!response.ok) {
        throw new Error("Erro na requisição");
      }

      const data = await response.json();
      if (data.Search) {
        setMovies(data.Search);
        setIsNotFound(false);
      } else {
        setIsNotFound(true);
        setMovies([]);
      }
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
      setIsNotFound(true);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getMovieDetails = async (imdbID) => {
    setIsLoadingModal(true);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=840b8871&i=${imdbID}&plot=brief`,
        { method: "GET" }
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar detalhes");
      }
      const data = await response.json();
      setMovieDetails(data);
    } catch (error) {
      console.error("Erro ao buscar detalhes do filme:", error);
      setMovieDetails(null);
    } finally {
      setIsLoadingModal(false);
    }
  };

  const handleNextPage = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    getMovies(search, nextPage);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      const prevPage = page - 1;
      setPage(prevPage);
      getMovies(search, prevPage);
    }
  };

  const handleOpenModal = (movie) => {
    setIsModalOpen(true);
    getMovieDetails(movie.imdbID);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setMovieDetails(null);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  return (
    <>
      <section
        className={`w-full items-center text-center p-12 flex flex-col gap-12 ${
          isModalOpen ? "blur-sm overflow-y-hidden" : ""
        }`}
      >
        <div className="flex justify-center lg:justify-end gap-4 w-full">
          <button
            className={`cursor-pointer rounded-lg font-semibold text-lg ${
              activeTab === "all" ? "underline text-primary" : "text-text"
            }`}
            onClick={() => setActiveTab("all")}
          >
            Todos
          </button>
          <button
            className={`cursor-pointer rounded-lg font-semibold text-lg ${
              activeTab === "favorites" ? "underline text-primary" : "text-text"
            }`}
            onClick={() => setActiveTab("favorites")}
          >
            Favoritos
          </button>
        </div>

        {activeTab === "all" && (
          <>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <h1 className="text-primary text-3xl lg:text-5xl font-bold">
                  Movies
                </h1>
                <p className="text-gray-400 lg:text-xl">
                  Encontre seus filmes favoritos e descubra novos títulos para
                  assistir
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <InputText
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  placeholder="Digite o nome do filme..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && search && !isLoading) {
                      setPage(1);
                      getMovies(search, 1);
                    }
                  }}
                />
                <Button
                  onClick={() => {
                    setPage(1);
                    getMovies(search, 1);
                  }}
                  disabled={!search || isLoading}
                  label="Buscar"
                />
              </div>
            </div>
            {!isNotFound && movies.length === 0 ? (
              <div className="flex flex-col gap-1">
                <h3 className="text-text text-lg lg:text-2xl font-bold">
                  Pronto para encontrar movies incríveis?
                </h3>
                <p className="text-gray-400">
                  Use a barra de pesquisa acima para encontrar informações sobre
                  qualquer filme.
                </p>
              </div>
            ) : isNotFound ? (
              <h3 className="text-text text-lg lg:text-2xl font-bold">
                Nenhum filme encontrado. Tente novamente.
              </h3>
            ) : isLoading ? (
              <LoadingIcon />
            ) : (
              <div className="flex flex-wrap justify-center gap-4">
                {movies.map((movie, index) => (
                  <button
                    key={index}
                    onClick={() => handleOpenModal(movie)}
                    className="hover:scale-105 transition-transform duration-300 cursor-pointer border-2 border-transparent hover:border-primary rounded-lg flex flex-col gap-2"
                  >
                    <img
                      className="rounded-lg h-120"
                      src={movie.Poster}
                      alt={`poster do filme ${movie.Title}`}
                    />
                    <div className="flex flex-col items-center gap-2 p-1">
                      <p className="text-text font-bold truncate max-w-[280px]">
                        ${movie.Title}
                      </p>
                      <p className="text-gray-400">{movie.Year}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
            {movies.length > 0 && !isNotFound && !isLoading && (
              <div className="flex gap-4 items-center">
                <Button
                  onClick={handlePrevPage}
                  label="Anterior"
                  disabled={page === 1}
                  className="hidden md:block"
                />
                <button
                  onClick={handlePrevPage}
                  disabled={page === 1}
                  className="md:hidden bg-primary p-2 rounded-lg"
                >
                  <VoltarIcon />
                </button>
                <span className="text-text text-sm lg:text-lg font-bold">
                  Página {page}
                </span>
                <Button
                  onClick={handleNextPage}
                  label="Próxima"
                  className="hidden md:block"
                />
                <button
                  onClick={handleNextPage}
                  className="md:hidden bg-primary p-2 rounded-lg"
                >
                  <ProximoIcon />
                </button>
              </div>
            )}
          </>
        )}

        {activeTab === "favorites" && (
          <>
            <div className="flex flex-col gap-4">
              <h1 className="text-primary text-3xl lg:text-5xl font-bold">
                Meus Favoritos
              </h1>
              <p className="text-gray-400 lg:text-xl">
                Veja todos os filmes que você favoritou em um só lugar.
              </p>
            </div>
            {favorites.length === 0 ? (
              <p className="text-text text-lg lg:text-2xl font-bold">
                Nenhum filme favoritado ainda.
              </p>
            ) : (
              <div className="flex flex-wrap justify-center gap-4">
                {favorites.map((favorite, index) => (
                  <button
                    key={index}
                    onClick={() => handleOpenModal(favorite)}
                    className="hover:scale-105 transition-transform duration-300 cursor-pointer border-2 border-transparent hover:border-primary rounded-lg flex flex-col gap-2"
                  >
                    <img
                      className="rounded-lg h-120"
                      src={favorite.Poster}
                      alt={`poster do filme ${favorite.Title}`}
                    />
                    <div className="flex flex-col items-center gap-2 p-1">
                      <p className="text-text font-bold truncate max-w-[280px]">
                        ${favorite.Title}
                      </p>
                      <p className="text-gray-400">{favorite.Year}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </section>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-3xl w-full relative shadow-2xl md:max-h-[90%]">
            {isLoadingModal ? (
              <div className="flex justify-center items-center h-64">
                <LoadingIcon />
              </div>
            ) : movieDetails ? (
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-black text-2xl font-bold">
                    {movieDetails.Title}
                  </h2>
                  <button
                    className="text-black text-3xl font-bold cursor-pointer"
                    onClick={handleCloseModal}
                  >
                    &times;
                  </button>
                </div>
                <div className="text-black flex flex-col gap-2">
                  <p>
                    <strong>Ano:</strong> {movieDetails.Year}
                  </p>
                  <p>
                    <strong>Gênero:</strong> {movieDetails.Genre}
                  </p>
                  <p>
                    <strong>Diretor:</strong> {movieDetails.Director}
                  </p>
                  <p>
                    <strong>Atores:</strong> {movieDetails.Actors}
                  </p>
                  <p>
                    <strong>Avaliação:</strong> {movieDetails.imdbRating}
                  </p>
                  <p>
                    <strong>Sínopse:</strong> {movieDetails.Plot}
                  </p>
                </div>
                <Button
                  onClick={() => toggleFavorite(movieDetails)}
                  label={isFavorited ? "Remover dos Favoritos" : "Favoritar"}
                  className={`mb-2 ${
                    isFavorited ? "bg-red-500" : "bg-primary"
                  }`}
                />
              </div>
            ) : (
              <p className="text-gray-300">
                Não foi possível carregar os detalhes do filme.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
