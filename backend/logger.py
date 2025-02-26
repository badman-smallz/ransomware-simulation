import logging

# Configure Logging
logging.basicConfig(
    filename="ransomware_simulation.log",
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

def log_event(message):
    logging.info(message)
