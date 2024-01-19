// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import ProductCard from './ProductCard';
// import { Container , Row, Col} from 'reactstrap';

// import "../styles/character-list.css";

// const CharacterList = () => {
//   const [characters, setCharacters] = useState([]);

//   useEffect(() => {
//     const fetchCharacters = async () => {
//       const response = await axios.get('https://ricky-and-morty-backend.onrender.com/characters');
//       setCharacters(response.data);
//     };

//     fetchCharacters();
//   }, []);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [productPerPage] = useState(4);
//   const [numberOfButton] = useState(4);

//   const indexOfLastProduct = currentPage * productPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productPerPage;
//   const currentProduct = characters.slice(indexOfFirstProduct, indexOfLastProduct);
//   const totalPages = Math.ceil(characters.length / productPerPage);

//   const handleClick = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   function renderPageNumbers() {
//     const pageNumber = [];

//     let startIndex = Math.max(1, currentPage - 1);
//     let endIndex = Math.min(startIndex + numberOfButton - 1, totalPages);

//     if (startIndex + numberOfButton - 1 >= totalPages) {
//       startIndex = totalPages - numberOfButton + 1;
//     }

//     for (let i = startIndex; i <= endIndex; i++) {
//       pageNumber.push(
//         <button onClick={() => handleClick(i)} disabled={currentPage === i} className='pagination_button'>
//           {i}
//         </button>
//       );
//     }
//     return pageNumber;
//   }

//   return (
//     <section className='characterlist'>
//       <Container>
//         <Row>
//              <h3 className='heading  mt-4'> Welcome to our Application</h3>
//               {currentProduct.map((character, index) => 
//                   <Col lg='3' md='4' sm='6' xs='12' >
//                      <Link to={`/character/${character.id}`} className='text-decoration-none'>
//                        <div className='col_div'>
//                           <ProductCard items ={character} key = {index}/>
//                        </div>
                        
//                     </Link>
//                   </Col>
//                 )}
//         </Row>
//         <Row>
//           <div className='pagination_div '>
//               {renderPageNumbers()}
//           </div>
//         </Row>
//       </Container>
//     </section>
   
//   );
// }

// export default CharacterList;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import "../styles/character-list.css";

const CharacterList = () => {
    const [characters, setCharacters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit] = useState(7);

    useEffect(() => {
        getPaginatedCharacters();
    }, [currentPage]);

    const getPaginatedCharacters = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/characters?page=${currentPage}&limit=${limit}`);
            setCharacters(response.data.characters);
            setTotalPages(response.data.totalPages);

            console.log(response.data.characters);
        } catch (error) {
            console.error('Error fetching characters:', error);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <section className='characterlist'>
            <Container>
                <Row>
                    <h3 className='heading mt-4'> Welcome to our Application</h3>
                    {characters?.map((character, index) => (
                        <Col lg='3' md='4' sm='6' xs='12' key={index}>
                            <Link to={`/character/${character.id}`} className='text-decoration-none'>
                                <div className='col_div'>
                                    <ProductCard items={character} />
                                </div>
                            </Link>
                        </Col>
                    ))}
                </Row>
                <Row>
                    <div className='pagination_div'>
                        <button onClick={handlePrevPage} disabled={currentPage === 1}>
                            Previous
                        </button>
                        {[...Array(totalPages).keys()].map((pageNumber) => (
                            <button
                                key={pageNumber + 1}
                                onClick={() => setCurrentPage(pageNumber + 1)}
                                disabled={currentPage === pageNumber + 1}
                            >
                                {pageNumber + 1}
                            </button>
                        ))}
                        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                            Next
                        </button>
                    </div>
                </Row>
            </Container>
        </section>
    );
};

export default CharacterList;
