from flask import Flask, request, jsonify
from flask_cors import CORS
from auth_routes import auth_bp 
from notes_routes import note_bp 
from quiz_routes import quiz_bp 
from user_routes import user_bp 

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
app.config['SECRET_KEY'] = 'your_secret_key_here'  # Use environment variable in production

@app.route('/')
def dummy():
    return "Flask is running!"


# ==== AUTH ROUTES ====
app.register_blueprint(auth_bp, url_prefix="/api/auth")

# ==== NOTES ROUTES ====
app.register_blueprint(note_bp, url_prefix="/api/notes")

# ==== QUIZ ROUTES ====
app.register_blueprint(quiz_bp, url_prefix="/api/quiz")

# ==== USER ROUTES ====
app.register_blueprint(user_bp, url_prefix="/api/user")

# ==== SERVER START ====
if __name__ == '__main__':
    app.run(debug=True)
