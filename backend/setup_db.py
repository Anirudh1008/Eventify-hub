
#!/usr/bin/env python3
"""
Database setup script for Eventify
This script will create the database tables and seed them with initial data
"""

from app import app
from models import db
from seed_data import seed_all

def setup_database():
    """Set up the database with tables and initial data"""
    print("Setting up Eventify Database...")
    
    with app.app_context():
        # Create all tables
        db.create_all()
        print("✓ Database tables created")
        
        # Seed with initial data
        seed_all()
        print("✓ Database seeded with initial data")
        
    print("\nDatabase setup complete!")
    print("You can now run the Flask application with: python app.py")

if __name__ == '__main__':
    setup_database()
