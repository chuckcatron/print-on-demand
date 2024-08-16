import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as api from '../services/api';

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

const ProductEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      if (!id) return;
      const response = await api.getProductById(id);
      setProduct(response);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (!id) return;
      if (product) {
        await api.updateProduct(product);
        navigate('/admin/products');
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => (prevProduct ? { ...prevProduct, [name]: value } : null));
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className='container'>
      <h2 className='my-4'>Edit Product</h2>
      <form>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input type='text' className='form-control' id='name' name='name' value={product.name} onChange={handleChange} />
        </div>

        <div className='mb-3'>
          <label htmlFor='description' className='form-label'>
            Description
          </label>
          <input type='text' className='form-control' id='description' name='description' value={product.description} onChange={handleChange} />
        </div>

        <div className='mb-3'>
          <label htmlFor='price' className='form-label'>
            Price
          </label>
          <input type='number' className='form-control' id='price' name='price' value={product.price} onChange={handleChange} />
        </div>

        <button type='button' className='btn btn-primary' onClick={handleSave}>
          Save
        </button>
        <button type='button' className='btn btn-secondary' onClick={() => navigate('/admin/products')}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ProductEdit;
