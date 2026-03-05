import { useState } from "react";
import "./App.css";

function App() {

  const [nombre, setNombre] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    if(nombre === ""){
      setError("Escribe bien el nombre del pokemon");
      return;
    }

    try{

      setLoading(true);
      setError("");

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`
      );

      if(!response.ok){
        throw new Error("Pokemon no encontrado");
      }

      const data = await response.json();
      setPokemon(data);

    } catch (error) {

      setPokemon(null);
      setError("Pokemon no encontrado, vuelva a intentarlo");

    } finally {

      setLoading(false);

    }

  };

  return (
    <>
      <h1>Buscador Pokemon</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Introduce el nombre de un pokemon"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <button type="submit">Buscar</button>

      </form>

      {loading && <p>Buscando...</p>}

      {error && <p>Error: {error}</p>}

      {pokemon && (
        <div>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
      )}

    </>
  );
}

export default App;