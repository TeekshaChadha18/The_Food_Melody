import classes from "./Modal.module.css";
import ReactDom from "react-dom";
import { Fragment } from "react";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};
const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div >{props.children}</div>
    </div>
  );
};
const portalElement = document.getElementById("overLays"); 

const Modal = (props) => {
  return(
  <Fragment>
    {ReactDom.createPortal(<Backdrop onClose={props.onClose}/>, portalElement)}

    {ReactDom.createPortal(
      <ModalOverlay>{props.children}</ModalOverlay>,
      portalElement
    )}
  </Fragment>);
};

export default Modal;
