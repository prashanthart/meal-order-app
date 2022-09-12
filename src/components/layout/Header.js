import { Fragment } from "react";
import styles from './Header.module.css';
import mealsimage from '../../assets/meals.jpg';
import HeaderCartButton from "./HeaderCartButton";
function Header(props) {
  return (
    <Fragment>
      <header className={styles.header}>
        <h1>Your meals</h1> 
        <HeaderCartButton onClick={props.onCartOpen} className={styles.btn}>cart</HeaderCartButton>
      </header>
      <div className={styles["main-image"]}>
        <img src={mealsimage} alt="table of food" />
      </div>
     
    </Fragment>
  );
}
export default Header;
