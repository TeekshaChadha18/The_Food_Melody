import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import { useContext } from "react";
import CartContext from "../../Store/cart-context";

const MealItem = (props) => {
  const price = `Rs. ${props.price.toFixed(2)}`;
  const cartCtx = useContext(CartContext);
  const addItemToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };
  return (
    <li className={classes.meal}>
      <div>
        <div>
          <h3>{props.name}</h3>
        </div>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddtoCart={addItemToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;