// ProductList.js
import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    id: 0,
    name: '',
    price: 0,
    color: '',
    type: '',
    image: '',
  });
  const [editedProduct, setEditedProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const addNewProduct = async () => {
    try {
      const response = await fetch('http://localhost:3001/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        setProducts([...products, newProduct]);
        setNewProduct({
          id: 0,
          name: '',
          price: 0,
          color: '',
          type: '',
          image: '',
        });
      } else {
        console.error('Failed to add product:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3001/products/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts(products.filter((product) => product.id !== productId));
      } else {
        console.error('Failed to delete product:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const editProduct = async () => {
    if (editedProduct) {
      try {
        const response = await fetch(`http://localhost:3001/products/${editedProduct.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedProduct),
        });

        if (response.ok) {
          setProducts(products.map((product) => (product.id === editedProduct.id ? editedProduct : product)));
          setEditedProduct(null);
        } else {
          console.error('Failed to edit product:', response.statusText);
        }
      } catch (error) {
        console.error('Error editing product:', error);
      }
    }
  };

  return (
    <div>
      {/* Form for adding new product */}
      <form>
  <label>
    Name:
    <input
      type="text"
      value={newProduct.name}
      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
    />
  </label>
  <label>
    Price:
    <input
      type="number"
      value={newProduct.price}
      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
    />
  </label>
  <label>
    Color:
    <input
      type="text"
      value={newProduct.color}
      onChange={(e) => setNewProduct({ ...newProduct, color: e.target.value })}
    />
  </label>
  <label>
    Type:
    <input
      type="text"
      value={newProduct.type}
      onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}
    />
  </label>
  <label>
    Image URL:
    <input
      type="text"
      value={newProduct.image}
      onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
    />
  </label>
  <button type="button" onClick={addNewProduct}>
    Add Product
  </button>
</form>


      {/* Display of  list of products */}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <img src={process.env.PUBLIC_URL + product.image} alt={product.name} />
            {product.name} - {product.price}
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
            <button onClick={() => setEditedProduct(product)}>Edit</button>
          </li>
        ))}
      </ul>

      {/* Form for editing product */}
      {editedProduct && (
        <form>
          <label>
            Name:
            <input
              type="text"
              value={editedProduct.name}
              onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              value={editedProduct.price}
              onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
            />
          </label>
          
          <button type="button" onClick={editProduct}>
            Save Edit
          </button>
        </form>
      )}
    </div>
  );
};

export default ProductList;