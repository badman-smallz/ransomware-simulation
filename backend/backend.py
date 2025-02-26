from fastapi import FastAPI
import subprocess
import os

app = FastAPI()

# Define folder path
FOLDER_PATH = "test_files"

@app.get("/")
def read_root():
    return {"message": "Ransomware Simulation API is Running"}

@app.post("/encrypt")
def encrypt():
    try:
        subprocess.run(["python", "main.py", "--encrypt"], check=True)
        return {"status": "success", "message": "Files encrypted successfully!"}
    except subprocess.CalledProcessError as e:
        return {"status": "error", "message": f"Encryption failed: {str(e)}"}

@app.post("/decrypt")
def decrypt():
    try:
        subprocess.run(["python", "main.py", "--decrypt"], check=True)
        return {"status": "success", "message": "Files decrypted successfully!"}
    except subprocess.CalledProcessError as e:
        return {"status": "error", "message": f"Decryption failed: {str(e)}"}


