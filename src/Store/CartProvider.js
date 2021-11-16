import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCart = { items: [], totalAmount: 0 };
const reduceFunc = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const updatedAmount = state.totalAmount + action.item.price * action.item.amount;
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItem = state.items[existingItemIndex];

    let updatedItems;

    if (existingItem) {
      let updatedItem;
      updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedAmount,
    };
  }
  
  if (action.type === "REMOVE_ITEM") {
    
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    let updatedItem;
    if(existingItem.amount===1){
      updatedItems=state.items.filter((item)=> item.id!==action.id);

    }
    else{
      updatedItem = {...existingItem, amount: existingItem.amount -1};
      updatedItems=[...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if(action.type==='CLEAR'){
    return defaultCart;
  }
  return defaultCart;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartState] = useReducer(reduceFunc, defaultCart);
  const addItemToCartHandler = (item) => {
    dispatchCartState({ type: "ADD_ITEM", item: item });
  };
  const removeItemToCartHandler = (id) => {
    dispatchCartState({ type: "REMOVE_ITEM", id: id });
  };
  const clearCartHandler = () => {
    dispatchCartState({ type: "CLEAR"});
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
    clearCart: clearCartHandler
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
