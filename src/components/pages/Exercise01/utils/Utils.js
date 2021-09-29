import { useState } from "react";

function Utils() {
  const [discount, setDiscount] = useState(0);

  function areArraysEqual(a1, a2) {
    const firstArrayCopy = a1.slice().sort();
    const secondArrayCopy = a2.slice().sort();
    if (JSON.stringify(firstArrayCopy) === JSON.stringify(secondArrayCopy)) {
      return true;
    }
    return false;
  }

  const applyDiscount = (localCart, discountList) => {
    for (let i = 0; i < localCart.length; i++) {
      for (let j = 0; j < discountList.length; j++) {
        let combinationForDiscount = discountList[j].m;
        let discountToApply = discountList[j].discount;
        const res = areArraysEqual(localCart, combinationForDiscount);
        if (res) {
          setDiscount(discountToApply);
          return;
        } else {
          setDiscount((prev) => (prev = 0));
        }
      }
    }
  };
  return [discount, applyDiscount];
}

export default Utils;
