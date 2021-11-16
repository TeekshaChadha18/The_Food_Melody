import { Fragment, useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./Store/CartProvider";
function App() {
  const [isCartShown, setIsCartShown] = useState(false);
  const cartshowHandler = () => {
    setIsCartShown(true);
  };
  const cartHideHandler = () => {
    setIsCartShown(false);
  };
  return (
    <CartProvider>
     {isCartShown && <Cart onHideCart={cartHideHandler}/>}
      <Header oncartShow ={cartshowHandler}/>
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
