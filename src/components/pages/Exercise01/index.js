/**
 * Exercise 01: The Retro Movie Store
 * Implement a shopping cart with the next features for the Movie Store that is selling retro dvds:
 * 1. Add a movie to the cart
 * 2. Increment or decrement the quantity of movie copies. If quantity is equal to 0, the movie must be removed from the cart
 * 3. Calculate and show the total cost of your cart. Ex: Total: $150
 * 4. Apply discount rules. You have an array of offers with discounts depending of the combination of movie you have in your cart.
 * You have to apply all discounts in the rules array (discountRules).
 * Ex: If movie: [1, 2, 3], it means the discount will be applied to the total when the cart has all that products in only.
 *
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import './assets/styles.css';
import { useState } from 'react';

export default function Exercise01() {
	const movies = [
		{
			id: 1,
			name: 'Star Wars',
			price: 20,
		},
		{
			id: 2,
			name: 'Minions',
			price: 25,
		},
		{
			id: 3,
			name: 'Fast and Furious',
			price: 10,
		},
		{
			id: 4,
			name: 'The Lord of the Rings',
			price: 5,
		},
	];

	const discountRules = [
		{
			movie: [3, 2],
			discount: 0.25,
		},
		{
			movie: [2, 4, 1],
			discount: 0.5,
		},
		{
			movie: [4, 2],
			discount: 0.1,
		},
	];

	const [cart, setCart] = useState([]);

	const getTotal = () => {
		let total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

		for (const rule of discountRules) {
			const ruleMatch = rule.movie.every((movieId) => cart.some((item) => item.id === movieId));
			const cartMatch = cart.every((item) => rule.movie.includes(item.id));

			if (ruleMatch && cartMatch) {
				const discountAmount = rule.discount * total;
				total -= discountAmount;
			}
		}

		return total;
	};

	const addToCart = (movieId) => {
		const existingItem = cart.find((item) => item.id === movieId);

		if (existingItem) {
			setCart((prevCart) =>
				prevCart.map((item) =>
					item.id === movieId ? { ...item, quantity: item.quantity + 1 } : item
				)
			);
		} else {
			const selectedMovie = movies.find((movie) => movie.id === movieId);
			setCart((prevCart) => [...prevCart, { ...selectedMovie, quantity: 1 }]);
		}
	};

	const decrementItems = (movieId) => {
		setCart((prevCart) =>
			prevCart
				.map((item) => (item.id === movieId ? { ...item, quantity: item.quantity - 1 } : item))
				.filter((item) => item.quantity > 0)
		);
	};

	const incrementItems = (movieId) => {
		setCart((prevCart) =>
			prevCart.map((item) =>
				item.id === movieId ? { ...item, quantity: item.quantity + 1 } : item
			)
		);
	};

	return (
		<>
			<section className='exercise01'>
				<ul className='movies__list'>
					{movies.map((movie) => (
						<li className='movies__list-card' key={movie.id}>
							<ul>
								<li>ID: {movie.id}</li>
								<li>Name: {movie.name}</li>
								<li>Price: ${movie.price}</li>
							</ul>
							<button onClick={() => addToCart(movie.id)}>Add to Cart</button>
						</li>
					))}
				</ul>
				<ul className='movies__cart'>
					{cart.map((item) => (
						<li className='movies__cart-card' key={item.id}>
							<ul>
								<li>ID: {item.id}</li>
								<li>Name: {item.name}</li>
								<li>Price: ${item.price}</li>
							</ul>

							<div className='movies__cart-card-quantity'>
								<button onClick={() => decrementItems(item.id)}>-</button>
								<span>{item.quantity}</span>
								<button onClick={() => incrementItems(item.id)}>+</button>
							</div>
						</li>
					))}
					<div className='movies__cart-total'>
						<p>Total: ${getTotal()}</p>
					</div>
				</ul>
			</section>
		</>
	);
}
