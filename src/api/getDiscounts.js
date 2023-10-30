export const getDiscounts = () => {
  return new Promise((resolve) => {
    resolve({
      data: [
        {
          rule: [3, 2],
          discount: 0.25
        },
        {
          rule: [2, 4, 1],
          discount: 0.5
        },
        {
          rule: [4, 2],
          discount: 0.1
        }
      ]
    })
  })
}