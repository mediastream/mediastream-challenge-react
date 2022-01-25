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

import './assets/styles.css'
import { useState } from 'react'

export default function Exercise01 () {
  const movies = [
    {
      id: 1,
      name: 'Star Wars',
      price: 20
    },
    {
      id: 2,
      name: 'Minions',
      price: 25
    },
    {
      id: 3,
      name: 'Fast and Furious',
      price: 10
    },
    {
      id: 4,
      name: 'The Lord of the Rings',
      price: 5
    }
  ]

  const discountRules = [
    {
      m: [3, 2],
      discount: 0.25
    },
    {
      m: [2, 4, 1],
      discount: 0.5
    },
    {
      m: [4, 2],
      discount: 0.1
    } 
  ]

  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Star Wars',
      price: 20,
      quantity: 1
    }
  ])

  const addToCart = (o) => {

    if(cart.findIndex( item => item.id === o.id) >= 0) {
      IncrementDecrementQuantity(o,true);
    } else {
      setCart([...cart, {
        id: o.id,
        name: o.name,
        price: o.price,
        quantity: 1
      }]);
    }
  }

  const IncrementDecrementQuantity = (o,isIncrement) => {

    const quantityModifyedInArry = cart.map(item => {
      if(item.id !== o.id) return item;
      return  {...item, quantity: isIncrement ? item.quantity + 1  : item.quantity -1}

    }).filter(item => item.quantity > 0 );

    setCart(quantityModifyedInArry);
  }

  const getTotal = () => cart.reduce((acum, current) => (parseInt(acum) + (parseInt(current.price) * parseInt(current.quantity)))  ,0);

  const checkArryEqual = (cartIds, discountArray) => {
    const sortedCartIds = cartIds.slice().sort();
    const sortedDiscountArray = discountArray.slice().sort();
    return (JSON.stringify(sortedCartIds) === JSON.stringify(sortedDiscountArray));
  }
  
    const searchDiscount = (cartIds, discountArray) => {
      let returnDiscount =0;
      for (let i = 0; i < cartIds.length; i++) {
        for (let j = 0; j < discountArray.length; j++) {
          if (checkArryEqual(cartIds, discountArray[j].m)) {
            returnDiscount = discountArray[j].discount;
            break;
          }
        }
      }
      return returnDiscount;
    };

    const getDiscount = () => {
      const cartIds = cart.map((item) => item.id);
      const discount = searchDiscount(cartIds, discountRules);
      const formatedDiscount = parseFloat(Math.round(discount * 100) / 100).toFixed(2);
      return formatedDiscount;
    }
   
    const getGranTotal = () => {
      const discount = ((getDiscount() * getTotal())/100);
      const granTotal =  getTotal() - discount;
      const formatedGranTotal = parseFloat(Math.round(granTotal * 100) / 100).toFixed(2);
      return formatedGranTotal;
    }

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map(o => (
            <li className="movies__list-card">
              <ul>
                <li>
                  ID: {o.id}
                </li>
                <li>
                  Name: {o.name}
                </li>
                <li>
                  Price: ${o.price}
                </li>
              </ul>
              <button onClick={() => addToCart( o)}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map(x => (
            <li className="movies__cart-card">
              <ul>
                <li>
                  ID: {x.id}
                </li>
                <li>
                  Name: {x.name}
                </li>
                <li>
                  Price: ${x.price}
                </li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button onClick={() => IncrementDecrementQuantity(x, false)}>
                  -
                </button>
                <span>
                  {x.quantity}
                </span>
                <button onClick={() => IncrementDecrementQuantity(x, true)}>
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="movies__cart-total">
          <p>Total: ${getTotal()}</p>
        </div>
        <div className="movies__cart-total">
          <p>Discount: ${getDiscount()}</p>
        </div>
        <div className="movies__cart-total">
          <p>Gran Total: ${getGranTotal()}</p>
        </div>
      </div>
    </section>
  )
} 