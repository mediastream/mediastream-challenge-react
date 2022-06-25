import { useState } from "react";
import { discountRules } from "../data";

export default function useShoppingCard() {
  const [cart, setCart] = useState([]);

  
  const addToCard = movie => {
    if (cart.find(item => item.id === movie.id)) incrementQuantity(movie);
   else addItemToCart({...movie, quantity: 1});
  };

  const addItemToCart = item => {
    setCart(preState => [...preState, item]);
  };

  const hideItemFromCart = (movie) => {
    if(movie.quantity > 1) return;
    const filterCart = cart.filter(item => item.id !== movie.id);
    setCart([...filterCart]);
  };

  const incrementQuantity = (item) => {
    const callbackRest = sumQuantity(item.id);
    modificateQuantity( callbackRest);
  }

  const decrementQuantity = (item) => {
    const callbackRest = restQuantity(item.id);
    modificateQuantity( callbackRest);
    hideItemFromCart(item);
  }

  const modificateQuantity = ( callback) => {
    const newCart = cart.map(callback);
    setCart([...newCart]);
  }

  const sumQuantity = ( id) => {
    return function(item){
      if(item.id === id) return {...item, quantity: item.quantity + 1};
      else return item
    }
  }

  const restQuantity = (id) => {
    return function(item){
      if(item.id === id){
         return {...item, quantity: item.quantity - 1};
      }else return item
    }
  }


  const getTotal = () => {
    const total = getSum(cart);
    return total;
  }; 

  const getSum = (array) => {
    const total = array.reduce((a,{price, quantity}) => a + (price * quantity), 0) ;
    const discount = getDiscount(array);
    return total - total * discount;
  }

  const getDiscount = (array) => {
    const cartIndex = array.map(item => item.id);
    const typeDiscount = discountRules.findIndex(item => {
      if( checkItemsDiscount(cartIndex.sort(), item.m.sort())) return true
      else return false
    })
    return typeDiscount === -1 ? 0 : discountRules[typeDiscount].discount;
  }

  const checkItemsDiscount = (array1, array2) => {
    return array1.length === array2.length && array1.every((item, index) =>  item === array2[index]);
  }

  return { cart, addToCard, incrementQuantity, decrementQuantity, getTotal };
}
