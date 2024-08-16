import axios from 'axios';
import { getUserSession } from './authenticate';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

export interface Product {
  id: number;
  externalId: string;
  name: string;
  variants: number;
  synced: number;
  thumbnailUrl: string;
  isIgnored: boolean;
  price: number;
  description: string;
}

// Get all products
export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get(`${API_BASE_URL}/products`);
  return response.data;
};

// Get a product by ID
export const getProductById = async (id: string): Promise<Product> => {
  const response = await axios.get(`${API_BASE_URL}/products/${id}`);
  return response.data;
};

// Update a product
export const updateProduct = async (id: string, productData: Product): Promise<Product> => {
  const response = await axios.put(`${API_BASE_URL}/products/${id}`, productData);
  return response.data;
};

// Import products from Printful
export const importProducts = async (): Promise<void> => {
  const session = await getUserSession();
  if (!session) {
    throw new Error('No session found');
  }

  const token = session.getIdToken().getJwtToken();
  await axios.get(`${API_BASE_URL}/products/import`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
