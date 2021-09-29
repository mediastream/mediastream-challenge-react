export const addItemToCart = ( cart, setCart, discountRules, item ) => {
  let currentCart = cart.items;
  let total = cart.total;
  
  const itemIndex = currentCart.findIndex(cartItem => cartItem.id === item.id);
  if ( itemIndex > -1 ) {
    currentCart[itemIndex].quantity += 1;
    total += item.price;
  } else {
    currentCart.push({
      ...item,
      quantity: 1
    })
    total += item.price;
  }

  setCart({
    items: currentCart,
    total,
    discount: calculateDiscount(cart, discountRules)
  });

}

export const removeItemFromCart = ( cart, setCart, discountRules, item ) => {
  let currentCart = cart.items;
  let total = cart.total;
  
  const itemIndex = currentCart.findIndex(cartItem => cartItem.id === item.id);
  if ( itemIndex > -1 ) {
    currentCart[itemIndex].quantity -= 1;
    total -= item.price;
    if ( currentCart[itemIndex].quantity <= 0 ) currentCart.pop(currentCart[itemIndex])
    setCart({
      items: currentCart,
      total,
      discount: calculateDiscount(cart, discountRules)
    });
  } else {
    console.error('Item not found')
  }

}


export const calculateDiscount = (cart, discountRules) => {

  // Sort and format Discount Rules
  let formatedDiscounts = [];
  discountRules.forEach( discountRule => {
    const sortDiscountRule = discountRule.coincidence.sort( (itemA, itemB) => itemA - itemB );
    
    let formatedRule = '';
    sortDiscountRule.forEach( rule => {
      formatedRule += `${rule},`;
    });

    formatedRule = formatedRule.substring(0, formatedRule.length - 1);
    formatedDiscounts.push({...discountRule, formatedRule})
  })

  // Sort and format Cart Item Ids
  let formatedCartItemIds = '';
  const cartItemIds = cart.items.map( item => item.id )
  const sortCartItemIds = cartItemIds.sort( (itemA, itemB) => itemA - itemB );

  sortCartItemIds.forEach( itemId => {
    formatedCartItemIds += `${itemId},`;
  })
  formatedCartItemIds = formatedCartItemIds.substring(0, formatedCartItemIds.length - 1);
  
  const discountFounds = formatedDiscounts.find( discount => formatedCartItemIds === discount.formatedRule )
 
  return discountFounds ? discountFounds.discount : 0;
}