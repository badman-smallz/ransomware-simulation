// LogDashboard.jsx
import React from "react";
import styles from "./LogDashboard.module.css";

const LogDashboard = ({ logs }) => {
  return (
    <div className={styles.dashboard}>
      <h2>Event Log</h2>
      <div className={styles.logContainer}>
        {logs.length === 0 ? (
          <p>No events yet.</p>
        ) : (
          logs.map((log, index) => (
            <div key={index} className={styles.logEntry}>
              <span className={styles.timestamp}>{log.timestamp}</span> - {log.message}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LogDashboard;
