import { useState, useEffect } from "react";
import { InputText } from "./components/input/input-text";
import { Button } from "./components/buttons/button";

function App() {
  const [filmes, setFilmes] = useState([]);
  const getFilmes = async () => {
    const response = await fetch(
      "https://www.omdbapi.com/?apikey=840b8871&s=Harry&page=1&type=movie",
      { method: "GET" }
    );
    if (response.ok) {
      let data = await response.json();
      console.log(data);
      setFilmes(data.Search);
    } else {
      setFilmes([]);
    }
  };

  return (
    <>
      <section className="bg-background h-screen w-full items-center text-center p-12 flex flex-col justify-between">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-primary text-5xl font-bold">Movies</h1>
            <p className="text-gray-400 text-xl">
              Encontre seus filmes favoritos e descubra novos títulos para
              assistir
            </p>
          </div>
          <div className="flex gap-4">
            <InputText 
            placeholder="Digite o nome do filme..."
            />
            <Button label="Buscar" />
          </div>
        </div>
        {filmes.length === 0 ? (
          <div className="flex flex-col gap-1">
            <h3 className="text-text text-2xl font-bold">
              Pronto para encontrar filmes incríveis?
            </h3>
            <p className="text-gray-400 text-base">
              Use a barra de pesquisa acima para encontrar informações sobre
              qualquer filme.
            </p>
          </div>
        ) : (
          filmes.map((filme, index) => (
            <div key={index}>
              <img src={filme.Poster} alt={`poster do filme ${filme.Title}`} />
            </div>
          ))
        )}
        <div></div>
      </section>
    </>
  );
}

export default App;
