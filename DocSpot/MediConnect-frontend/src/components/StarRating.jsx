const StarRating = ({ rating = 0 }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center space-x-1 text-yellow-500">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return <span key={i}>★</span>;
        }
        if (i === fullStars && halfStar) {
          return <span key={i}>☆</span>;
        }
        return (
          <span key={i} className="text-gray-300">
            ★
          </span>
        );
      })}
      <span className="text-sm text-gray-600 ml-2">{rating.toFixed(1)}</span>
    </div>
  );
};

export default StarRating;
