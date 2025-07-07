
import json
from models import db, College, Event, Challenge

def get_indian_colleges():
    """Return a list of real Indian colleges with their data"""
    return [
        {
            "name": "Indian Institute of Technology Delhi",
            "short_name": "IIT Delhi",
            "location": "Hauz Khas, New Delhi",
            "state": "Delhi",
            "website": "https://www.iitd.ac.in",
            "email": "info@iitd.ac.in",
            "phone": "+91-11-2659-1938",
            "description": "Premier engineering and technology institute",
            "established_year": 1961,
            "college_type": "Engineering",
            "affiliation": "IIT System",
            "approved": True
        },
        {
            "name": "Indian Institute of Technology Bombay",
            "short_name": "IIT Bombay",
            "location": "Powai, Mumbai",
            "state": "Maharashtra",
            "website": "https://www.iitb.ac.in",
            "email": "info@iitb.ac.in",
            "phone": "+91-22-2572-2545",
            "description": "Leading technical education and research institute",
            "established_year": 1958,
            "college_type": "Engineering",
            "affiliation": "IIT System",
            "approved": True
        },
        {
            "name": "Indian Institute of Science",
            "short_name": "IISc Bangalore",
            "location": "Bangalore",
            "state": "Karnataka",
            "website": "https://www.iisc.ac.in",
            "email": "info@iisc.ac.in",
            "phone": "+91-80-2293-2001",
            "description": "Premier institute for advanced scientific and technological research",
            "established_year": 1909,
            "college_type": "Science & Research",
            "affiliation": "Autonomous",
            "approved": True
        },
        {
            "name": "Delhi University",
            "short_name": "DU",
            "location": "Delhi",
            "state": "Delhi",
            "website": "https://www.du.ac.in",
            "email": "info@du.ac.in",
            "phone": "+91-11-2766-7077",
            "description": "One of India's largest universities",
            "established_year": 1922,
            "college_type": "University",
            "affiliation": "Central University",
            "approved": True
        },
        {
            "name": "Jawaharlal Nehru University",
            "short_name": "JNU",
            "location": "New Delhi",
            "state": "Delhi",
            "website": "https://www.jnu.ac.in",
            "email": "info@jnu.ac.in",
            "phone": "+91-11-2670-4000",
            "description": "Premier university for social sciences and humanities",
            "established_year": 1969,
            "college_type": "University",
            "affiliation": "Central University",
            "approved": True
        },
        {
            "name": "Indian Institute of Technology Madras",
            "short_name": "IIT Madras",
            "location": "Chennai",
            "state": "Tamil Nadu",
            "website": "https://www.iitm.ac.in",
            "email": "info@iitm.ac.in",
            "phone": "+91-44-2257-4000",
            "description": "Leading engineering and technology institute",
            "established_year": 1959,
            "college_type": "Engineering",
            "affiliation": "IIT System",
            "approved": True
        },
        {
            "name": "Banaras Hindu University",
            "short_name": "BHU",
            "location": "Varanasi",
            "state": "Uttar Pradesh",
            "website": "https://www.bhu.ac.in",
            "email": "info@bhu.ac.in",
            "phone": "+91-542-230-7000",
            "description": "One of the largest residential universities in Asia",
            "established_year": 1916,
            "college_type": "University",
            "affiliation": "Central University",
            "approved": True
        },
        {
            "name": "Anna University",
            "short_name": "Anna Univ",
            "location": "Chennai",
            "state": "Tamil Nadu",
            "website": "https://www.annauniv.edu",
            "email": "info@annauniv.edu",
            "phone": "+91-44-2235-8000",
            "description": "Technical university in Tamil Nadu",
            "established_year": 1978,
            "college_type": "Engineering",
            "affiliation": "State University",
            "approved": True
        },
        {
            "name": "Jadavpur University",
            "short_name": "JU",
            "location": "Kolkata",
            "state": "West Bengal",
            "website": "https://www.jaduniv.edu.in",
            "email": "info@jaduniv.edu.in",
            "phone": "+91-33-2414-6666",
            "description": "Premier university known for engineering and arts",
            "established_year": 1955,
            "college_type": "University",
            "affiliation": "State University",
            "approved": True
        },
        {
            "name": "Manipal Institute of Technology",
            "short_name": "MIT Manipal",
            "location": "Manipal",
            "state": "Karnataka",
            "website": "https://www.manipal.edu",
            "email": "info@manipal.edu",
            "phone": "+91-820-292-3000",
            "description": "Leading private engineering institute",
            "established_year": 1957,
            "college_type": "Engineering",
            "affiliation": "Deemed University",
            "approved": True
        }
    ]

def seed_colleges():
    """Add real college data to the database"""
    colleges_data = get_indian_colleges()
    
    for college_data in colleges_data:
        # Check if college already exists
        existing_college = College.query.filter_by(name=college_data["name"]).first()
        if not existing_college:
            college = College(**college_data)
            db.session.add(college)
    
    db.session.commit()
    print(f"Added {len(colleges_data)} colleges to database")

def seed_sample_events():
    """Add sample events for the colleges"""
    colleges = College.query.all()
    
    sample_events = [
        {
            "title": "Tech Innovation Summit 2024",
            "description": "Annual technology conference featuring latest innovations in AI, ML, and Web3",
            "organizer": "Tech Society",
            "date": "March 15, 2024",
            "location": "Main Auditorium",
            "price": 2999,
            "image": "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
            "category": "Technology",
            "approved": True
        },
        {
            "title": "Cultural Fest 2024",
            "description": "Annual cultural festival with music, dance, and art competitions",
            "organizer": "Cultural Committee",
            "date": "April 20, 2024",
            "location": "Campus Grounds",
            "price": 1500,
            "image": "https://images.unsplash.com/photo-1559136555-9303baea8ebd",
            "category": "Cultural",
            "approved": True
        },
        {
            "title": "Hackathon 2024",
            "description": "48-hour coding competition to solve real-world problems",
            "organizer": "Programming Club",
            "date": "May 10, 2024",
            "location": "Computer Center",
            "price": 999,
            "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
            "category": "Technology",
            "approved": True
        }
    ]
    
    for college in colleges[:5]:  # Add events to first 5 colleges
        for event_data in sample_events:
            event = Event(
                **event_data,
                college_id=college.id
            )
            db.session.add(event)
    
    db.session.commit()
    print("Added sample events to colleges")

def seed_all():
    """Seed all data"""
    seed_colleges()
    seed_sample_events()
    print("Database seeded successfully!")
