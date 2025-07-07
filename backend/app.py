
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import datetime, timedelta
import stripe
import os
from models import db, User, College, Event, Challenge, Registration
from seed_data import seed_all

app = Flask(__name__)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///eventify.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your-secret-key-change-in-production')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=7)

# Initialize extensions
db.init_app(app)
jwt = JWTManager(app)
CORS(app, origins=["http://localhost:8080", "http://localhost:5173"])

# Stripe configuration
stripe.api_key = os.getenv('STRIPE_SECRET_KEY', 'sk_test_your_stripe_secret_key')

# Authentication Routes
@app.route('/api/auth/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        email = data.get('email')
        username = data.get('username', email.split('@')[0])
        password = data.get('password')
        college_id = data.get('college_id')
        
        if User.query.filter_by(email=email).first():
            return jsonify({'error': 'Email already exists'}), 400
        
        user = User(email=email, username=username, college_id=college_id)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        
        access_token = create_access_token(identity=user.id)
        return jsonify({
            'access_token': access_token,
            'user': {
                'id': user.id,
                'email': user.email,
                'username': user.username,
                'college_id': user.college_id
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
                    'username': user.username,
                    'college_id': user.college_id
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
        'username': user.username,
        'college_id': user.college_id
    })

# College Routes
@app.route('/api/colleges', methods=['GET'])
def get_colleges():
    colleges = College.query.filter_by(approved=True).all()
    return jsonify([{
        'id': college.id,
        'name': college.name,
        'short_name': college.short_name,
        'location': college.location,
        'state': college.state,
        'website': college.website,
        'email': college.email,
        'phone': college.phone,
        'logo_url': college.logo_url,
        'description': college.description,
        'established_year': college.established_year,
        'college_type': college.college_type,
        'affiliation': college.affiliation
    } for college in colleges])

@app.route('/api/colleges/<int:college_id>', methods=['GET'])
def get_college(college_id):
    college = College.query.get_or_404(college_id)
    return jsonify({
        'id': college.id,
        'name': college.name,
        'short_name': college.short_name,
        'location': college.location,
        'state': college.state,
        'website': college.website,
        'email': college.email,
        'phone': college.phone,
        'logo_url': college.logo_url,
        'description': college.description,
        'established_year': college.established_year,
        'college_type': college.college_type,
        'affiliation': college.affiliation
    })

@app.route('/api/colleges/<int:college_id>/events', methods=['GET'])
def get_college_events(college_id):
    events = Event.query.filter_by(college_id=college_id, approved=True).all()
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
        'participants': event.participants,
        'college_id': event.college_id
    } for event in events])

# Events Routes (Updated with college integration)
@app.route('/api/events', methods=['GET'])
def get_events():
    events = Event.query.filter_by(approved=True).all()
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
        'participants': event.participants,
        'college_id': event.college_id,
        'college_name': event.college.name if event.college else None
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
        'participants': event.participants,
        'college_id': event.college_id,
        'college_name': event.college.name if event.college else None
    })

# Challenges Routes (Updated with college integration)
@app.route('/api/challenges', methods=['GET'])
def get_challenges():
    challenges = Challenge.query.filter_by(approved=True).all()
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
        'price': challenge.price,
        'college_id': challenge.college_id,
        'college_name': challenge.college.name if challenge.college else None
    } for challenge in challenges])

# Admin Routes (for managing colleges and approvals)
@app.route('/api/admin/colleges/pending', methods=['GET'])
@jwt_required()
def get_pending_colleges():
    colleges = College.query.filter_by(approved=False).all()
    return jsonify([{
        'id': college.id,
        'name': college.name,
        'short_name': college.short_name,
        'location': college.location,
        'state': college.state,
        'created_at': college.created_at.isoformat()
    } for college in colleges])

@app.route('/api/admin/colleges/<int:college_id>/approve', methods=['POST'])
@jwt_required()
def approve_college(college_id):
    college = College.query.get_or_404(college_id)
    college.approved = True
    db.session.commit()
    return jsonify({'success': True})

# Payment Routes (keep existing)
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
                    'unit_amount': int(item.price * 100),
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

# Database initialization
with app.app_context():
    db.create_all()
    
    # Check if we need to seed data
    if College.query.count() == 0:
        print("No colleges found, seeding database...")
        seed_all()

if __name__ == '__main__':
    app.run(debug=True, port=5000)
