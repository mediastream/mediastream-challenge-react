function Cart(props) {

  const prices = props.elements.map(item => item.price)

  console.log(prices)

  const getTotal = () => 0//props.elements.reduce((total, element) => total + element.price) // TODO: Implement this

  return (
    <div className="movies__cart">
      <ul>
        {props.elements.map(item => (
          <li className="movies__cart-card">
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
              <button onClick={() => console.log('Decrement quantity', item)}>
                -
              </button>
              <span>
                {item.quantity}
              </span>
              <button onClick={() => console.log('Increment quantity', item)}>
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
  )
}

export default Cart
