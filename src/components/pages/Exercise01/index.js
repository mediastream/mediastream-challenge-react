/**
 * Exercise 01: The Retro Movie Store
 * Implement a shopping cart with the next features for the Movie Store that is selling retro dvds:
 * 1. Add a movie to the cart
 * 2. Increment or decrement the quantity of movie copies. If quantity is equal to 0, the movie must be removed from the cart
 * 3. Calculate and show the total cost of your cart. Ex: Total: $150
 * 4. Apply discount rules. You have an array of offers with discounts depending of the combination of movie you have in your cart.
 * You have to apply all discounts in the rules array (discountRules).
 * Ex: If m: [1, 2, 3], it means the discount will be applied to the total when the cart has all that products in only.
 *
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import './assets/styles.css';
import { useState } from 'react';
import { movies, discountRules } from '../../../utils/list';

export default function Exercise01() {
  const [cart, setCart] = useState([]);

  const addCart = (item) => {
    if (!cart.length) {
      setCart((i) => [...i, { ...item, quantity: 1 }]);
    } else {
      const findItem = cart.some((i) => i.id === item.id);
      if (findItem) {
        incrementItem(item);
      } else {
        setCart((i) => [...i, { ...item, quantity: 1 }]);
      }
    }
  };

  const incrementItem = (item) => {
    const list = cart.map((i) => {
      if (i.id === item.id) {
        return { ...i, quantity: i.quantity + 1 };
      } else {
        return i;
      }
    });
    setCart(list);
  };

  const decrementItem = (item) => {
    if (item.quantity < 2) {
      const filterList = cart.filter((i) => i.id !== item.id);
      setCart(filterList);
    } else {
      const list = cart.map((i) => {
        if (i.id === item.id) {
          return { ...i, quantity: i.quantity - 1 };
        } else {
          return i;
        }
      });
      setCart(list);
    }
  };

  const getTotal = () =>
    cart.reduce(
      (total, item) => total + Math.round(item.price * item.quantity),
      0
    );

  const discount = () => {
    let discount = 0;

    const idCar = cart.map((i) => i.id);

    const rule01 = discountRules[0].m;
    const rule02 = discountRules[1].m;
    const rule03 = discountRules[2].m;

    let resultRule01 =
      idCar.length === rule01.length &&
      idCar.every(function (element) {
        return rule01.includes(element);
      });

    let resultRule02 =
      idCar.length === rule02.length &&
      idCar.every(function (element) {
        return rule02.includes(element);
      });

    let resultRule03 =
      idCar.length === rule03.length &&
      idCar.every(function (element) {
        return rule03.includes(element);
      });

    if (resultRule01) {
      discount = discountRules[0].discount;
    } else if (resultRule02) {
      discount = discountRules[1].discount;
    } else if (resultRule03) {
      discount = discountRules[2].discount;
    }

    return discount;
  };

  return (
    <section className='exercise01'>
      <div className='movies__list'>
        <ul>
          {movies.map((o) => (
            <li className='movies__list-card'>
              <ul>
                <li>ID: {o.id}</li>
                <li>Name: {o.name}</li>
                <li>Price: ${o.price}</li>
              </ul>
              <button onClick={() => addCart(o)}>Add to cart</button>
            </li>
          ))}
        </ul>
      </div>
      <div className='movies__cart'>
        <ul>
          {cart.map((x) => (
            <li className='movies__cart-card'>
              <ul>
                <li>ID: {x.id}</li>
                <li>Name: {x.name}</li>
                <li>Price: ${x.price}</li>
              </ul>
              <div className='movies__cart-card-quantity'>
                <button onClick={() => decrementItem(x)}>-</button>
                <span>{x.quantity}</span>
                <button onClick={() => incrementItem(x)}>+</button>
              </div>
            </li>
          ))}
        </ul>
        {cart.length > 0 && (
          <div className='movies__cart-total'>
            <p>Descuento: ${getTotal() * discount()}</p>
          </div>
        )}
        <div className='movies__cart-total'>
          <p>Total: ${getTotal() - getTotal() * discount()}</p>
        </div>
      </div>
    </section>
  );
}
