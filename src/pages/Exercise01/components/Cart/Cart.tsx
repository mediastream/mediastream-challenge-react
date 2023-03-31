import React from 'react';
import { useCart } from 'pages/Exercise01/context';
import { CartItem } from 'types/Cart';
import '../../assets/styles.css';

const Cart = () => {
  const { cart, getTotal, applyDiscount } = useCart();

  const discounts = applyDiscount();

  return (
    <section className="movies__cart">
      <ul>
        {cart.map((item: CartItem) => (
          <Item data={item} key={item.id} />
        ))}
        {cart.length === 0 && <EmptyCart />}
      </ul>
      <div className="movies__cart-total">
        <ul>
          {discounts.length > 0 &&
            discounts.map((item: number, index: number) => (
              <li key={index}>
                Discount {index + 1}: {item * 100}%
              </li>
            ))}

          <li></li>
          <li>Total: ${getTotal()}</li>
        </ul>
      </div>
    </section>
  );
};

export default Cart;

const Item = ({ data }: { data: CartItem }) => {
  const { increaseQuantity } = useCart();

  const handleClickIncrement = () => {
    increaseQuantity(data.id);
  };

  const { decreaseQuantity } = useCart();

  const handleClickDecrement = () => {
    decreaseQuantity(data.id);
  };

  return (
    <div className="movies__cart">
      <li className="movies__cart-card">
        <ul>
          <li>ID: {data.id}</li>
          <li>Name: {data.name}</li>
          <li>Price: ${data.price}</li>
        </ul>
        <div className="movies__cart-card-quantity">
          <button onClick={handleClickDecrement} type="button">
            -
          </button>
          <span>{data.quantity}</span>
          <button onClick={handleClickIncrement} type="button">
            +
          </button>
        </div>
      </li>
    </div>
  );
};

const EmptyCart = () => {
  return (
    <li className="movies__cart-card">
      <h2>Empty list</h2>
    </li>
  );
};
