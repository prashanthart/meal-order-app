import { useRef, useState } from "react";
import styles from "./CheckoutForm.module.css";
function CheckOutForm(props) {
  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const textInputIsValid = (text) => text.trim() !== "";
  const numberInputISValid = (num) => num.trim().length >= 5;

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = textInputIsValid(enteredName);
    const enteredStreetIsValid = textInputIsValid(enteredStreet);
    const enteredPostalCodeIsValid = numberInputISValid(enteredPostalCode);
    const enteredCityIsValid = textInputIsValid(enteredCity);

    const isFormValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalCodeIsValid &&
      enteredCityIsValid;

    setFormValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postalCode: enteredPostalCodeIsValid,
      city: enteredCityIsValid,
    });

    if (!isFormValid) {
      console.log("not valid form");
      return;
    }
    props.onOrderConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city:enteredCity
    });

    nameInputRef.current.value = "";
    streetInputRef.current.value = "";
    postalCodeInputRef.current.value = "";
    cityInputRef.current.value = "";

    //sumbit;
  };

  const nameControlStyles = `${styles.control} ${
    !formValidity.name ? styles.invalid : ""
  }`;
  const streetControlStyles = `${styles.control} ${
    !formValidity.street ? styles.invalid : ""
  }`;
  const postalCodeControlStyles = `${styles.control} ${
    !formValidity.postalCode ? styles.invalid : ""
  }`;
  const cityControlStyles = `${styles.control} ${
    !formValidity.city ? styles.invalid : ""
  }`;

  return (
    <form onSubmit={confirmHandler}>
      <div className={styles["Form-wrapper"]}>
        <div className={nameControlStyles}>
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" ref={nameInputRef} />
          {!formValidity.name && <small>Name is required</small>}
        </div>
        <div className={streetControlStyles}>
          <label htmlFor="street">Street</label>
          <input type="text" id="street" ref={streetInputRef} />
          {!formValidity.street && <small>Street is required</small>}
        </div>
        <div className={postalCodeControlStyles}>
          <label htmlFor="postal code">Postal Code</label>
          <input type="text" id="postal code" ref={postalCodeInputRef} />
          {!formValidity.postalCode && (
            <small>postalCode needs to be 5 characters length</small>
          )}
        </div>
        <div className={cityControlStyles}>
          <label htmlFor="city">City</label>
          <input type="text" id="city" ref={cityInputRef} />
          {!formValidity.city && <small>City is required</small>}
        </div>
        <div className={styles.buttons}>
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
          <button>Confirm</button>
        </div>
      </div>
    </form>
  );
}
export default CheckOutForm;
