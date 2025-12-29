import { useState } from 'react';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';

const ProductFilter = ({ onFilter }) => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    onFilter({ keyword, category });
  };

  const resetHandler = () => {
    setKeyword('');
    setCategory('');
    onFilter({ keyword: '', category: '' });
  };

  return (
    <form
      onSubmit={submitHandler}
      className="bg-white shadow rounded-lg p-4 mb-6 flex flex-col lg:flex-row gap-4 items-center"
    >
      {/* SEARCH INPUT */}
      <div className="flex items-center border rounded w-full px-3">
        <FiSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search products..."
          className="w-full py-2 outline-none"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      {/* CATEGORY FILTER */}
      <div className="flex items-center border rounded w-full lg:w-60 px-3">
        <FiFilter className="text-gray-400 mr-2" />
        <select
          className="w-full py-2 outline-none bg-transparent"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Books">Books</option>
          <option value="Home">Home</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-3 w-full lg:w-auto">
        <button
          type="submit"
          className="flex items-center gap-1 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          <FiSearch />
          Apply
        </button>

        <button
          type="button"
          onClick={resetHandler}
          className="flex items-center gap-1 border px-5 py-2 rounded hover:bg-gray-100"
        >
          <FiX />
          Reset
        </button>
      </div>
    </form>
  );
};

export default ProductFilter;
