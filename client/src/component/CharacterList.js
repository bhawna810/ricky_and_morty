import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await axios.get('http://localhost:5000/characters');
      setCharacters(response.data);
    };

    fetchCharacters();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(3);
  const [numberOfButton] = useState(4);

  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProduct = characters.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(characters.length / productPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  function renderPageNumbers() {
    const pageNumber = [];

    let startIndex = Math.max(1, currentPage - 1);
    let endIndex = Math.min(startIndex + numberOfButton - 1, totalPages);

    if (startIndex + numberOfButton - 1 >= totalPages) {
      startIndex = totalPages - numberOfButton + 1;
    }

    for (let i = startIndex; i <= endIndex; i++) {
      pageNumber.push(
        <button onClick={() => handleClick(i)} disabled={currentPage === i}>
          {i}
        </button>
      );
    }
    return pageNumber;
  }

  return (
    <div>
      <h1>Character List</h1>
      {currentProduct.map((character) => (
        <div key={character.id}>
          <Link to={`/character/${character.id}`}>
            <h2>{character.name}</h2>
            <img src={character.image} alt={character.name} />
            <p>Species: {character.species}</p>
          </Link>
        </div>
      ))}
      <div>
         {renderPageNumbers()}
      </div>
    </div>
  );
}

export default CharacterList;
