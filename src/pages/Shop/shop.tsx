import styles from './shop.module.scss';
import CartProvider from './context';
import ItemList from './components/ItemList';
import ShopCart from './components/ShopCart';

const Shop = () => {
  return (
    <div className={styles.container}>
      <CartProvider>
        <ItemList />
        <ShopCart />
      </CartProvider>
    </div>
  );
};

export default Shop;
