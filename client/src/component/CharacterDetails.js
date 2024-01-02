import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import "../styles/character_details.css"; 
import { Container , Row, Col} from 'reactstrap';
import { Link } from 'react-router-dom';

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
    <Container >
      <Row>
        <div className='all_character'>
           <Link to={`/`} className='text-decoration-none'>
              <h5  className='all_character_heading '>All character</h5>
           </Link>
        </div>
      </Row>
      <Row className='first_div '>
        <Col lg="6" md="6">
          <div className="product__main-img">
              <img src={character.image} alt={character.name} className='product__img' />
          </div>
        </Col>

        <Col lg="6" md="6">
          <div className="single__product-content">
               <h1 className='second_heading mb-4'>{character.name}</h1>
               <span className='first_para'>Species: and Status: </span>
               <p className='second_para mt-0'>{character.species} and {character.status}</p>
               <span className='third_para'>First Seen in </span>
               <p className='fourth_para_para'>{character.origin.name}</p>
               <span className='fifth_para'>Last known Location</span>
               <p className='sixth_para'>{character.location.name}</p>
          </div>
        </Col>

        {/* <Col lg="12">
          <div className="tabs d-flex align-items-center gap-5 py-3">
            <h6
             
            >
              Description heelo
            </h6>
            
            </div>
        
        </Col> */}
       
      </Row>
    </Container>
  </section>
  );
}

export default CharacterDetails;
