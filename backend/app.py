from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from mongodb import (
    insert_user, find_user_by_email,
    get_all_notes, create_note,
    update_note, delete_note
)
import jwt
from datetime import datetime
from auth import token_required

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'your_secret_key_here'  # Use environment variable in production

@app.route('/')
def dummy():
    return "Flask is running!"

# ==== AUTH ROUTES ====

@app.route('/api/signup', methods=['POST'])
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

@app.route('/api/login', methods=['POST'])
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

        token = jwt.encode({
            'email': user['email'],
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, app.config['SECRET_KEY'], algorithm='HS256')

        print("Login successful")
        return jsonify({
            "message": "Login successful",
            "token": token,
            "user": {
                "_id": str(user['_id']),  # ensure it's stringified if it's an ObjectId
                "name": user['name'],
                "email": user['email']
            }
        }), 200
    except Exception as e:
        print(f"Error during login: {e}")
        return jsonify({"error": str(e)}), 500

# ==== NOTE ROUTES ====

@app.route('/api/notes', methods=['GET'])
def get_notes():
    try:
        notes = get_all_notes()
        return jsonify(notes), 200
    except Exception as e:
        print(f"Error fetching notes: {e}")
        return jsonify({"error": str(e)}), 500
@app.route('/api/notes/<user_id>', methods=['GET'])
def get_user_notes(user_id):
    try:
        notes = get_all_notes(user_id)  # Define this function
        return jsonify(notes), 200
    except Exception as e:
        print(f"Error fetching notes for user {user_id}: {e}")
        return jsonify({"error": str(e)}), 500

# @app.route('/api/notes', methods=['POST'])
# def post_note():
#     data = request.get_json()
#     content = data.get("content")

#     if not content:
#         return jsonify({"error": "Content is required"}), 400

#     try:
#         note_id = create_note(content)
#         return jsonify({"message": "Note created", "id": note_id}), 201
#     except Exception as e:
#         print(f"Error creating note: {e}")
#         return jsonify({"error": str(e)}), 500
@app.route('/api/notes', methods=['POST'])
def post_note():
    data = request.get_json()
    content = data.get("content")
    user_id = data.get("user_id")

    if not content:
        return jsonify({"error": "Content is required"}), 400
    if not user_id:
        return jsonify({"error": "User ID is required"}), 400

    try:
        note_id = create_note(content, user_id)
        return jsonify({"message": "Note created", "id": note_id}), 201
    except Exception as e:
        print(f"Error creating note: {e}")
        return jsonify({"error": str(e)}), 500



@app.route('/api/notes/<note_id>', methods=['PUT'])
def edit_note(note_id):
    data = request.get_json()
    content = data.get("content")

    if not content:
        return jsonify({"error": "Content is required"}), 400

    try:
        updated = update_note(note_id, content)
        if updated:
            return jsonify({"message": "Note updated"}), 200
        else:
            return jsonify({"error": "Note not found"}), 404
    except Exception as e:
        print(f"Error updating note: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/notes/<note_id>', methods=['DELETE'])
# @token_required
def remove_note(note_id):
    try:
        deleted = delete_note(note_id)
        if deleted:
            return jsonify({"message": "Note deleted"}), 200
        else:
            return jsonify({"error": "Note not found"}), 404
    except Exception as e:
        print(f"Error deleting note: {e}")
        return jsonify({"error": str(e)}), 500

# ==== SERVER START ====

if __name__ == '__main__':
    app.run(debug=True)
