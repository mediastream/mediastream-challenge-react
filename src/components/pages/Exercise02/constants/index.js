export const ORDER_LIST = {
  ASC: {
    value: 'ASC',
    sort: (a, b) => a.year - b.year,
    text: 'Year Ascending',
  },
  DESC: {
    value: 'DESC',
    sort: (a, b) => b.year - a.year,
    text: 'Year Descending',
  }
};
