import React,{useState} from "react";
import Cart from "./components/cart/Cart";
import Header from "./components/layout/Header";
import Meals from './components/Meals/Meals'
import CartProvider from "./store/CartProvider";
function App() {
  const [cartIsShown,setCartIsShown] = useState(false);

  const cartOpenHandler = ()=>{
    setCartIsShown(true);
  }

  const cartCloseHandler = ()=>{
    setCartIsShown(false);
  }

  return (
    <CartProvider>
      {cartIsShown && <Cart onCartClose = {cartCloseHandler} />}
      <Header onCartOpen = {cartOpenHandler}/>
      <Meals/>
    </CartProvider>
  );
}

export default App;
