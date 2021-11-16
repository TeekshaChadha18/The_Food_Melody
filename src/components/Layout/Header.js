import { Fragment } from "react";
import classes from "./Header.module.css";
import mealsimage from "../../Assets/healthy-vegan-food-table.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>The Food Melody</h1>
        <HeaderCartButton onClickShow={props.oncartShow}/>
      </header>
      <div>
        <img
          className={classes["main-image"]}
          src={mealsimage}
          alt="A Table full of meals"
        />
      </div>
    </Fragment>
  );
};

export default Header;
