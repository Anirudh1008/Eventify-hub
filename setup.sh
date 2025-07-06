
#!/bin/bash

echo "Setting up Eventify Backend..."

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
cd backend
pip install -r requirements.txt

echo "Backend setup complete!"
echo "To run the backend:"
echo "1. cd backend"
echo "2. source ../venv/bin/activate"
echo "3. python app.py"
echo ""
echo "To run the frontend:"
echo "1. npm install"
echo "2. npm run dev"
