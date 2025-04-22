import mysql.connector

# Database connection configuration
db_config = {
    # 'host': 'localhost',     
    'user': 'root',          
    'password': 'system',  
    'database': 'path2it'    
}

def get_connection():
    """Establish and return a database connection."""
    try:
        print("nothing")
        connection = mysql.connector.connect(db_config)
        print("Connected object:", connection)

        if not connection.is_connected():
            raise mysql.connector.Error("Failed to establish a connection to the database.")
        
        print("MySQL Connection Successful!")
        return connection
    except Exception as e:  # ← catch ANY exception, not just mysql.connector.Error
        print(f"❌ Error connecting to MySQL: {e}")
        return None

def insert_user(name, email, password):
    """Insert a new user into the database."""
    connection = get_connection()
    if connection:
        try:
            cursor = connection.cursor()
            query = "INSERT INTO user (name, email, password) VALUES (%s, %s, %s)"
            cursor.execute(query, (name, email, password))
            connection.commit()
            print("User inserted successfully!")
        except mysql.connector.Error as e:
            print(f"Error inserting user: {e}")
        finally:
            connection.close()