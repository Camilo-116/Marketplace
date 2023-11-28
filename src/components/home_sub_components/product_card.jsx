import React from "react";

function ProductCard(props) {
  return (
    <div className="product-card" key={props.index}>
      <div className="p-image">
        <img src={props.product.image} alt={props.product.name} />
      </div>
      <div className="info-padding">
        <div className="info">
          <div className="p-name">{props.product.name}</div>
          <div className="p-description">{props.product.description}</div>
          <div className="row">
            <div className="p-category">{props.product.category}</div>
            <div className="p-price">{props.product.price}</div>
          </div>
        </div>
        <hr />
        <div className="product-pub">
          <div className="pub-info">
            <div className="p-pub-avatar">
              <img src="./avatar.jpg" alt="User avatar" />
            </div>
            <div className="p-publisher">{props.product.publisher}</div>
          </div>
          <div className="rating">
            {[...Array(5)].map((star, index) => {
              return (
                <label key={index}>
                  <i className="fa-solid fa-star"></i>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
