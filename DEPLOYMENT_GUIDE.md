
# Eventify Deployment Guide

## Backend Setup (Flask)

### 1. Install Python Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Environment Variables
Create a `.env` file in the backend directory:
```
FLASK_ENV=production
DATABASE_URL=postgresql://username:password@localhost/eventify_db
JWT_SECRET_KEY=your-super-secret-jwt-key-here
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
```

### 3. Database Setup
For production, use PostgreSQL:
```bash
# Install PostgreSQL and create database
createdb eventify_db

# Update app.py to use PostgreSQL
# app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
```

### 4. Run Backend
```bash
python app.py
```

## Frontend Setup (React)

### 1. Update API URL
In `src/services/api.ts`, change:
```typescript
const API_BASE_URL = 'https://your-backend-domain.com/api';
```

### 2. Build Frontend
```bash
npm run build
```

## Server Deployment Options

### Option 1: VPS/Dedicated Server
1. **Backend**: Deploy Flask app using Gunicorn + Nginx
2. **Frontend**: Serve built React files with Nginx
3. **Database**: PostgreSQL on same server

### Option 2: Cloud Services
1. **Backend**: Deploy to Heroku, Railway, or DigitalOcean App Platform
2. **Frontend**: Deploy to Netlify, Vercel, or AWS S3
3. **Database**: Use cloud PostgreSQL (AWS RDS, Google Cloud SQL)

### Option 3: Docker Deployment
```dockerfile
# Backend Dockerfile
FROM python:3.9
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
```

## Production Checklist

### Security
- [ ] Change JWT_SECRET_KEY
- [ ] Use HTTPS for both frontend and backend
- [ ] Set up CORS properly for production domains
- [ ] Use environment variables for all secrets

### Database
- [ ] Set up PostgreSQL for production
- [ ] Configure database backups
- [ ] Set up connection pooling

### Monitoring
- [ ] Set up error logging
- [ ] Configure application monitoring
- [ ] Set up uptime monitoring

### Performance
- [ ] Enable gzip compression
- [ ] Set up CDN for static assets
- [ ] Configure caching headers

## Estimated Monthly Costs

### Small Scale (100-1000 users)
- **VPS**: $20-50/month (DigitalOcean, Linode)
- **Database**: $15-25/month
- **Domain**: $12/year
- **SSL Certificate**: Free (Let's Encrypt)
- **Total**: ~$40-80/month

### Medium Scale (1000-10000 users)
- **Server**: $100-200/month
- **Database**: $50-100/month
- **CDN**: $10-30/month
- **Total**: ~$160-330/month

## Next Steps
1. Get a domain name
2. Choose hosting provider
3. Set up production database
4. Configure environment variables
5. Deploy backend and frontend
6. Test all functionality
7. Set up monitoring and backups
