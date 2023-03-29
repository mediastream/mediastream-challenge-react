import React from "react";

export const TotalCart = ({ getTotal, getDiscount, getTotalPay }) => {
  return (
    <div className="movies__cart-total">
      <p>Total: ${getTotal()}</p>
      <p>Descuento: ${getDiscount()}</p>
      <p>Total a pagar: ${getTotalPay()}</p>
    </div>
  );
};
