# notes_routes.py
from flask import Blueprint, request, jsonify
from mongodb import get_user_notes, create_note, update_note, delete_note  # Import relevant functions
from auth import token_required

note_bp = Blueprint('notes', __name__)

#whoever doing this, remember user_id can be accessed as  (request.user_id) in any of these routes
#u just have to edit the logics, no route names,etc


# Get all notes, almost works,check if any changes needed.
@note_bp.route('/', methods=['GET'])
@token_required 
def get_notes():

    user_id = request.user_id
    if not user_id:
        return jsonify({"error": "User ID is required"}), 400
    try:
        notes = get_user_notes(user_id)
        return jsonify(notes), 200
    except Exception as e:
        print(f"Error fetching notes: {e}")
        return jsonify({"error": str(e)}), 500

# Create a new note, dont touch, it works.
@note_bp.route('/', methods=['POST'])
@token_required 
def post_note():
    data = request.get_json()
    content = data.get("content")
    user_id = request.user_id

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

# Edit an existing note
@note_bp.route('/<note_id>', methods=['PUT'])
@token_required 
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

# Delete a note
@note_bp.route('/<note_id>', methods=['DELETE'])
@token_required 
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
