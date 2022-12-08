# mediastream-challenge-react
React Challenge

# Considerations

## Exercise 01

 The total discount will be computed as follows:
    - Look if a combination of discount exists in the cart
    - If a combination exists, then compute the total price of that movies in the cart
         and apply the discount. Example: If there a discount of 0.1 of movies [1,2], and in the cart
         i have 5 movies of id 1 and 3 movies of id 2, the price between two is 175, the discount is
         applied to only this price, if there exists more movies in the carts their price is ignored
         to compute **this** discount.
    - Repeat that process with all combinations of discounts
    - That allows to get the total amount that is sustracted to the total price

It implementation asumes that discounts cannot produce that the total price to be 0 or less.
## Exercise 02

The issue with the fetch of the movies was caused by useEffect hooks that was using handleMovieFetch
as a dependence. It methods changes and uses state vars inside, that causes that component render and handleMovieFetch updates, that triggers useEffect with handleMovieFetch as dependence. The useEffect
causes the execution of handleMovieFetch and here is the infinite loop. The solution was keep that useEffect without dependences, that only triggered at the begin and never more, like a compomentWillMount lifecycle (That it is the correct way of simulate a componentWillMount method since class components in React was deprecated).
