import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCart = {
    items:[],
    totalAmount:0
}
const cartReduce = (state,action)=>{

    if(action.type==='ADD'){
      const updatedAmount = state.totalAmount + action.item.price * action.item.amount;
      const existingCartItemIndex = state.items.findIndex(item=>item.id===action.item.id);
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;
      if(existingCartItem){
        let updatedItem = {
          ...existingCartItem,
          amount:existingCartItem.amount + action.item.amount
        };
        updatedItems = [...state.items]
        updatedItems[existingCartItemIndex] = updatedItem;
      }
      else{

        updatedItems = state.items.concat(action.item);
      }
      
      

        return {items:updatedItems,totalAmount:updatedAmount};
    }

    if(action.type==='REMOVE'){
      const existingCartItemIndex = state.items.findIndex(item=>item.id===action.id);
      const existingCartItem = state.items[existingCartItemIndex];
      const updatedTotalAmount = state.totalAmount - existingCartItem.price;
      let updatedItems
      if(existingCartItem.amount===1){
          updatedItems = state.items.filter(item=>item.id!==action.id);
      }
      else{
        const updatedItem = {...existingCartItem,amount:existingCartItem.amount-1}
        updatedItems=[...state.items]
        updatedItems[existingCartItemIndex] = updatedItem 
      }
      return {
        items:updatedItems,
        totalAmount:updatedTotalAmount
      }
    }
    if(action.type==='CLEAR'){
      return defaultCart;
    }



    return defaultCart;
}

function CartProvider(props) {

   const [cartState, dispatchCartAction] =useReducer(cartReduce,defaultCart);
  
    const addItemsHandler = (item) => {
        dispatchCartAction({type:"ADD",item:item});
    };

    const removeItemsHandler = (id) => {
        dispatchCartAction({type:"REMOVE",id:id});
    };
    const clearItemsHandler= ()=>{
      dispatchCartAction({type:'CLEAR'});
    }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItems: addItemsHandler,
    removeItems: removeItemsHandler,
    clearItems:clearItemsHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}
export default CartProvider;
