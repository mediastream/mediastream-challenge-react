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

  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)


  const addToCart = (movie) =>{    
    setCart((prev)=> {
      const isMovieInCart = prev?.find(x => x.id === movie.id)      
      if(isMovieInCart){
        return prev.map(x => x.id === movie.id ? {...x, amount: x.amount + 1} : x)
      }
      return [...prev, { ...movie, amount: 1 }];
    })

  }  

  const removeFromCart = (movie) =>{
    setCart((prev)=> {
      return prev.filter(x => x.id !== movie.id)
    })
  }


  const incrementQuantity = (x) =>{ 
     
    const inCart = cart.find((movieInCart) => movieInCart.id === x.id)  
   if(inCart){      
      setCart((prev)=> {
        return prev.map(x => x.id === inCart.id ? {...x, amount: x.amount + 1} : x)
      })
      }      
    }  
  
  const decrementQuantity = (x) =>{    
    if(x.amount === 1){
      removeFromCart(x)
      return
    }    
    const inCart = cart.find((movieInCart) => movieInCart.id === x.id)           
   if(inCart){      
      setCart((prev)=> {
        return prev.map(x => x.id === inCart.id ? {...x, amount: x.amount - 1} : x)
      })
      } 
      
  }

  const getTotal =  (cart, discountRules) => {
    if(cart.length === 0) return 0
    let total = cart.reduce((acc, curr) => acc + (curr.price * curr.amount), 0);
    let maxDiscount = 0;
    discountRules.forEach(rule => {
      const discounts = rule.m.every(x => cart.some(y => y.id === x))
      if(discounts && rule.discount > maxDiscount){
        maxDiscount =rule.discount}
      })
      total = total - (total * maxDiscount)
      return total   

  }
  
  useEffect(() => {
   setTotal(getTotal(cart, discountRules))
  },[cart])

   

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
              <button onClick={() => addToCart(o)}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart?.map(x => (
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
                <button onClick={()=>decrementQuantity(x)}>
                  -
                </button>
                <span>
                  {x.amount}
                </span>
                <button onClick={()=>incrementQuantity(x)}>
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="movies__cart-total">
          <p>Total: {total > 0 ? `$ ${total}` : "No hay Productos "}</p>
        </div>
      </div>
    </section>
  )
} 