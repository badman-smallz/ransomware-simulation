// Tooltip.jsx
import React from "react";
import styles from "./Tooltip.module.css";

const Tooltip = ({ text, children }) => {
  return (
    <span className={styles.tooltipWrapper}>
      {children}
      <span className={styles.tooltipText}>{text}</span>
    </span>
  );
};

export default Tooltip;
