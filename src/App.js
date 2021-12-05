import './App.css';
import AppRouter from './components/AppRouter';
import Header from './components/Header';

function App() {
  return (
    <article className='App'>
      <Header />
      <main>
        <AppRouter />
      </main>
    </article>
  );
}

export default App;
