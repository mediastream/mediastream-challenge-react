export const getDiscount = (total, discount) => {
    return parseFloat(total - (total * discount)).toFixed(2)
}

export const getMoviesTotal = (movies, discount) => {
    const initialValue = 0
    const total = movies.reduce(function (accumulator, curValue) {
        return accumulator + (curValue.price * curValue.quantity)
    }, initialValue)
    return getDiscount(total, discount)
}