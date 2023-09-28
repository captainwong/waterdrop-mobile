import { Outlet } from 'react-router-dom';
import styles from './App.module.less';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';

const App: React.FC = () => (
  <div className={styles.container}>
    <Header />
    <Outlet />
    <Footer />
  </div>
);

export default App;
