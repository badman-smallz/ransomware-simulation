import os
from cryptography.fernet import Fernet

# Encrypt File
def encrypt_file(filename, key):
    fernet = Fernet(key)
    with open(filename, "rb") as file:
        data = file.read()
    encrypted_data = fernet.encrypt(data)
    
    # Save as a new encrypted file
    with open(filename + ".locked", "wb") as file:
        file.write(encrypted_data)

    # Remove the original file
    os.remove(filename)

# Decrypt File
def decrypt_file(filename, key):
    fernet = Fernet(key)
    with open(filename, "rb") as file:
        data = file.read()
    decrypted_data = fernet.decrypt(data)

    # Restore original filename by removing ".locked"
    original_filename = filename.replace(".locked", "")
    with open(original_filename, "wb") as file:
        file.write(decrypted_data)

    os.remove(filename)  # Remove the encrypted file
