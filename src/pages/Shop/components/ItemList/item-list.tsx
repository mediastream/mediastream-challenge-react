import { SHOP_ITEMS } from 'constants/config';
import { useCart } from 'pages/Shop/context';
import type { ShopItem } from 'types/shop';
import styles from './item-list.module.scss';

const List = () => {
  return (
    <section className={styles.container}>
      <ul>
        {SHOP_ITEMS.map((item) => (
          <Item data={item} key={item.id} />
        ))}
      </ul>
    </section>
  );
};

export default List;

const Item = ({ data }: { data: ShopItem }) => {
  return (
    <li className={styles.item}>
      <ul>
        <li>ID: {data.id}</li>
        <li>Name: {data.name}</li>
        <li>Price: ${data.price}</li>
      </ul>
      <Button data={data} />
    </li>
  );
};

const Button = ({ data }: { data: ShopItem }) => {
  const { addProduct } = useCart();

  const handleClick = () => {
    addProduct(data);
  };

  return (
    <button className={styles.button} onClick={handleClick} type="button">
      Add to cart
    </button>
  );
};
