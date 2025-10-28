import sqlite3
import os

db_path = 'users.db'

# Check if database exists
if not os.path.exists(db_path):
    print(f"❌ Database file '{db_path}' not found!")
else:
    print(f"✅ Database file found: {db_path}")
    
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Check integrity
        cursor.execute("PRAGMA integrity_check")
        result = cursor.fetchone()
        
        if result[0] == "ok":
            print("✅ Database integrity: OK")
        else:
            print(f"❌ Database corrupted: {result[0]}")
        
        # Check if users table exists
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='users'")
        if cursor.fetchone():
            print("✅ Users table exists")
            
            # Count users
            cursor.execute("SELECT COUNT(*) FROM users")
            count = cursor.fetchone()[0]
            print(f"📊 Total users: {count}")
            
            # Show all users (without passwords)
            cursor.execute("SELECT id, name, email FROM users")
            users = cursor.fetchall()
            if users:
                print("\n👥 Registered users:")
                for user in users:
                    print(f"  - ID: {user[0]}, Name: {user[1]}, Email: {user[2]}")
            else:
                print("📝 No users registered yet")
        else:
            print("❌ Users table not found")
        
        conn.close()
        
    except sqlite3.DatabaseError as e:
        print(f"❌ Database error: {e}")
