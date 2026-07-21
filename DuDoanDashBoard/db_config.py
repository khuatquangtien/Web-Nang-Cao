# File: db_config.py
import os
import mysql.connector
from dotenv import load_dotenv

# Chỉ cần gọi load_dotenv() 1 lần ở đây
load_dotenv()

# Dictionary cấu hình
DB_CONFIG = {
    'host': os.getenv('DB_HOST', 'localhost'),
    'user': os.getenv('DB_USER', 'root'),
    'password': os.getenv('DB_PASSWORD', ''),
    'database': os.getenv('DB_NAME', 'travel_booking_db')
}

# Viết sẵn 1 hàm dùng chung cho mọi file
def get_db_connection():
    return mysql.connector.connect(**DB_CONFIG)