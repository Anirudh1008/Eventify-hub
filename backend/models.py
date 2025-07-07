
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    college_id = db.Column(db.Integer, db.ForeignKey('college.id'), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class College(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    short_name = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    state = db.Column(db.String(100), nullable=False)
    website = db.Column(db.String(200))
    email = db.Column(db.String(120))
    phone = db.Column(db.String(20))
    logo_url = db.Column(db.Text)
    description = db.Column(db.Text)
    established_year = db.Column(db.Integer)
    college_type = db.Column(db.String(50))  # Engineering, Medical, Arts, etc.
    affiliation = db.Column(db.String(100))  # University affiliation
    approved = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    events = db.relationship('Event', backref='college', lazy=True)
    challenges = db.relationship('Challenge', backref='college', lazy=True)

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
    college_id = db.Column(db.Integer, db.ForeignKey('college.id'), nullable=False)
    approved = db.Column(db.Boolean, default=False)
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
    rules = db.Column(db.Text)
    prizes = db.Column(db.Text)
    price = db.Column(db.Float, default=0.0)
    college_id = db.Column(db.Integer, db.ForeignKey('college.id'), nullable=False)
    approved = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Registration(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=True)
    challenge_id = db.Column(db.Integer, db.ForeignKey('challenge.id'), nullable=True)
    payment_status = db.Column(db.String(20), default='pending')
    registered_at = db.Column(db.DateTime, default=datetime.utcnow)
