import styles from './home.module.scss';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from 'assets/images/logo.svg';

const Home = () => {
  return (
    <div className={styles.container}>
      <Logo className={styles.logo} title="OTT Next" />
      <h1 className={styles.title}>OTT Next React Technical Test</h1>
      <nav className={styles.navigation}>
        <Link to="/movies">MOVIES</Link>
        <Link to="/shop">SHOP</Link>
      </nav>
    </div>
  );
};

export default Home;
