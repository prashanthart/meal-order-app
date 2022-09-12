import React, { Fragment } from "react";
import styles from './CartItem.module.css';
function CartItem(props){

    return(
        <Fragment>
            <div className={styles.cartItem}>
                <div className={styles.summary} >
                    <h3>{props.name}</h3>
                    <div>

                        <span className={styles.price}>${props.price.toFixed(2)}</span>
                        <span className={styles.box}>x{props.amount}</span>
                    </div>
                </div>
                <div className={styles.itemButtons}>
                     <button onClick={props.onDec}>-</button>
                    <button onClick={props.onInc}>+</button>

                </div>
               
            </div>
            <hr/>
        </Fragment>
        
    )

}
export default CartItem;