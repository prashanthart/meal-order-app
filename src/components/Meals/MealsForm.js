import Input from "../UI/Input";
import styles from "./MealsForm.module.css";
import { useRef } from "react";

function MealsForm(props) {
  const inputAmountRef = useRef();

  const submitAmountHandler = (event) => {
    event.preventDefault();
    props.addAmount(inputAmountRef.current.value);
  };

  return (
    <form className={styles.form} onSubmit={submitAmountHandler}>
      <Input
        ref={inputAmountRef}
        label="Amount"
        input={{
          type: "number",
          id: "amount_" + props.id,
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button className={styles.btn}>+ Add</button>
    </form>
  );
}
export default MealsForm;
