import React, { useState, useEffect } from "react";
import CartCard from "./CartCard";

const discountRules = [
  {
    m: [3, 2],
    discount: 0.25,
  },
  {
    m: [2, 4, 1],
    discount: 0.5,
  },
  {
    m: [4, 2],
    discount: 0.1,
  },
];

function Cart({ cart, setCart }){
  // Utilizaremos un reduce como valor inicial por si modificamos los  
  // items inciales del carro que estan en el index.js de la pagina exercice01
  const [total, setTotal] = useState(
    cart.reduce((acc, curr) => {
      acc += curr.quantity * curr.price;
      return acc;
    }, 0)
  );

  useEffect(() => {
    const getTotal = () => {
      // Calculamos el total sin descuento
      let { total, movieIds } = cart.reduce(
        (acc, curr) => {
          acc.total += curr.quantity * curr.price;
          acc.movieIds.push(curr.id);
          return acc;
        },
        { total: 0, movieIds: [] }
      );
      // Aplicamos descuento
      const totalDiscount = discountRules.reduce((acc, curr) => {
        if (
          // "m" id del producto
          curr["m"].length === movieIds.length &&
          curr["m"].every((value) => movieIds.includes(value))
        ) {
          acc = acc * (1 - curr.discount);
        }
        return acc;
      }, total);
      // El monto total del carro con descuento aplicado
      setTotal(totalDiscount);
    };

    getTotal();
  }, [cart]);

  const handleChangeCart = (id, addRemove) => {
    setCart((cart) =>
    // Se opta por reduce en vez de map y filter por que ejecutaremos 1 iteracion vs ejecutar 2
      cart.reduce((acc, curr) => {
        // Se conserva la Movie que no es modificada
        if (curr.id !== id) {
          acc.push(curr);
        } else {
          // Si es la id de la Movie am odificar se evalua 
          // si se conservara en el carro junto a su nueva cantidad
          // o de otra manera no se guarda (quitandola del nuevo estado del carro)
          if (curr.quantity + addRemove > 0) {
            acc.push({
              ...curr,
              quantity: curr.quantity + addRemove,
            });
          }
        }
        return acc;
      }, [])
    );
  };

  return (
    <div className="movies__cart">
      <ul>
        {cart.map((movie) => (
          <CartCard
            key={movie.id}
            movie={movie}
            handleChangeCart={handleChangeCart}
          />
        ))}
      </ul>
      <div className="movies__cart-total">
        <p>Total: ${total}</p>
      </div>
    </div>
  );
};

export default Cart;
