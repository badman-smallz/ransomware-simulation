import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Howl } from "howler";
import styles from "./EncryptDecrypt.module.css";
import useSocketUpdates from "./useSocketUpdates";
import CountdownTimer from "./CountdownTimer";
import LogDashboard from "./LogDashboard";
import Tooltip from "./Tooltip";
import SettingsPanel from "./SettingsPanel";

// Utility function to play sound effects
const playSound = (src) => {
  const sound = new Howl({ src: [src] });
  sound.play();
};

const EncryptDecrypt = () => {
  // Activate socket updates for real-time events.
  useSocketUpdates();

  // State for file simulation. Initially empty; user can upload files.
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentProgress, setPaymentProgress] = useState(0);
  const [currentPaymentId, setCurrentPaymentId] = useState(null);

  // Countdown timer state to simulate decryption deadline.
  const [countdownActive, setCountdownActive] = useState(false);
  const [deadlineExpired, setDeadlineExpired] = useState(false);

  // Logging state for detailed event logs.
  const [logs, setLogs] = useState([]);
  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prevLogs) => [...prevLogs, { timestamp, message }]);
  };

  // Simulation settings (customizable via the settings panel).
  const [settings, setSettings] = useState({
    encryptionSpeed: 500, // ms; can be used for future enhancements
    paymentDelay: 500,     // delay for fake payment progress
    ransomAmount: 1,       // ransom amount in Bitcoin
  });

  // File upload handler: update the file list based on user selection.
  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files).map((file, index) => ({
      id: file.name + index,
      content: file.name, // For simplicity, using the file name.
      isEncrypted: false,
      isPaid: false,
    }));
    setFiles(uploadedFiles);
    addLog("Files uploaded by user.");
  };

  // Global encryption: call the backend API then update UI state.
  const handleGlobalEncrypt = async () => {
    try {
      const response = await fetch("http://localhost:5000/encrypt", {
        method: "POST",
      });
      const data = await response.json();
      alert(data.message);
      playSound("/sounds/encrypt.mp3"); // Ensure the file exists in your public folder.
      setFiles(files.map((file) => ({ ...file, isEncrypted: true, isPaid: false })));
      addLog("All files encrypted successfully.");
      setCountdownActive(true);
      setDeadlineExpired(false);
    } catch (error) {
      console.error("Encryption failed:", error);
      addLog("Error: Encryption failed.");
    }
  };

  // Global decryption: check if deadline expired, then call API.
  const handleGlobalDecrypt = async () => {
    if (deadlineExpired) {
      alert("Decryption deadline passed. Files cannot be restored!");
      addLog("Decryption attempt failed: Deadline expired.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/decrypt", {
        method: "POST",
      });
      const data = await response.json();
      alert(data.message);
      playSound("/sounds/decrypt.mp3");
      setFiles(files.map((file) => ({ ...file, isEncrypted: false, isPaid: false })));
      addLog("All files decrypted successfully.");
      setCountdownActive(false);
    } catch (error) {
      console.error("Decryption failed:", error);
      addLog("Error: Decryption failed.");
    }
  };

  // Called when the countdown timer expires.
  const handleTimerExpire = () => {
    setCountdownActive(false);
    setDeadlineExpired(true);
    setStatus("Decryption deadline passed. Files cannot be restored!");
    addLog("Decryption deadline expired. Files locked permanently.");
  };

  // Simulate fake payment with real-time progress updates.
  const handleFakePayment = (id) => {
    setCurrentPaymentId(id);
    setModalVisible(true);
    setPaymentProgress(0);

    const interval = setInterval(() => {
      setPaymentProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setModalVisible(false);
          setFiles(files.map((file) => (file.id === id ? { ...file, isPaid: true } : file)));
          addLog(`Fake payment processed for file ${id}.`);
          playSound("/sounds/payment.mp3");
          return 100;
        }
        return prev + 10; // Increment progress based on settings.paymentDelay.
      });
    }, settings.paymentDelay);
  };

  // Simulate individual file decryption (restore original content).
  const handleFileDecrypt = (id) => {
    setFiles(files.map((file) => (file.id === id ? { ...file, isEncrypted: false, isPaid: false } : file)));
    addLog(`File ${id} decrypted.`);
  };

  return (
    
    <div className={styles.container}>
      <h1 className={styles.header}>Ransomware Simulation</h1>
      
      {/* Customizable Settings Panel */}
      <SettingsPanel settings={settings} updateSettings={setSettings} />

      {/* File Upload Input */}
      <div style={{ marginBottom: "1rem" }}>
        <input type="file" multiple onChange={handleFileUpload} />
      </div>
      
      {/* Global Controls with Tooltips */}
      <div style={{ marginBottom: "1rem" }}>
        <Tooltip text="Simulate encrypting all files using a symmetric key algorithm.">
          <button className={`${styles.button} ${styles.encryptButton}`} onClick={handleGlobalEncrypt}>
            Encrypt Files 🔒
          </button>
        </Tooltip>
        <Tooltip text="Simulate decrypting all files. Decryption will fail if the deadline has expired.">
          <button className={`${styles.button} ${styles.decryptButton}`} onClick={handleGlobalDecrypt}>
            Decrypt Files 🔓
          </button>
        </Tooltip>
      </div>
      
      {/* Countdown Timer (appears when files are encrypted) */}
      {countdownActive && (
        <div style={{ marginBottom: "1rem" }}>
          <CountdownTimer startTime={60} onExpire={handleTimerExpire} />
        </div>
      )}
      
      {/* File List with Framer Motion Animations */}
      <div className={styles.fileList}>
        <AnimatePresence>
          {files.map((file) => (
            <motion.div
              key={file.id}
              className={styles.fileItem}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              {!file.isEncrypted ? (
                <div>
                  <p>{file.content}</p>
                </div>
              ) : (
                <div className={styles.ransomNote}>
                  <p>
                    Your file has been encrypted!<br />
                    To regain access, please pay {settings.ransomAmount} Bitcoin to:<br />
                    <strong>3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5</strong>
                  </p>
                  {!file.isPaid ? (
                    <Tooltip text="Click to simulate a fake payment process.">
                      <button className={styles.button} style={{ backgroundColor: "#ED8936" }} onClick={() => handleFakePayment(file.id)}>
                        Fake Payment
                      </button>
                    </Tooltip>
                  ) : (
                    <Tooltip text="Click to simulate file decryption.">
                      <button className={styles.button} style={{ backgroundColor: "#48BB78" }} onClick={() => handleFileDecrypt(file.id)}>
                        Decrypt File
                      </button>
                    </Tooltip>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* Modal for Fake Payment Simulation with Progress Bar */}
      {modalVisible && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Processing Payment</h2>
            <div className={styles.progressBarContainer}>
              <div className={styles.progressBar} style={{ width: `${paymentProgress}%` }}></div>
            </div>
            <p>{paymentProgress}%</p>
          </div>
        </div>
      )}
      
      {status && <p className="mt-4 text-lg">{status}</p>}
      
      {/* Detailed Log Dashboard */}
      <LogDashboard logs={logs} />
    </div>
  );
};

export default EncryptDecrypt;
