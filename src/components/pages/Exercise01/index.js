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
 import { useEffect, useState } from 'react'
 
 export default function Exercise01 () {
   const movies = [
     {
       id: 1,
       name: 'Star Wars',
       price: 20,
       quantity: 1,
     },
     {
       id: 2,
       name: 'Minions',
       price: 25,
       quantity: 1,
     },
     {
       id: 3,
       name: 'Fast and Furious',
       price: 10,
       quantity: 1,
     },
     {
       id: 4,
       name: 'The Lord of the Rings',
       price: 5,
       quantity: 1,
     }
   ]
 
   
 
   const [cart, setCart] = useState([])
 
   const remove = (index, id) => {
     const cartAux = [...cart];
     if(cart.some((item) => item.id === id) && cart[index].quantity > 1){
       cartAux[index].quantity = cartAux[index].quantity - 1;
       setCart(cartAux)
     } else {
       cartAux.splice(index, 1);
       setCart(cartAux)
     }
   }
 
   const addQuantity = (index) => {
     const cartAux = [...cart];
     cartAux[index].quantity += 1;
     setCart(cartAux)
   }
 
   const add = (index, id) => {
     const cartAux = [...cart];
     if(cart.some((item) => item.id === id)){
       const i = cartAux.findIndex((x) => x.id === id)
       cartAux[i].quantity += 1;
       setCart(() => cartAux)
     } else {
       setCart((prev) => [...prev, {...movies[index]}])
     }
     
   }
 
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
 
   const getTotal = () => {
     let total = 0
     cart.forEach((item) => {
       total = total + (item.price * item.quantity);
     })
     let discount = 0;
     let count1 = 0;
     let count2 = 0;
     let count3 = 0;
     discountRules[0].m.forEach(item => {
       cart.forEach(it => {
         if(item === it.id){
           count1 += 1;
         }
       })
     })
 
     discountRules[1].m.forEach(item => {
       cart.forEach(it => {
         if(item === it.id){
           count2 += 1;
         }
       })
     })
 
     discountRules[2].m.forEach(item => {
       cart.forEach(it => {
         if(item === it.id){
           count3 += 1;
         }
       })
     })
    if(count1 === 2){
      discount += discountRules[0].discount
    }
 
    if(count2 === 3){
     discount += discountRules[1].discount
    }
 
    if(count3 === 2){
     discount += discountRules[2].discount
    }
 
     return total - discount;
   } // TODO: Implement this
 
   useEffect(() => {
 
   }, [])
 
   return (
     <section className="exercise01">
       <div className="movies__list">
         <ul>
           {movies.map((o, i) => (
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
               <button onClick={() => add(i, o.id)}>
                 Add to cart
               </button>
             </li>
           ))}
         </ul>
       </div>
       <div className="movies__cart">
         <ul>
           {cart.map((x, i) => (
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
                 <button onClick={() => remove(i, x.id)}>
                   -
                 </button>
                 <span>
                   {x.quantity}
                 </span>
                 <button onClick={() => addQuantity(i)}>
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