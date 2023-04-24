import '../assets/card.css';

const Card = ({ item }) => {
  return (
    <div className='card-item fade-in'>
      <div className='card-item-content'>
        <img
          className='card-item-wallpaper'
          src={item.posterUrl}
          alt={item.title}
        />
        <div className='card-item-title'>
          <p>{item.title}</p>
          <span>
            <p>{item.genres.join(', ')}</p>
            <p>{item.year}</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
