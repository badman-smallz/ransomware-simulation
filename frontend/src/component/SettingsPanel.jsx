// SettingsPanel.jsx
import React from "react";
import styles from "./SettingsPanel.module.css";

const SettingsPanel = ({ settings, updateSettings }) => {
  const handleChange = (e) => {
    updateSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.panel}>
  <h3>Simulation Settings</h3>
  <div className={styles.field}>
    <label className={styles.label}>Encryption Speed (ms):</label>
    <input className={styles.input} type="number" name="encryptionSpeed" value={settings.encryptionSpeed} onChange={handleChange} />
  </div>
      <div>
        <label>Payment Delay (ms): </label>
        <input
          type="number"
          name="paymentDelay"
          value={settings.paymentDelay}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Ransom Amount (BTC): </label>
        <input
          type="number"
          name="ransomAmount"
          value={settings.ransomAmount}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default SettingsPanel;
