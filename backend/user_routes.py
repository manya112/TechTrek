from flask import Blueprint, request, jsonify
# from mongodb import get_user  # Import relevant functions
from auth import token_required
from mongodb import get_profile_by_id

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
        user_id= get_profile_by_id(request.user_id)
        if not user_id:
                return jsonify({"error": "User not found"}), 404
        return jsonify(user_id), 200
    except Exception as e:
        print(f"Error fetching user profile: {e}")
        return jsonify({"error": str(e)}), 500
    
@user_bp.route('/profile', methods=['PUT'])
@token_required
def update_profile():
    try:
        # Get the request data
        data = request.get_json()
        user_id = request.user_id  # Get the user ID from the token

        # Allow partial updates - only require name
        if 'name' not in data:
            return jsonify({"error": "Name field is required"}), 400

        # Import here to avoid circular imports
        from mongodb import update_user_profile
            
        # Create update data dict - include title if provided
        update_data = {"name": data["name"]}
        if "title" in data:
            update_data["title"] = data["title"]
        
        # Update user profile
        result = update_user_profile(user_id, update_data)
        
        if result:
            return jsonify({"message": "Profile updated successfully"}), 200
        else:
            return jsonify({"error": "Failed to update profile"}), 500
            
    except Exception as e:
        print(f"Error processing profile update: {e}")
        return jsonify({"error": str(e)}), 500