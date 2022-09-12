import CartIcon from "../cart/CartIcon";
import { useContext,useEffect,useState } from "react";
import styles from './HeaderCartButton.module.css';
import CartContext from "../../store/cart-context";
function HeaderCartButton(props) {
  const [headerCartBtnBump,setHeaderCartbtnBump ]= useState(false);
  const Cartctx = useContext(CartContext);
  console.log(Cartctx)


  const numberOfCartItems = Cartctx.items.reduce((curNumber,item)=>{
    return curNumber + item.amount;
  },0);

  const {items} = Cartctx;

  const btnstyle = `${styles.button} ${ headerCartBtnBump ? styles.bump:'' }`;

  useEffect(()=>{
    if(items.length===0){
      return;
    }
    setHeaderCartbtnBump(true);
    const time = setTimeout(()=>{
      setHeaderCartbtnBump(false);
    },300);

    return (()=>{
      clearTimeout(time);
    })



  },[items])


  return (
    <button className={btnstyle} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon/>
      </span>
      <span className={styles.title}>Your cart</span>
      <span className={styles.badge}>
        { numberOfCartItems>99 ? '99+':numberOfCartItems}
      </span>
    </button>
  );
}
export default HeaderCartButton;
