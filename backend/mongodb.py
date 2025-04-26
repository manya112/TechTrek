from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime

# MongoDB connection
MONGO_URI = "mongodb+srv://vandana1024k:Vandana_2_4_1_0@dontknow.8whozi3.mongodb.net/"
client = MongoClient(MONGO_URI)
print(client)  # Check if the client is connected
print("Connected to MongoDB!")

# Use (or create) a database and collection
db = client["path2it"]
users = db["user"]
notes_collection = db["notes"]

# === USER FUNCTIONS ===

def insert_user(name, email, password):
    print("Inserting user into MongoDB...")
    try:
        user_data = {
            "name": name,
            "email": email,
            "password": password  # Password should already be hashed before being passed
        }
        result = users.insert_one(user_data)
        print(f"✅ User inserted with _id: {result.inserted_id}")
    except Exception as e:
        print(f"❌ Error inserting user: {e}")

def find_user_by_email(email):
    print(f"Finding user by email: {email}")
    try:
        user = users.find_one({"email": email})
        if user:
            print("✅ User found")
        else:
            print("❌ No user found with that email")
        return user
    except Exception as e:
        print(f"❌ Error finding user: {e}")
        return None

# === NOTE FUNCTIONS ===

# def get_all_notes():
#     print("Fetching all notes...")
#     notes = []
#     try:
#         for note in notes_collection.find():
#             notes.append({
#                 "id": str(note["_id"]),
#                 "content": note["content"],
#                 "created": note.get("created"),
#                 "lastModified": note.get("lastModified")
#             })
#         print("✅ Notes fetched")
#     except Exception as e:
#         print(f"❌ Error fetching notes: {e}")
#     return notes
def get_all_notes(user_id):
    print(f"Fetching notes for user: {user_id}")
    notes = []
    try:
        # Don't convert user_id to ObjectId since it's stored as a string
        for note in notes_collection.find({"user_id": user_id}):
            notes.append({
                "id": str(note["_id"]),
                "content": note["content"],
                "created": note.get("created"),
                "lastModified": note.get("lastModified")
            })
        print("✅ Notes fetched")
    except Exception as e:
        print(f"❌ Error fetching notes: {e}")
    return notes


# def create_note(content):
#     print("Creating a new note...")
#     try:
#         note = {
#             "content": content,
#             "created": datetime.datetime.utcnow(),
#             "lastModified": datetime.datetime.utcnow()
#         }
#         result = notes_collection.insert_one(note)
#         print(f"✅ Note created with _id: {result.inserted_id}")
#         return str(result.inserted_id)
#     except Exception as e:
#         print(f"❌ Error creating note: {e}")
#         return None
# def create_note(content, user_id):
#     print("Creating a new note...")
#     try:
#         note = {
#             "content": content,
#             "user_id": ObjectId(user_id),
#             "created": datetime.datetime.utcnow(),
#             "lastModified": datetime.datetime.utcnow()
#         }
#         result = notes_collection.insert_one(note)
#         print(f"✅ Note created with _id: {result.inserted_id}")
#         return str(result.inserted_id)
#     except Exception as e:
#         print(f"❌ Error creating note: {e}")
#         return None
def create_note(content, user_id):
    note = {
        "content": content,
        "user_id": user_id,
        "created": datetime.utcnow(),
        "lastModified": datetime.utcnow()
    }
    result = notes_collection.insert_one(note)
    return str(result.inserted_id)



def update_note(note_id, content):
    print(f"Updating note with id: {note_id}")
    try:
        result = notes_collection.update_one(
            {"_id": ObjectId(note_id)},
            {"$set": {
                "content": content,
                "lastModified": datetime.datetime.utcnow()
            }}
        )
        if result.matched_count > 0:
            print("✅ Note updated")
            return True
        else:
            print("❌ Note not found")
            return False
    except Exception as e:
        print(f"❌ Error updating note: {e}")
        return False

def delete_note(note_id):
    if not note_id:
        print("❌ Error: note_id is required")
        return False
        
    try:
        # Validate note_id format
        if not ObjectId.is_valid(note_id):
            print(f"❌ Error: Invalid note_id format: {note_id}")
            return False
            
        # Convert to ObjectId and attempt deletion
        object_id = ObjectId(note_id)
        print(f"🔄 Attempting to delete note with id: {note_id}")
        
        result = notes_collection.delete_one({"_id": object_id})
        
        if result.deleted_count > 0:
            print(f"✅ Note {note_id} successfully deleted")
            return True
        else:
            print(f"❌ Note with id {note_id} not found")
            return False
            
    except Exception as e:
        print(f"❌ Error deleting note {note_id}: {str(e)}")
        raise Exception(f"Failed to delete note: {str(e)}")
