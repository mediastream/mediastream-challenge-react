function Cart(props) {
  const { cart, discountRules, onIncrementDecrementClick } = props;

    /**
   *
   * @param {number} total
   *
   * @return {number}
   */
     const applyDiscount = (total) => {
      const cartIds = new Set(cart.map((cartMovie) => cartMovie.id));
      let totalWithDiscount = total;
  
      discountRules.forEach((rule) => {
        let hasDiscount = true;
        for (const id of rule.moviesIds) {
          if (!cartIds.has(id)) {
            hasDiscount = false;
            break;
          }
        }
        if (hasDiscount) {
          totalWithDiscount -= total * rule.discount;
        }
      });
  
      return totalWithDiscount;
    };
  
    const getTotal = () => {
      if (cart.length === 0) {
        return 0;
      }
  
      const total = cart.reduce((total, movie) => {
        return total + movie.price * movie.quantity;
      }, 0);
  
      return applyDiscount(total);
    };

  return (
    <div className="movies__cart">
      <ul>
        {cart.map((cartMovie) => (
          <li
            key={cartMovie.id}
            className="movies__cart-card"
            data-testid="movies-card"
          >
            <ul>
              <li>ID: {cartMovie.id}</li>
              <li>Name: {cartMovie.name}</li>
              <li>Price: ${cartMovie.price}</li>
            </ul>
            <div className="movies__cart-card-quantity">
              <button onClick={() => onIncrementDecrementClick(-1, cartMovie.id)}>-</button>
              <span>{cartMovie.quantity}</span>
              <button onClick={() => onIncrementDecrementClick(1, cartMovie.id)}>+</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="movies__cart-total">
        <p>Total: ${getTotal()}</p>
      </div>
    </div>
  );
}

export default Cart;
