import { Route, Routes } from 'react-router';
import './App.css'
import HomeNav from './Components/HomeNav';
import HomePage from './Components/HomePage';
import ErrorPage from './Components/ErrorPage';
import CartDetailsPage from './Components/CartDetailsPage';

function App(props) {
  return (
   <>
    <Routes>
      <Route path='/' element={<HomeNav/>}>
        <Route index element={<HomePage/>}/>
        <Route path='/cart-details/:id' element={<CartDetailsPage/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Route>
    </Routes>
   </>
  );
}

export default App;