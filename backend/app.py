
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
import stripe
import os

app = Flask(__name__)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///eventify.db'  # Use PostgreSQL in production
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your-secret-key-change-in-production'  # Change this!
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=7)

# Initialize extensions
db = SQLAlchemy(app)
jwt = JWTManager(app)
CORS(app, origins=["http://localhost:8080"])  # Update with your frontend URL

# Stripe configuration
stripe.api_key = "sk_test_your_stripe_secret_key"  # Add your Stripe secret key

# Database Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    organizer = db.Column(db.String(100), nullable=False)
    date = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Float, default=0.0)
    image = db.Column(db.Text)
    category = db.Column(db.String(50), nullable=False)
    participants = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Challenge(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    short_description = db.Column(db.Text)
    category = db.Column(db.String(50), nullable=False)
    deadline = db.Column(db.String(50), nullable=False)
    participants = db.Column(db.Integer, default=0)
    status = db.Column(db.String(20), default='')
    rules = db.Column(db.Text)  # JSON string
    prizes = db.Column(db.Text)
    price = db.Column(db.Float, default=0.0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Registration(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=True)
    challenge_id = db.Column(db.Integer, db.ForeignKey('challenge.id'), nullable=True)
    payment_status = db.Column(db.String(20), default='pending')
    registered_at = db.Column(db.DateTime, default=datetime.utcnow)

# Authentication Routes
@app.route('/api/auth/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        email = data.get('email')
        username = data.get('username', email.split('@')[0])
        password = data.get('password')
        
        if User.query.filter_by(email=email).first():
            return jsonify({'error': 'Email already exists'}), 400
        
        user = User(email=email, username=username)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        
        access_token = create_access_token(identity=user.id)
        return jsonify({
            'access_token': access_token,
            'user': {
                'id': user.id,
                'email': user.email,
                'username': user.username
            }
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        user = User.query.filter_by(email=email).first()
        if user and user.check_password(password):
            access_token = create_access_token(identity=user.id)
            return jsonify({
                'access_token': access_token,
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'username': user.username
                }
            })
        
        return jsonify({'error': 'Invalid credentials'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/me', methods=['GET'])
@jwt_required()
def get_current_user():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify({
        'id': user.id,
        'email': user.email,
        'username': user.username
    })

# Events Routes
@app.route('/api/events', methods=['GET'])
def get_events():
    events = Event.query.all()
    return jsonify([{
        'id': event.id,
        'title': event.title,
        'description': event.description,
        'organizer': event.organizer,
        'date': event.date,
        'location': event.location,
        'price': event.price,
        'image': event.image,
        'category': event.category,
        'participants': event.participants
    } for event in events])

@app.route('/api/events/<int:event_id>', methods=['GET'])
def get_event(event_id):
    event = Event.query.get_or_404(event_id)
    return jsonify({
        'id': event.id,
        'title': event.title,
        'description': event.description,
        'organizer': event.organizer,
        'date': event.date,
        'location': event.location,
        'price': event.price,
        'image': event.image,
        'category': event.category,
        'participants': event.participants
    })

# Challenges Routes
@app.route('/api/challenges', methods=['GET'])
def get_challenges():
    challenges = Challenge.query.all()
    return jsonify([{
        'id': challenge.id,
        'title': challenge.title,
        'description': challenge.description,
        'shortDescription': challenge.short_description,
        'category': challenge.category,
        'deadline': challenge.deadline,
        'participants': challenge.participants,
        'status': challenge.status,
        'rules': challenge.rules.split('|') if challenge.rules else [],
        'prizes': challenge.prizes,
        'price': challenge.price
    } for challenge in challenges])

# Payment Routes
@app.route('/api/payments/create-session', methods=['POST'])
@jwt_required()
def create_payment_session():
    try:
        data = request.get_json()
        event_id = data.get('event_id')
        challenge_id = data.get('challenge_id')
        
        if event_id:
            item = Event.query.get(event_id)
            success_url = f"http://localhost:8080/registration-success/{event_id}"
        else:
            item = Challenge.query.get(challenge_id)
            success_url = f"http://localhost:8080/registration-success/{challenge_id}"
        
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'inr',
                    'product_data': {
                        'name': item.title,
                    },
                    'unit_amount': int(item.price * 100),  # Convert to paise
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url=success_url,
            cancel_url='http://localhost:8080/events',
        )
        
        return jsonify({'url': session.url})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/register-event', methods=['POST'])
@jwt_required()
def register_for_event():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        event_id = data.get('event_id')
        challenge_id = data.get('challenge_id')
        
        registration = Registration(
            user_id=user_id,
            event_id=event_id,
            challenge_id=challenge_id,
            payment_status='completed'
        )
        db.session.add(registration)
        
        if event_id:
            event = Event.query.get(event_id)
            event.participants += 1
        else:
            challenge = Challenge.query.get(challenge_id)
            challenge.participants += 1
            
        db.session.commit()
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Initialize database
@app.before_first_request
def create_tables():
    db.create_all()
    
    # Add sample data if tables are empty
    if Event.query.count() == 0:
        sample_events = [
            Event(
                title="Tech Conference 2024",
                description="Annual technology conference featuring latest innovations",
                organizer="Tech University",
                date="March 15, 2024",
                location="Tech Center, Mumbai",
                price=2999,
                image="https://images.unsplash.com/photo-1540575467063-178a50c2df87",
                category="Technology",
                participants=156
            ),
            Event(
                title="Design Workshop",
                description="Interactive design workshop for UI/UX enthusiasts",
                organizer="Design Institute",
                date="April 20, 2024", 
                location="Design Hub, Bangalore",
                price=1999,
                image="https://images.unsplash.com/photo-1559136555-9303baea8ebd",
                category="Design",
                participants=89
            )
        ]
        
        for event in sample_events:
            db.session.add(event)
    
    if Challenge.query.count() == 0:
        sample_challenges = [
            Challenge(
                title="UI Design Contest",
                description="Create stunning user interfaces for mobile apps",
                short_description="Design beautiful and functional UI for our new student portal app",
                category="Design",
                deadline="June 15, 2025",
                participants=178,
                status="New",
                rules="Submit designs in Figma|Design must include at least 5 screens|Include dark and light mode versions",
                prizes="₹25,000 cash prize + Internship opportunity",
                price=499
            ),
            Challenge(
                title="Coding Sprint",
                description="48-hour hackathon to build innovative solutions",
                short_description="Join our coding sprint to build solutions addressing campus problems",
                category="Development",
                deadline="May 20, 2025",
                participants=342,
                status="Trending",
                rules="Teams must have 2-3 members|All code must be written during the 48-hour period|Use of open-source libraries is allowed",
                prizes="₹50,000 for first place, ₹25,000 for second place",
                price=699
            )
        ]
        
        for challenge in sample_challenges:
            db.session.add(challenge)
    
    db.session.commit()

if __name__ == '__main__':
    app.run(debug=True, port=5000)
