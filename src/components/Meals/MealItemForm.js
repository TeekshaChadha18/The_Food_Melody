import classes from "./MealItemForm.module.css";
import Input from "../UI/Input";
import { useRef, useState } from "react";
import reactDom from "react-dom";

const MealItemForm = (props) => {
  const refAmount = useRef();
  const [isAmountValid, setAmountValid] = useState(true);
  const SubmitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = refAmount.current.value;
    const enteredAmountnum = +enteredAmount;
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountnum < 1 ||
      enteredAmountnum > 5
    ) {
      setAmountValid(false);
      return;
    }
    props.onAddtoCart(enteredAmountnum);
  };

  return (
    <form className={classes.form} onSubmit={SubmitHandler}>
      <Input
        ref={refAmount}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: 1,
          max: 1,
          defaultValue: 1,
          step: 1,
        }}
      />
      <button className={classes.button}>+ Add</button>
      {!isAmountValid && <p>Please enter valid Amount(1-5)</p>}
    </form>
  );
};

export default MealItemForm;
