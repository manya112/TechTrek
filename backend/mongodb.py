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
quizzes_collection = db["quizzes"]
badges_collection = db["badges"]

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

def get_user_notes(user_id):
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
            {
                "$set": {
                    "content": content,
                    "lastModified": datetime.utcnow(),  # Directly using datetime
                }
            },
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

# === QUIZ FUNCTIONS ===

def get_quiz_by_name_and_user(quiz_name, user_id):
    """ Get a quiz by quizName and userId """
    try:
        quiz = quizzes_collection.find_one({"quizName": quiz_name, "userId": user_id})
        return quiz
    except Exception as e:
        print(f"❌ Error fetching quiz: {e}")
        return None

def save_quiz(quiz_data):
    """ Insert a new quiz """
    try:
        result = quizzes_collection.insert_one(quiz_data)
        print(f"✅ Quiz inserted with _id: {result.inserted_id}")
        return result
    except Exception as e:
        print(f"❌ Error saving quiz: {e}")
        return None

def update_quiz(quiz_id, quiz_data):
    """ Update an existing quiz """
    try:
        result = quizzes_collection.update_one(
            {"_id": ObjectId(quiz_id)},
            {"$set": quiz_data}
        )
        if result.matched_count > 0:
            print(f"✅ Quiz updated with _id: {quiz_id}")
            return True
        else:
            print(f"❌ Quiz not found with _id: {quiz_id}")
            return False
    except Exception as e:
        print(f"❌ Error updating quiz: {e}")
        return False

def get_quizzes_by_user(user_id):
    """ Get all quizzes attempted by a user """
    try:
        quizzes = []
        for quiz in quizzes_collection.find({"userId": user_id}):
            quizzes.append({
                "id": str(quiz["_id"]),
                "quizName": quiz["quizName"],
                "quizDescription": quiz["quizDescription"],
                "quizIcon": quiz["quizIcon"],
                "pointsObtained": quiz["pointsObtained"],
                "totalPoints": quiz["totalPoints"]
            })
        print("✅ Quizzes fetched for user")
        return quizzes
    except Exception as e:
        print(f"❌ Error fetching quizzes for user: {e}")
        return []
    """ Insert a new quiz or update if it exists """
    try:
        existing_quiz = get_quiz_by_name_and_user(quiz_data["quizName"], user_id)
        
        if existing_quiz:
            # Update the existing quiz
            result = quizzes_collection.update_one(
                {"_id": existing_quiz["_id"]},
                {"$set": quiz_data}
            )
            print(f"✅ Quiz updated with _id: {existing_quiz['_id']}")
        else:
            # Insert a new quiz
            quiz_data["userId"] = user_id
            result = quizzes_collection.insert_one(quiz_data)
            print(f"✅ Quiz inserted with _id: {result.inserted_id}")
        
        return result
    except Exception as e:
        print(f"❌ Error inserting or updating quiz: {e}")
        return None

# === BADGE FUNCTIONS ===        
        # Save the badge
        result = save_badge(badge_data)
        print(f"✅ First badge '{badge_name}' awarded to user!")
        
        return badge_data
        
    except Exception as e:
        print(f"❌ Error awarding badge: {e}")
        return None
    
def save_badge(badge_data):
    try:
        result = badges_collection.insert_one(badge_data)
        print(f"✅ Badge inserted with _id: {result.inserted_id}")
        return result
    except Exception as e:
        print(f"❌ Error saving badge: {e}")
        return None

def get_badges_by_user(user_id):
    try:
        badges = []
        for badge in badges_collection.find({"userId": user_id}):
            badges.append({
                "id": str(badge["_id"]),
                "badgeName": badge["badgeName"],
                "badgeIcon": badge["badgeIcon"],
            })
        return badges
    except Exception as e:
        print(f"❌ Error fetching badges: {e}")
        return []
    
def get_profile_by_id(user_id):
    try:
        user = users.find_one({"_id": ObjectId(user_id)})
        if user:
            return {
                "id": str(user["_id"]),
                "name": user["name"],
                "email": user["email"],
                # Add other fields as needed
            }
        else:
            print("❌ User not found")
            return None
    except Exception as e:
        print(f"❌ Error fetching profile: {e}")
        return None
        