import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import React, { useContext, useState } from "react";
import CartItem from "./CartItem";
import CheckOutForm from "./CheckoutForm";
function Cart(props) {
  const ctx = useContext(CartContext);
  const [showCheckoutForm,setShowCheckoutForm] = useState(false);
  const [isSubmitting,setIsSubmitting] = useState(false);
  const [didSubmit,setDidSubmit] = useState(false);


  const removeItemHandler = (id)=>{
    ctx.removeItems(id);

  }
  const addItemHandler = (item)=>{
    console.log(item)
    ctx.addItems({...item,amount:1});
  }
  const cartItem = (
    <ul className={styles["cart-items"]}>
      {ctx.items.map((item) => (
        // <li key={item.id}>{item.name}</li>
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onDec = {removeItemHandler.bind(null,item.id)}
          onInc = {addItemHandler.bind(null,item)}

        />
      ))}
    </ul>
  );
  const hasItems = ctx.items.length > 0;

  const onOrder = (event)=>{
    setShowCheckoutForm(true);
  }

  const onOrderConfirmHandler = async (userData) =>{
    // console.log(userData);
       setIsSubmitting(true);

      await fetch("https://react-http-987b8-default-rtdb.firebaseio.com/orders.json",{
      method:'POST',
      body:JSON.stringify({
        user:userData,
        order:ctx.items
      }),
    })
    setIsSubmitting(false);
    setDidSubmit(true);
    ctx.clearItems();
  }


   
   const modalButtons =  <div className={styles.actions}>
   <button onClick={props.onCartClose}>Close</button>
   {hasItems && <button onClick={onOrder} >Order</button>}
 </div>

 const cartModalContent = 
 <React.Fragment>
  {cartItem}
      <div className={styles.amount}>
        <span className={styles.amountTitle}>Total Amount</span>
        <span className={styles.price}>${ctx.totalAmount.toFixed(2)}</span>
      </div>
      {showCheckoutForm && <CheckOutForm onOrderConfirm={onOrderConfirmHandler} onCancel={props.onCartClose}/>}
      {!showCheckoutForm && modalButtons}

 </React.Fragment>
 const cartSubmittingModal = <p>its submitting</p>
 const didSubmitModal = <React.Fragment>
  <p>successfully order is placed!</p>
  <div className={styles.actions}>
   <button onClick={props.onCartClose}>Close</button>
 </div>
 </React.Fragment>



  return (
    <Modal onClick={props.onCartClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && cartSubmittingModal}
      {didSubmit && didSubmitModal}
    </Modal>
  );
}
export default Cart;
