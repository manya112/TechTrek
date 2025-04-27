from flask import Blueprint, request, jsonify
# from mongodb import get_user  # Import relevant functions
from auth import token_required

user_bp = Blueprint('user', __name__)

#whoever doing this, remember user_id can be accessed as  (request.user_id) in any of these routes
#u just have to edit the logics, no route names,etc



# Get all notes
@user_bp.route('/', methods=['GET'])
@token_required 
#dummy
def get_user():
    try:
        # notes = get_all_notes()
        return jsonify("hi"), 200
    except Exception as e:
        print(f"Error fetching notes: {e}")
        return jsonify({"error": str(e)}), 500

# Get user profile information
@user_bp.route('/profile', methods=['GET'])
@token_required
def get_profile():
    try:
        user_id = request.user_id
        # In a real application, you would fetch user data from database here
        # For now, returning dummy data
        user_data = {
            "name": "Alex Johnson",
            "email": "alex@example.com",
            "title": "Frontend Developer | React Specialist",
            "courses": 42,
            "quizzes": 15,
            "badges": 8,
            "progress": 78
        }
        return jsonify(user_data), 200
    except Exception as e:
        print(f"Error fetching profile: {e}")
        return jsonify({"error": str(e)}), 500

