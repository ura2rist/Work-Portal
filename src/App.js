import { useEffect, useContext } from 'react';
import './App.css';
import { Context } from './index';
import AppRouter from './components/AppRouter';
import Header from './components/Header';
import { observer } from 'mobx-react-lite';

function App() {
  const { store } = useContext(Context);
  useEffect(() => {
    if(localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, []);

  return (
    <article className='App'>
      <Header />
      <main>
        <AppRouter />
      </main>
    </article>
  );
}

export default observer(App);
