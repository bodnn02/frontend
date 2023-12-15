import React from "react";
import Button from './Button';
import styles from "./components.module.scss";

function Header (){
  return(
    <div className={styles.header}>
      <div className={styles.btn_container}>
        <Button title='< Назад' href='/'/>
      </div>
      <div className={styles.btn_container}>
      <Button href="auth" title="Выйти" />
      </div>
  </div>  )
}
export default Header