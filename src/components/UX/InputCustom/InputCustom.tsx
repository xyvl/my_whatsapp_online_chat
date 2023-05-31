import React from "react";
import styles from "./inputCustom.module.scss";

const InputCustom = ({ dopClass, ...props }: string| any) => {
  return <input className={`${styles.input} ${dopClass}`} type="text" {...props} />;
};

export default InputCustom;
