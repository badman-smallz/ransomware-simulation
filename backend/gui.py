import tkinter as tk
from backend.index import encrypt_folder, decrypt_folder

def start_encryption():
    encrypt_folder()
    status_label.config(text="Encryption completed!")

def start_decryption():
    decrypt_folder()
    status_label.config(text="Decryption completed!")

# GUI Setup
root = tk.Tk()
root.title("Ransomware Simulation Tool")
root.geometry("300x200")

label = tk.Label(root, text="Select an action:", font=("Arial", 12))
label.pack(pady=10)

encrypt_btn = tk.Button(root, text="Encrypt Files", command=start_encryption)
encrypt_btn.pack(pady=5)

decrypt_btn = tk.Button(root, text="Decrypt Files", command=start_decryption)
decrypt_btn.pack(pady=5)

status_label = tk.Label(root, text="", font=("Arial", 10))
status_label.pack(pady=10)

root.mainloop()
