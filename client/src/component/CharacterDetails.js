import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import "../styles/character_details.css"; 
import { Container , Row, Col} from 'reactstrap';

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

    <section  className='details_div'> 
    <Container className='first_div '>
      <Row>
        <Col lg="6" md="6">
          <div className="product__main-img">
              <img src={character.image} alt={character.name} />
          </div>
        </Col>

        <Col lg="6" md="6">
          <div className="single__product-content">
               <h1>{character.name}</h1>
               <p>Species: {character.species}</p>
               <p>Status: {character.status}</p>
               <p>Origin: {character.origin.name}</p>
               <p>Location: {character.location.name}</p>
          </div>
        </Col>

        <Col lg="12">
          <div className="tabs d-flex align-items-center gap-5 py-3">
            <h6
             
            >
              Description heelo
            </h6>
            
            </div>
        
        </Col>
       
      </Row>
    </Container>
  </section>
  );
}

export default CharacterDetails;
