import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { Container , Row, Col} from 'reactstrap';

import "../styles/character-list.css";

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
  const [productPerPage] = useState(4);
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
        <button onClick={() => handleClick(i)} disabled={currentPage === i} className='pagination_button'>
          {i}
        </button>
      );
    }
    return pageNumber;
  }

  return (
    <section className='characterlist'>
      <Container>
        <Row>
             <h3 className='heading  mt-4'> Welcome to our Application</h3>
              {currentProduct.map((character, index) => 
                  <Col lg='3' md='4' sm='6' xs='12' >
                     <Link to={`/character/${character.id}`} className='text-decoration-none'>
                       <div className='col_div'>
                          <ProductCard items ={character} key = {index}/>
                       </div>
                        
                    </Link>
                  </Col>
                )}
        </Row>
        <Row>
          <div className='pagination_div '>
              {renderPageNumbers()}
          </div>
        </Row>
      </Container>
    </section>
   
  );
}

export default CharacterList;
