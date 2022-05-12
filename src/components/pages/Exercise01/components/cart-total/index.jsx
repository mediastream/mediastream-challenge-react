const CartTotal = ({ total, totalWithDiscount }) => {
    return (<div className="movies__cart-total">
        <p
            className={`movies__cart-total__display-price movies__cart-total__display-price--${totalWithDiscount.discount ? 'discount' : 'normal'}`}
        >Total: ${total}</p>
        {totalWithDiscount.discount && <p>Final Price: ${totalWithDiscount.total}</p>}
    </div>
    )
}

export default CartTotal
