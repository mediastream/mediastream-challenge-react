export const movies = [
  {
    id: 1,
    name: "Star Wars",
    price: 20,
    image:
      "https://dawsons.blob.core.windows.net/stock/50250-1-medium.jpg?v=63796521156647",
  },
  {
    id: 2,
    name: "Minions",
    price: 25,
    image:
      "https://m.media-amazon.com/images/I/51djpxuKLML._AC_UF894,1000_QL80_.jpg",
  },
  {
    id: 3,
    name: "Fast and Furious",
    price: 10,
    image: "https://pics.filmaffinity.com/Fast_Furious_X-370829027-large.jpg",
  },
  {
    id: 4,
    name: "The Lord of the Rings",
    price: 5,
    image: "https://m.media-amazon.com/images/I/81EBp0vOZZL.jpg",
  },
];

export const discountRules = [
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
