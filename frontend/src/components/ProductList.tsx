import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { importProducts } from '../services/api';

interface Product {
  id: number;
  name: string;
  externalId: string;
  variants: number;
  synced: number;
  thumbnailUrl: string;
  isIgnored: boolean;
  price: number;
  description: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleImport = async () => {
    try {
      await importProducts();
      fetchProducts(); // Refresh the product list after import
    } catch (error) {
      console.error('Error importing products:', error);
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/admin/products/${id}/edit`);
  };

  return (
    <div className='container'>
      <h2 className='my-4'>Products</h2>
      <button className='btn btn-primary mb-3' onClick={handleImport}>
        Import Products from Printful
      </button>
      <div className='row'>
        {products.map((product) => (
          <div key={product.id} className='col-md-4'>
            <div className='card mb-4 shadow-sm'>
              <img src={product.thumbnailUrl} alt={product.name} className='card-img-top' style={{ height: '200px', objectFit: 'cover' }} />
              <div className='card-body'>
                <h5 className='card-title'>{product.name}</h5>
                <p className='card-text'>Price: ${product.price}</p>
                <button className='btn btn-primary' onClick={() => handleEdit(product.id)}>
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
