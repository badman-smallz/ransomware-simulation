from cryptography.fernet import Fernet

KEY_FILE = "key.key"

# Generate Key
def generate_key():
    key = Fernet.generate_key()
    with open(KEY_FILE, "wb") as key_file:
        key_file.write(key)

# Load Key
def load_key():
    return open(KEY_FILE, "rb").read()
