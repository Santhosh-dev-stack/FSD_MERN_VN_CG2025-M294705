import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminProducts, deleteProduct } from '../../features/admin/adminSlice';
import { Link } from 'react-router-dom';

const AdminProducts = () => {
  const dispatch = useDispatch();
  const { products, loading, error, page, pages } = useSelector((state) => state.admin);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchAdminProducts(currentPage));
  }, [dispatch, currentPage]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Products</h2>
        <Link to="/admin/products/create" className="bg-red-500 text-white px-4 py-2 rounded">
          + Add Product
        </Link>
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && products.length === 0 && <p className="text-gray-500">No products found.</p>}

      {!loading && products.length > 0 && (
        <>
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Stock</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="text-center">
                  <td className="p-2 border">
                    <img src={p.image} alt={p.name} className="h-12 mx-auto object-cover" />
                  </td>
                  <td className="p-2 border">{p.name}</td>
                  <td className="p-2 border">₹{p.price}</td>
                  <td className="p-2 border">{p.stock}</td>
                  <td className="p-2 border space-x-2">
                    <Link to={`/admin/products/${p._id}/edit`} className="text-blue-600">
                      Edit
                    </Link>
                    <button onClick={() => dispatch(deleteProduct(p._id))} className="text-red-500">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINATION */}
          {pages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>

              {[...Array(pages).keys()].map((x) => (
                <button
                  key={x}
                  onClick={() => setCurrentPage(x + 1)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === x + 1 ? 'bg-red-500 text-white' : ''
                  }`}
                >
                  {x + 1}
                </button>
              ))}

              <button
                disabled={currentPage === pages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminProducts;
