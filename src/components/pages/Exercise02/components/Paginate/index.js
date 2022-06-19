
const MOVIES_BY_PAGE = 50;

function Paginate(props) {
  const { total, page, onPageChange } = props;

  const pages = Array.from(new Array(Math.ceil(total / MOVIES_BY_PAGE)));
  const currentPage = page - 1;
  return (
    <ul className="movie-library__paginate">
      {pages.map((_, index) => (
        <li
          key={index}
          className={`movie-library__page ${
            index === currentPage ? 'movie-library__page--active' : ''
          }`}
          onClick={() => onPageChange(index + 1)}
          data-testid="paginate-page"
        >
          {index + 1}
        </li>
      ))}
    </ul>
  );
}

export default Paginate;
