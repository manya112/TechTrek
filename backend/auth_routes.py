from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from mongodb import insert_user, find_user_by_email

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    print("Received signup request:", data)

    if not data.get('name') or not data.get('email') or not data.get('password'):
        print("Error: Missing required fields")
        return jsonify({"error": "Missing required fields"}), 400

    name = data['name']
    email = data['email']
    password = data['password']
    hashed_password = generate_password_hash(password)

    try:
        print(f"Inserting user {name}, {email}")
        insert_user(name, email, hashed_password)
        print("Signup successful!")
        return jsonify({"message": "Signup successful!"}), 201
    except Exception as e:
        print(f"Error during signup: {e}")
        return jsonify({"error": str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    print("Received login request:", data)

    if not data.get('email') or not data.get('password'):
        print("Error: Missing email or password")
        return jsonify({"error": "Missing email or password"}), 400

    email = data['email']
    password = data['password']

    try:
        user = find_user_by_email(email)
        if not user:
            print("User not found")
            return jsonify({"error": "Invalid email or password"}), 401

        if not check_password_hash(user['password'], password):
            print("Incorrect password")
            return jsonify({"error": "Invalid email or password"}), 401

        # Now using user['_id'] instead of user['email']
        token = jwt.encode({
            '_id': str(user['_id']),  # Using user ID instead of email
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, 'your_secret_key_here', algorithm='HS256')

        print("Login successful")
        return jsonify({
            "message": "Login successful",
            "token": token,
            "user": {
                "_id": str(user['_id']),  # Ensure it's stringified if it's an ObjectId
                "name": user['name'],
                "email": user['email']
            }
        }), 200
    except Exception as e:
        print(f"Error during login: {e}")
        return jsonify({"error": str(e)}), 500
