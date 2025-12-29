import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const AdminCreateProduct = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    description: '',
  });

  const [image, setImage] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.keys(form).forEach((key) => data.append(key, form[key]));
      data.append('image', image);

      await api.post('/products', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      navigate('/admin/products');
    } catch (error) {
      alert(error.response?.data?.message || 'Product creation failed');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create Product</h2>

      <form onSubmit={submitHandler} className="space-y-4">
        <input
          placeholder="Name"
          required
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          required
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          placeholder="Category"
          required
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Stock"
          required
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
        />
        <textarea
          placeholder="Description"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="file"
          accept="image/*"
          required
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button className="bg-red-500 text-white px-4 py-2 rounded">Create</button>
      </form>
    </div>
  );
};

export default AdminCreateProduct;


/*

{
  "name": "Wireless Bluetooth Headphones",
  "description": "Premium over-ear wireless headphones with noise cancellation and 30-hour battery life.",
  "price": 4999,
  "category": "Electronics",
  "stock": 25
}

 */