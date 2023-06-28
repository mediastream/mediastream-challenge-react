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

import "./assets/styles.css";
import { useState } from "react";

export default function Exercise01() {
  const movies = [
    {
      id: 1,
      name: "Star Wars",
      price: 20,
    },
    {
      id: 2,
      name: "Minions",
      price: 25,
    },
    {
      id: 3,
      name: "Fast and Furious",
      price: 10,
    },
    {
      id: 4,
      name: "The Lord of the Rings",
      price: 5,
    },
  ];

  const discountRules = [
    {
      m: [3, 2],
      discount: 0.25,
    },
    {
      m: [2, 4, 1],
      discount: 0.5,
    },
    {
      m: [4, 2],
      discount: 0.1,
    },
  ];

  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0);

  function getTotal() {
    const cartClone = [...cart];
    var totalprice = 0;
    cartClone.forEach((item) => {
      let itemprice = item.price * item.quantity;
      totalprice += itemprice;
    });
    //setPrice(totalprice);
    return totalprice;
  }

  function discountPrice() {
    var cartClone = [...cart];
    var discountRulesClone = [...discountRules];
    var sorted = [];
    var cartIds = [];
    var totalprice = getTotal();
    var discount = 1;
    var discountprice = totalprice * discount;
    const comparator = (a, b) => {
      if (JSON.stringify(a) === JSON.stringify(b)) {
        console.log('discount found');
        sorted.map((item) => {
          discount = item.discount;
          discountprice = totalprice * discount;
          return totalprice - discountprice;
        });
      } else {
        console.log('no discount found');
      }
    };
    cartClone.forEach((item) => {
      cartIds.push(item.id);
    });
    discountRulesClone.map((disc) => {
      var srt = disc.m.sort();
      sorted = [{m: srt, discount:disc.discount}]
      comparator(cartIds.sort(), srt);
    });
    return totalprice - discountprice == 0 ? totalprice : totalprice - discountprice;
  }

  function handleAddToCart(pos) {
    var cartClone = [...cart];
    var findmovie = movies.find((id) => id.id === pos);

    if (cartClone.find((id) => id.id === pos)) {
      var idmovie = cartClone.find((id) => id.id === pos);
      var index = cartClone.indexOf(idmovie);
      var quantity = cartClone[index].quantity;
      cartClone[index] = finalmovie = {
        id: findmovie.id,
        name: findmovie.name,
        price: findmovie.price,
        quantity: (quantity += 1),
      };
      setCart(cartClone);
    } else {
      var finalmovie = {
        id: findmovie.id,
        name: findmovie.name,
        price: findmovie.price,
        quantity: 1,
      };
      cartClone.push(finalmovie);
      setCart(cartClone);
      getTotal();
    }
  }

  function handleRemove(pos) {
    var cartClone = [...cart];
    var findmovie = movies.find((id) => id.id === pos);
    var idmovie = cartClone.find((id) => id.id === pos);
    var index = cartClone.indexOf(idmovie);
    var quantity = cartClone[index].quantity;
    var newquantity = (quantity -= 1);
    if (newquantity <= 0) {
      cartClone.splice(index, 1);
      setCart(cartClone);
    }
    var finalmovie = {
      id: findmovie.id,
      name: findmovie.name,
      price: findmovie.price,
      quantity: newquantity,
    };

    if (cartClone.find((id) => id.id === pos)) {
      cartClone[index] = finalmovie = {
        id: findmovie.id,
        name: findmovie.name,
        price: findmovie.price,
        quantity: newquantity,
      };
      setCart(cartClone);
      getTotal();
    }
  }
  function handleAdd(pos) {
    var cartClone = [...cart];
    var findmovie = movies.find((id) => id.id === pos);
    var idmovie = cartClone.find((id) => id.id === pos);
    var index = cartClone.indexOf(idmovie);
    var quantity = cartClone[index].quantity;
    var newquantity = (quantity += 1);
    var finalmovie = {
      id: findmovie.id,
      name: findmovie.name,
      price: findmovie.price,
      quantity: newquantity,
    };

    if (cartClone.find((id) => id.id === pos)) {
      cartClone[index] = finalmovie = {
        id: findmovie.id,
        name: findmovie.name,
        price: findmovie.price,
        quantity: newquantity,
      };
      setCart(cartClone);
      getTotal();
    }
  }

  function movieCard (){
    return <ul>
    {movies.map((o) => (
      <li className="movies__list-card">
        <ul>
          <li>{o.name}</li>
          <li>${o.price}</li>
        </ul>
        <button
          onClick={() => {
            handleAddToCart(o.id);
          }}
        >
          Add to cart
        </button>
      </li>
    ))}
  </ul>
  }

  function cartCard(){
    return <ul>
    {cart &&
      cart.map((x) => (
        <li className="movies__cart-card">
          <ul>
            <li>{x.name}</li>
            <li>${x.price}</li>
          </ul>
          <div className="movies__cart-card-quantity">
            <button onClick={() => handleRemove(x.id)}>-</button>
            <span>{x.quantity}</span>
            <button onClick={() => handleAdd(x.id)}>+</button>
          </div>
        </li>
      ))}
  </ul>
  }

  //console.log("cart", cart);

  return (
    <section className="exercise01">
      <div className="movies__list">
        {movieCard()}
      </div>
      <div className="movies__cart">
        {cartCard()}
        <div className="movies__cart-subtotal">
          {getTotal() == discountPrice() ? <><div>Subtotal</div> <div>{getTotal()}</div></> : <><div>Subtotal</div> <div>{getTotal()}</div></>}
        </div>
        <div className="movies__cart-totalDiscount">
          <div>Total</div>
          <div>{discountPrice()}</div>
        </div>
      </div>
    </section>
  );
}
