from flask import Blueprint, request, jsonify
from auth import token_required
from mongodb import save_quiz,update_quiz,get_quiz_by_name_and_user, get_quizzes_by_user  # import your db functions

quiz_bp = Blueprint('quiz', __name__)

# POST route to save or update a quiz
@quiz_bp.route('/', methods=['POST'])
@token_required
def add_or_update_quiz():
    try:
        # Get the request data
        data = request.get_json()

        # Ensure required fields are present
        required_fields = ['pointsObtained', 'quizDescription', 'quizIcon', 'quizName', 'totalPoints']
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400

        # Add the userId from the request context (set by the token_required decorator)
        data['userId'] = request.user_id

        # Check if a quiz with the same name and userId exists
        existing_quiz = get_quiz_by_name_and_user(data['quizName'], data['userId'])

        if existing_quiz:
            # Update the existing quiz document
            update_quiz(existing_quiz['_id'], data)
            return jsonify({"message": "Quiz updated successfully"}), 200
        else:
            # Save the new quiz document
            save_quiz(data)
            return jsonify({"message": "Quiz added successfully"}), 201

    except Exception as e:
        print(f"Error processing quiz: {e}")
        return jsonify({"error": str(e)}), 500


# GET route to fetch quizzes attempted by the logged-in user
@quiz_bp.route('/', methods=['GET'])
@token_required
def get_user_attempted_quizzes():
    try:
        # Get the userId from the request context
        user_id = request.user_id

        # Fetch quizzes attempted by the user
        attempted_quizzes = get_quizzes_by_user(user_id)

        if not attempted_quizzes:
            return jsonify({"message": "No quizzes found for this user"}), 404

        return jsonify(attempted_quizzes), 200

    except Exception as e:
        print(f"Error fetching attempted quizzes: {e}")
        return jsonify({"error": str(e)}), 500
