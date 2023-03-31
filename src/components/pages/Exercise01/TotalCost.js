import "./assets/styles.css";

const discountRules = [
  {
    m: [1, 2, 3],
    discount: 0.1,
  },
  {
    m: [3, 4],
    discount: 0.2,
  },
  {
    m: [1, 2, 3, 4],
    discount: 0.25,
  },
];

const TotalCost = ({ cart }) => {
  let total = 0;
  cart.forEach((movie) => {
    total += movie.price * movie.quantity;
  });
  discountRules.forEach((rule) => {
    const isRuleApplicable = rule.m.every((movieId) =>
      cart.some((movie) => movie.id === movieId)
    );
    if (isRuleApplicable) {
      total *= 1 - rule.discount;
    }
  });
  return <p>Total: ${total}</p>;
};

export default TotalCost;
