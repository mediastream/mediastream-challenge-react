function QuantityManager({item, cart, setCart}){

  const changeQuantity = (id, amount) => { 
    const tempCart = [...cart]
    const updatedElement = tempCart.splice(cart.findIndex(item => item.id === id), 1)[0]
    updatedElement.quantity += amount
    if(updatedElement.quantity <= 0){
      tempCart.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
      setCart(tempCart)
    } else {
      tempCart.push(updatedElement)
      setCart(tempCart.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
      )
    }
  }
  
  return(
    <div className="movies__cart-card-quantity">
      <button onClick={() => changeQuantity(item.id, -1) }>
        -
      </button>
      <span>
        {item.quantity}
      </span>
      <button onClick={() => changeQuantity(item.id, 1) }>
        +
      </button>
    </div>
  )
}

export default QuantityManager
