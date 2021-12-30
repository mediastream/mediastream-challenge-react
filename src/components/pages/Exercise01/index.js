/**
 * Exercise 01: The Retro Movie Store
 * Implement a shopping cart with the next features for the Movie Store that is selling retro dvds:
 * 1. Add a movie to the cart
 * 2. Increment or decrement the quantity of movie copies. If quantity is equal to 0, the movie must be removed from the cart
 * 3. Calculate and show the total cost of your cart. Ex: Total: $150
 * 4. Apply discount rules. You have an array of offers with discounts depending of the combination of movie you have in your cart.
 * You have to apply all discounts in the rules array (discountRules).
 * Ex: If m: [1, 2, 3], it means the discount will be applied to the total when the cart has all that products in only.
 * 
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

 import './assets/styles.css'
 import { useState } from 'react'
 
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
 
 export default function Exercise01() {
   
   const [cart, setCart] = useState([]);
 
   const handlerAddMovieToCart = (movie) => {
     const found = cart.find(item => item.id === movie.id);
     if (!found) {
       const { id, name, price } = movie;
       setCart(
         [
           ...cart,
           {
             id,
             name,
             price,
             quantity: 1
           }
 
         ]
       )
     } else {
       const idx = cart.indexOf(found);
       const aux = Array.from(cart);
       aux[idx].quantity++;
       setCart(aux);
     }
   }
 
   const handlerDecrementQty = (id) => {
     const found = cart.find(item => item.id === id);
     const idx = cart.indexOf(found);
     const aux = Array.from(cart);
     aux[idx].quantity--;
     if (aux[idx].quantity > 0){
       setCart(aux);
     }else{
       const filteredCart = cart.filter(item => item.id !== id);
       setCart(filteredCart);
     }
   }
 
   const handlerIncrementQty = (id) => {
     const found = cart.find(item => item.id === id);
     const idx = cart.indexOf(found);
     const aux = Array.from(cart);
     aux[idx].quantity++;
     setCart(aux);
   }
 
   const getTotal = () => {
     let total = 0;
     let ids = [];
     let rulesIncludes = true;
     let discount = 0;
     cart.forEach(item=>{
       total += item.price * item.quantity;
       ids.push(item.id);
     })
 
     discountRules.forEach(rule => {
       rulesIncludes = true;
       rule.m.forEach(m=>{
         if(!ids.includes(m)){
           rulesIncludes = false;
         }
       })
       if(rulesIncludes){
         discount += rule.discount;
       }
     })
     total -= (total * discount);
     return total;
   }
 
   return (
     <section className="exercise01">
       <div className="movies__list">
         <ul>
           {movies.map(movie => (
             <li className="movies__list-card" key={movie.id}>
               <ul>
                 <li>
                   ID: {movie.id}
                 </li>
                 <li>
                   Name: {movie.name}
                 </li>
                 <li>
                   Price: ${movie.price}
                 </li>
               </ul>
               <button onClick={() => handlerAddMovieToCart(movie)}>
                 Add to cart
               </button>
             </li>
           ))}
         </ul>
       </div>
 
 
       <div className="movies__cart">
         <ul>
           {cart.map(item => (
             <li className="movies__cart-card" key={item.id}>
               <ul>
                 <li>
                   ID: {item.id}
                 </li>
                 <li>
                   Name: {item.name}
                 </li>
                 <li>
                   Price: ${item.price}
                 </li>
               </ul>
               <div className="movies__cart-card-quantity">
                 <button onClick={() => handlerDecrementQty(item.id)}>
                   -
                 </button>
                 <span>
                   {item.quantity}
                 </span>
                 <button onClick={() => handlerIncrementQty(item.id)}>
                   +
                 </button>
               </div>
             </li>
           ))}
         </ul>
         <div className="movies__cart-total">
           <p>Total: ${getTotal()}</p>
         </div>
       </div>
     </section>
   )
 }