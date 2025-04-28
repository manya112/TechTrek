from flask import Blueprint, request, jsonify
from auth import token_required
from mongodb import save_badge, get_badges_by_user  # Import your DB functions

badge_bp = Blueprint('badge', __name__)

# POST route to save a badge (with badge name, userId, badgeIcon)
@badge_bp.route('/', methods=['POST'])
@token_required
def add_badge():
    try:
        # Get the request data
        data = request.get_json()

        # Ensure required fields are present
        required_fields = ['badgeName', 'badgeIcon']
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400

        # Add the userId from the request context (set by the token_required decorator)
        data['userId'] = request.user_id

        # Save the badge to the database
        result = save_badge(data)
        if result:
            return jsonify({"message": "Badge added successfully"}), 201
        else:
            return jsonify({"error": "Failed to add badge"}), 500
    except Exception as e:
        print(f"Error processing badge: {e}")
        return jsonify({"error": str(e)}), 500

# GET route to fetch badges the user has
@badge_bp.route('/', methods=['GET'])
@token_required
def get_badges():
    try:
        # Fetch badges for the logged-in user
        badges = get_badges_by_user(request.user_id)
        return jsonify(badges), 200
    except Exception as e:
        print(f"Error fetching badges: {e}")
        return jsonify({"error": str(e)}), 500
