import React from "react";
import { useEffect, useState } from "react";

function AdminPage(props) {
  const initialProduct = {
    id: 1,
    name: "",
    price: "",
    publisher: "",
    category: "",
    description: "",
    image: "",
  };

  const [products, setProducts] = useState(props.products);
  const [currentProduct, setCurrentProduct] = useState(initialProduct);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setProducts(props.products);
  }, [props.products]);

  useEffect(() => {
    props.callback(products);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const handleAddProduct = () => {
    setProducts([...products, { ...currentProduct, id: Date.now() }]);
    setCurrentProduct(initialProduct);
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setIsEditing(true);
  };

  const handleUpdateProduct = () => {
    setProducts(
      products.map((p) => (p.id === currentProduct.id ? currentProduct : p))
    );
    setCurrentProduct(initialProduct);
    setIsEditing(false);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="crud">
      <a href="/" className="to-home">
        <span>
          <i className="fa-solid fa-arrow-left"></i> Regresar
        </span>
      </a>

      <h1>Product CRUD</h1>
      <div className="crud-actions">
        <form className="add-product">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={currentProduct.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Price:
            <input
              type="text"
              name="price"
              value={currentProduct.price}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Publisher:
            <input
              type="text"
              name="publisher"
              value={currentProduct.publisher}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              name="category"
              value={currentProduct.category}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={currentProduct.description}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Image URL:
            <input
              type="text"
              name="imageUrl"
              value={currentProduct.image}
              onChange={handleInputChange}
            />
          </label>
          <div className="action-button">
            {isEditing ? (
              <button type="button" onClick={handleUpdateProduct}>
                Update Product
              </button>
            ) : (
              <button type="button" onClick={handleAddProduct}>
                Add Product
              </button>
            )}
          </div>
        </form>
        <table className="products-table" border="true">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Publisher</th>
              <th>Category</th>
              <th>Description</th>
              <th>Image URL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="products-table-row">
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.publisher}</td>
                <td>{product.category}</td>
                <td>{product.description}</td>
                <td>{product.image}</td>
                <td className="buttons">
                  <button
                    type="button"
                    onClick={() => handleEditProduct(product)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPage;
