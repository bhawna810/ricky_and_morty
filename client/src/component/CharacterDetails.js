import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

const CharacterDetails = () => {
  const [character, setCharacter] = useState(null);
  const  { id } = useParams();

  useEffect(() => {
    const fetchCharacter = async () => {
      const response = await axios.get(`http://localhost:5000/character/${id}`);
      console.log(response.data);
      setCharacter(response.data);
    };

    fetchCharacter();
  }, [id]);

  if (!character) return <div>Loading...</div>;

  return (
    <div>
      <h1>{character.name}</h1>
      <img src={character.image} alt={character.name} />
      <p>Species: {character.species}</p>
      <p>Status: {character.status}</p>
      <p>Origin: {character.origin.name}</p>
      <p>Location: {character.location.name}</p>
    </div>
  );
}

export default CharacterDetails;
