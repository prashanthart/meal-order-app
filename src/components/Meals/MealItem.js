import React, { Fragment } from "react";
import styles from "./MealItem.module.css";
import MealsForm from "./MealsForm";
import {useContext} from 'react';
import CartContext from "../../store/cart-context";
function MealItem(props) {
  const cartCtx = useContext(CartContext);
  
  const addAmountAndItemHandler = (amount)=>{
     const numberAmount = +amount;
    cartCtx.addItems({
      id:props.id,
      name:props.name,
      price:props.price,
      amount:numberAmount
    })

  }

  return (
    <Fragment>
      <div className={styles.mealWrapper}>
        <div>
          <h2>{props.name}</h2>
          <p><i>{props.description}</i></p>
          <div className={styles.price}>${props.price}</div>
        </div>
        <div>
           <MealsForm addAmount={addAmountAndItemHandler} id={props.id}/>
        </div>
      </div>
      <hr />
      
    </Fragment>
  );
}
export default MealItem;
