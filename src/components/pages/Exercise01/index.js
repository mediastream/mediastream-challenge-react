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
    const [movies, setMovies] = useState([
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
    ]);

    const [discountRules, setDiscountRules] = useState([
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
    ]);

    const [cart, setCart] = useState([
        {
            id: 1,
            name: 'Star Wars',
            price: 40,
            quantity: 2
        }
    ]);

    const [total, setTotal] = useState(40);
    const [discount, setDiscount] = useState(0);

    const getFields = (input, field) => {
        let output = [];

        for (let i = 0; i < input.length ; ++i){
            output.push(input[i][field]);
        }

        return output;
    }

    const checkerArray = (arr, target) => {
        return target.every(i => arr.includes(i));
    }    

    useEffect(() => {
        let cartIds = getFields(cart, 'id');
        let totaldiscount = 0;

        discountRules.forEach((item, i) => {
            let check = checkerArray(cartIds, item.m);

            if (check) {
                totaldiscount = totaldiscount + (total * item.discount);
            }
        });

        setDiscount(totaldiscount);

    }, [cart]);

    const handleAddToCart = (newMovie) => {
        if (cart.length > 0) {
            movies.forEach(x => {
                let movieIndex = movies.findIndex((obj => obj.id === newMovie.id));

                if(movieIndex !== -1) {
                    if(x.id === newMovie.id) {
                        cart.forEach((y, i) => {
                            let cartIndex = cart.findIndex((obj => obj.id === newMovie.id));

                            if(cartIndex !== -1) {
                                if(y.id === newMovie.id) {
                                    let newCart = [...cart];
                                    newCart[cartIndex] = {...y, quantity: y.quantity + 1, price: y.price + x.price}
                                    setCart(newCart);
                                }
                            }
                            else {
                                setCart([...cart, {...newMovie, quantity: 1}]);
                            }

                            setTotal(total + x.price);
                        });
                    }
                }

            });
        }
        else {
            setCart([...cart, {...newMovie, quantity: 1}]);
            setTotal(total + newMovie.price);            
        }
    }

    const handleRestToCart = (removeMovie) => {
        if (cart.length > 0) {
            cart.forEach((x, i) => {
                let cartIndex = cart.findIndex((obj => obj.id === removeMovie.id));

                if(cartIndex !== -1) {
                    if(x.id === removeMovie.id) {
                        let movieIndex = movies.findIndex((obj => obj.id === removeMovie.id));

                        if (x.quantity > 1) {
                            let newCart = [...cart];
                            newCart[cartIndex] = {...x, quantity: x.quantity - 1, price: x.price - movies[movieIndex].price}
                            setCart(newCart);
                        }
                        else {
                            let newCart = [...cart];
                            newCart = newCart.filter(item => item.id !== removeMovie.id);
                            setCart(newCart);
                        }

                        setTotal(total - movies[movieIndex].price);
                    }
                }
            });
        }
    }


    return (
        <section className="exercise01">
            <div className="movies__list">
                <ul>
                    {movies.map((movie, index) => (
                        <li key={index} className="movies__list-card">
                            <ul>
                                <li>ID: {movie.id}</li>
                                <li>Name: {movie.name}</li>
                                <li>Price: ${movie.price}</li>
                            </ul>
                            <button onClick={(e) => handleAddToCart(movie)}>
                                Add to cart
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="movies__cart">
                <ul>
                    {cart.map((x, index) => (
                        <li key={index} className="movies__cart-card">
                            <ul>
                                <li>ID: {x.id}</li>
                                <li>Name: {x.name}</li>
                                <li>Price: ${x.price}</li>
                            </ul>
                            <div className="movies__cart-card-quantity">
                                <button onClick={() => handleRestToCart(x)}>
                                    -
                                </button>
                                <span>
                                    {x.quantity}
                                </span>
                                <button onClick={() => handleAddToCart(x)}>
                                    +
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="movies__cart-total">
                    <p>Total: ${total - discount}</p>
                </div>
            </div>
        </section>
    )
} 