import React from 'react'

import "../styles/product-card.css";

const ProductCard = (props) => {
  
  const {id, name , image, species} = props.items;

  return (
    <div className="product__item mt-5">
        <div className="product__img pb-4">
           <img src={image} alt="should_be_image" className='product_image'/>
        </div>
        <div className="product__content pb-4">
            <h5> {name} </h5>
            <p>{species}</p>
            <p>"Know More"</p>
        </div>
    </div>

  )
}

export default ProductCard;