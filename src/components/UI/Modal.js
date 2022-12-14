import { Fragment } from "react";
import React from "react";
// import { ReactDOM } from "react";

import ReactDOM from 'react-dom'
// import PortalReactDOM from 'react-dom'

import styles from './Modal.module.css'

function Backdrop(props){
    return (
        <div className={styles.backdrop} onClick = {props.onClick}/>
    )
}

function ModalOverlay(props){
    return(
        <div className={styles.modal}>
            <div className={styles.content}>{props.children}</div>
        </div>
    )
}
const portalElement = document.getElementById("overlay");
function Modal(props){

    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClick = {props.onClick}/>,portalElement)}
            {ReactDOM.createPortal(<ModalOverlay >{props.children}</ModalOverlay>,portalElement)}
        </Fragment>
    )

}
export default Modal;