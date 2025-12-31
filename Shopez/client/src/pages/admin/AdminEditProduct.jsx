import { useEffect, useState } from 'react';
import api from '../../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({});
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await api.get(`/products/${id}`);
      setForm(data);
    };
    fetchProduct();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    if (image) data.append('image', image);

    await api.put(`/products/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    navigate('/admin/products');
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

      <form onSubmit={submitHandler} className="space-y-4">
        <input
          value={form.name || ''}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="number"
          value={form.price || ''}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          value={form.category || ''}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <input
          type="number"
          value={form.stock || ''}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
        />
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
};

export default AdminEditProduct;
