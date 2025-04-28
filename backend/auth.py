import jwt
from flask import request
from functools import wraps

SECRET_KEY = 'your_secret_key_here'  # Use your actual secret key here

# Function to verify the JWT token
def verify_token():
    token = None
    # Check if the token is passed in the Authorization header
    if 'Authorization' in request.headers:
        token = request.headers['Authorization'].split(" ")[1]
        print("Token found in headers:", token)

    if not token:
        return None

    try:
        # Decode the token
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        print("Decoded token:", decoded)    
        return decoded  # Returns the decoded token data (including user_id)
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

# Decorator to require token for accessing routes
def token_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        decoded_token = verify_token()
        if decoded_token is None:
            return {"error": "Token is missing or invalid"}, 401
        request.user_id = decoded_token.get('_id')  # Attach _id to the request context
        return f(*args, **kwargs)
    return decorated_function

