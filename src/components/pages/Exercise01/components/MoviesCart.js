import React, { memo, useMemo } from "react";
import MovieCartItem, { CART_OPERATION } from "./MovieCartItem";

const MoviesCart = ({
  cartItems = [],
  itemIndex = {},
  discount = {},
  modifyQty,
  removeItem,
}) => {
  const totalValue = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.price * (itemIndex[item.id] || 1),
        0
      ),
    [cartItems, itemIndex]
  );

  const discountValue = useMemo(
    () => totalValue * (discount.totalDiscount || 0),
    [totalValue, discount]
  );

  return (
    <div className="movies__cart">
      {!cartItems.length && <p className="cart__empty">{`<Empty Cart>`}</p>}

      {!!cartItems.length && <p className="cart__title">{`Cart:`}</p>}
      <ul>
        {cartItems.map((movie) => (
          <MovieCartItem
            id={movie.id}
            key={movie.id}
            name={movie.name}
            price={movie.price}
            quantity={itemIndex[movie.id]}
            modifyQty={modifyQty}
            removeItem={removeItem}
          />
        ))}
      </ul>

      <div className="movies__cart-total">
        <p>
          <span>SubTotal:</span>
          <span>{`$${totalValue}`}</span>
        </p>

        <p>
          <span>
            Discount:
            <small>
              {discount.rules && discount.rules.length
                ? `(Promotion: ${discount.rules.join(", ")})`
                : ""}
            </small>
          </span>
          <span>{`$${discountValue}`}</span>
        </p>

        <p>
          <span>Total:</span>
          <span>{`$${totalValue - discountValue}`}</span>
        </p>
      </div>
    </div>
  );
};

export { CART_OPERATION };
export default memo(MoviesCart);
