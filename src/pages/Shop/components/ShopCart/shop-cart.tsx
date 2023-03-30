import styles from './shop-cart.module.scss';
import { memo, useEffect, useState } from 'react';
import { DISCOUNT_RULES } from 'constants/config';
import { useCart } from 'pages/Shop/context';
import type { CartItem } from 'types/shop';

const ShopCart = () => {
  const { cart } = useCart();

  return (
    <section className={styles.container}>
      <ul>
        {cart.map((item) => (
          <Item data={item} />
        ))}
        {cart.length === 0 && <Empty />}
      </ul>
      {cart.length > 0 && <Total data={cart} />}
    </section>
  );
};

export default ShopCart;

const Item = memo(({ data }: { data: CartItem }) => {
  return (
    <li className={styles.item}>
      <ul>
        <li>ID: {data.id}</li>
        <li>Name: {data.name}</li>
        <li>Price: ${data.price}</li>
      </ul>
      <div>
        <DecreaseButton id={data.id} />
        <span>{data.quantity}</span>
        <IncreaseButton id={data.id} />
      </div>
    </li>
  );
});

const Empty = () => {
  return (
    <li className={styles.empty}>
      <h2>Your Cart is Empty</h2>
      <p>Try adding some products...</p>
    </li>
  );
};

const IncreaseButton = ({ id }: { id: number }) => {
  const { increaseQuantity } = useCart();

  const handleClick = () => {
    increaseQuantity(id);
  };

  return (
    <button className={styles.button} onClick={handleClick} type="button">
      +
    </button>
  );
};

const DecreaseButton = ({ id }: { id: number }) => {
  const { decreaseQuantity } = useCart();

  const handleClick = () => {
    decreaseQuantity(id);
  };

  return (
    <button className={styles.button} onClick={handleClick} type="button">
      -
    </button>
  );
};

const Total = ({ data }: { data: CartItem[] }) => {
  const [discount, setDiscount] = useState(0);
  const [subtotal, setSubtotal] = useState(data.reduce((prev, cur) => cur.price * cur.quantity + prev, 0));

  useEffect(() => {
    getSubtotal(data);
    getDiscount(data);
  }, [data]);

  const getDiscount = (cart: CartItem[]) => {
    let discount = 0;
    DISCOUNT_RULES.forEach((rule) => {
      if (rule.m.every((id) => cart.some((el) => el.id === id))) {
        discount += rule.discount;
      }
    });
    setDiscount(discount);
  };

  const getSubtotal = (cart: CartItem[]) => {
    setSubtotal(cart.reduce((prev, cur) => cur.price * cur.quantity + prev, 0));
  };

  const getTotal = () => {
    if (discount === 0) return subtotal;
    const amount = subtotal * discount;
    return subtotal - amount;
  };

  return (
    <div className={styles.total}>
      <ul>
        {discount > 0 && (
          <>
            <li>Subtotal: ${subtotal}</li>
            <li>Discount: {discount}</li>
          </>
        )}
        <li>Total: ${getTotal()}</li>
      </ul>
    </div>
  );
};
