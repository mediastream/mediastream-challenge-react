import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";


const CartContext = createContext({
    cart: [],
    setCart: () => { },
    addToCart: () => { },
    incrementQuantity: () => { },
    decrementQuantity: () => { },
    total: 0,
});

export const useCartContext = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([
        {
            id: 1,
            name: 'Star Wars',
            price: 20,
            quantity: 2
        }
    ]);

    const total = cart.reduce(
        (previousValue, currentValue) =>
            previousValue + currentValue.quantity * currentValue.price,
        0,
    );


    const addToCart = (movie) => {
        setCart(
            [...cart, {
                ...movie,
                quantity: 1
            }])
    }
    const removeFromCart = (movie) => {
        setCart(cart.filter((item) => item.id !== movie.id))
    }

    const incrementQuantity = (movie) => {
        setCart(cart.map((item) => item.id === movie.id ? { ...item, quantity: item.quantity + 1 } : item))
    }

    const decrementQuantity = (movie) => {
        if (movie.quantity === 1) return removeFromCart(movie)
        setCart(cart.map((item) => item.id === movie.id ? { ...item, quantity: item.quantity - 1 } : item))
    }

    useEffect(() => {
        const itemsCart = JSON.parse(localStorage.getItem("cart") || "[]");
        if (itemsCart.length > 0) {
            setCart(itemsCart);
        }
    }, [setCart]);
    ;

    const contextValue = useMemo(() => ({
        cart,
        setCart,
        total,
    }), [cart, setCart, total]);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    return (
        <CartContext.Provider value={{ ...contextValue, addToCart, incrementQuantity, decrementQuantity }}>
            {children}
        </CartContext.Provider>
    );
};