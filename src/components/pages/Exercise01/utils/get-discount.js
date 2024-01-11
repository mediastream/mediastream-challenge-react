const discountRules = [
    {
        m: [3, 2],
        discount: 0.25
    },
    {
        m: [2, 4, 1],
        discount: 0.5
    },
    {
        m: [4, 2],
        discount: 0.1
    }
]

export const getDiscount = (cart, total) => {
    const cartMovies = cart.map((item) => item.id)

    const discount = discountRules.map((rule) => {
        const ruleMovies = rule.m;
        let isValid = true;
        const itemsMatched = [];

        cartMovies.forEach((movie) => {
            if (!ruleMovies.includes(movie)) {
                isValid = false;
            }
            itemsMatched.push(movie);
        });
        return isValid && itemsMatched.length === ruleMovies.length ? rule : null;
    });

    const hasDiscount = discount.find((item) => item !== null);
    return hasDiscount ? total - hasDiscount?.discount * total : 0;
}