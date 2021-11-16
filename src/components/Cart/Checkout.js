import classes from "./Checkout.module.css";
import { useRef, useState } from "react";
const Checkout = (props) => {
  const [formsInputValidity, setFormInputValidity] = useState({
    name: true,
    city: true,
    postal: true,
    street: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();
  const isEmpty = (value) => value.trim() === "";
  const isFiveChars = (value) => value.trim().length === 6;

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = isFiveChars(enteredPostal);
    setFormInputValidity({
      name: enteredNameIsValid,
      city: enteredCityIsValid,
      street: enteredStreetIsValid,
      postal: enteredPostalIsValid,
    });
    const isFormValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalIsValid;

    if (!isFormValid) {
      return;
    }
    props.onConfirm({
      name:enteredName,
      street:enteredStreet,
      city: enteredCity,
      postal: enteredPostal
    });
  };
  const nameControlClasses = `${classes.control} ${
    formsInputValidity.name ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formsInputValidity.city ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formsInputValidity.street ? "" : classes.invalid
  }`;
  const postalControlClasses = `${classes.control} ${
    formsInputValidity.postal ? "" : classes.invalid
  }`;
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input ref={nameInputRef} type="text" id="name" />
        {!formsInputValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div
        className={streetControlClasses}
      >
        <label htmlFor="street">Street</label>
        <input ref={streetInputRef} type="text" id="street" />
        {!formsInputValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div
        className={postalControlClasses}
      >
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalInputRef} type="text" id="postal" />
        {!formsInputValidity.postal && <p>Please enter a postal code!</p>}
      </div>
      <div
        className={cityControlClasses}
      >
        <label htmlFor="city">City</label>
        <input ref={cityInputRef} type="text" id="city" />
        {!formsInputValidity.city && <p>Please enter a valid city!</p>}
      </div>
      
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
