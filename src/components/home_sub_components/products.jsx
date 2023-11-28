import React from "react";
import ProductCard from "./product_card";

function Products(props) {
  return (
    <>
      <div className="products">
        {props.products.map((product, index) => (
          <ProductCard
            product={product}
            key={index}
          />
        ))}
      </div>
    </>
  );
}

export default Products;
