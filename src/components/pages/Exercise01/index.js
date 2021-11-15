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
import { useState, useEffect } from 'react'

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

    ])

    const remove = (idX) => { 
        let newCart = cart.map((x, i, v) => { 
            const { id, name, price, quantity } = x
            if(id == idX)
                {
                    let quantityEdit = quantity - 1
                    if(quantityEdit > 0)
                    {
                        return { id, name, price, quantity: quantityEdit }
                    }
                    else
                    {
                        return {}
                    }
                }
            else 
            {
                return x
            }
        })

        setCart([...newCart])
    }


    const add = (idX) => { 
        let newCart = cart.map((x, i, v) => { 
            const { id, name, price, quantity } = x
            if(id == idX)
                {
                    let quantityEdit = quantity + 1
                    if(quantityEdit > 0)
                    {
                        return { id, name, price, quantity: quantityEdit }
                    }
                    else
                    {
                        return {}
                    }
                }
            else 
            {
                return x
            }
        })

        setCart([...newCart])
    }

    const getTotal = () => {
            let price = 0
            cart.forEach( x => {
                if(x.quantity > 0 && x.price)
                {
                    price += x.price * x.quantity
                    console.log("Seting price with quatity", "Price", price, "X.price", x.price)

                }
                else
                {
                    price += x.price ? x.price : 0
                    console.log("Setting price wihouth quantity", "Price",price, "x price", x.price)
                }
            })

            let discount = 0
   
            discountRules.forEach( x => {
               
                let match = 0
                x.m.forEach( y => {

                    
                    
                    cart.forEach( z => {
                        const { id } = z

                        if(y == id)
                        {
                            match++
                        }
                    })
                    if(match == x.m.length && cart.length == x.m.length)
                    {
                        discount = x.discount
                    }


                })
            })            
            return price

        } // TODO: Implement this

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
                <button onClick={() => { 
                            let alreadyOnCart = false
                            cart.forEach( x => {
                            alreadyOnCart =  x.id == o.id ? true : false 
                            })
                            if(!alreadyOnCart)
                                cart.push({ id: o.id, name: o.name, price: o.price, quantity: 1 })
                            
                            setCart([...cart])
                        }}
                    >
                    Add to cart
                </button>
                </li>
            ))}
            </ul>
        </div>
        <div className="movies__cart">
            <ul>
            {cart.map(x => {
                if(x.quantity > 0)
                {
                return (
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
                    <button onClick={() => { remove(x.id) }}>
                    -
                    </button>
                    <span>
                    {x.quantity}
                    </span>
                    <button onClick={() => { add(x.id) }}>
                    +
                    </button>
                </div>
                </li>
            )}})}
            </ul>
            <div className="movies__cart-total">
            <p>Total: ${getTotal()}</p>
            </div>
        </div>
        </section>
    )
} 