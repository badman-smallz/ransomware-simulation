import { useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const useSocketUpdates = () => {
  useEffect(() => {
    socket.on("encryption_update", (data) => {
      console.log("Encryption update:", data);
      // You can update UI state based on real-time progress here
    });

    socket.on("decryption_update", (data) => {
      console.log("Decryption update:", data);
      // Update UI state accordingly
    });

    return () => {
      socket.off("encryption_update");
      socket.off("decryption_update");
    };
  }, []);
};

export default useSocketUpdates;
