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

