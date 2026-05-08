# Backend Guide for Talex

This guide explains how to set up a backend API server that integrates with the Talex frontend application.

## Overview

The Talex frontend expects a REST API with the following endpoints. Currently, the frontend uses mock data, but you can replace the service calls with real API requests.

## Tech Stack Recommendations

- **Runtime**: Node.js
- **Framework**: Express.js or Fastify
- **Database**: PostgreSQL or MongoDB
- **Authentication**: JWT or session-based
- **Validation**: Joi or Zod
- **Documentation**: Swagger/OpenAPI

## API Endpoints

### Jobs

```
GET /api/jobs
- Returns: Array of job objects
- Response: [{ id, title, company, location, salary, description, requirements, ... }]

GET /api/jobs/:id
- Returns: Single job object
- Response: { id, title, company, location, salary, description, requirements, ... }
```

### Users

```
POST /api/auth/register
- Body: { name, email, phone, password }
- Response: { user, token }

POST /api/auth/login
- Body: { email, password }
- Response: { user, token }

GET /api/users/profile
- Headers: Authorization: Bearer <token>
- Response: { user }

PUT /api/users/profile
- Headers: Authorization: Bearer <token>
- Body: { name, email, phone, ... }
- Response: { user }
```

### Applications

```
GET /api/applications
- Headers: Authorization: Bearer <token>
- Response: [{ id, jobId, status, appliedAt, ... }]

POST /api/applications
- Headers: Authorization: Bearer <token>
- Body: { jobId }
- Response: { application }

PUT /api/applications/:id
- Headers: Authorization: Bearer <token>
- Body: { status }
- Response: { application }
```

## Sample Backend Implementation

### 1. Project Setup

```bash
mkdir talex-backend
cd talex-backend
npm init -y
npm install express cors helmet dotenv bcryptjs jsonwebtoken mongoose
npm install -D nodemon @types/node @types/express typescript
```

### 2. Basic Server Structure

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/users', require('./routes/users'));
app.use('/api/applications', require('./routes/applications'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 3. Database Models (MongoDB example)

```javascript
// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  profile: {
    experience: String,
    skills: [String],
    resume: String,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);

// models/Job.js
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  salary: String,
  description: { type: String, required: true },
  requirements: [String],
  type: { type: String, enum: ['full-time', 'part-time', 'contract'] },
  postedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Job', jobSchema);
```

### 4. Authentication Middleware

```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = auth;
```

### 5. Sample Route

```javascript
// routes/jobs.js
const express = require('express');
const Job = require('../models/Job');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ postedAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
```

## Environment Variables

Create a `.env` file:

```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/talex
JWT_SECRET=your-secret-key
NODE_ENV=development
```

## Updating Frontend Services

Replace mock data in `services/jobService.ts`:

```typescript
import { api } from '@/lib/api';

export const jobService = {
  list: async () => {
    const response = await api.get('/jobs');
    return response.data;
  },
  findById: async (id: string) => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  },
};
```

## Deployment

### Vercel (Frontend) + Railway/Heroku (Backend)

1. Deploy backend to Railway or Heroku
2. Update frontend `.env.local` with backend URL
3. Deploy frontend to Vercel

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

## Security Considerations

- Use HTTPS in production
- Implement rate limiting
- Validate all inputs
- Hash passwords with bcrypt
- Use environment variables for secrets
- Implement CORS properly
- Add request logging

## Testing

```bash
npm install -D jest supertest
```

Create tests for API endpoints and middleware.

## Monitoring

Consider adding:
- Winston for logging
- Morgan for HTTP request logging
- Sentry for error tracking
- PM2 for process management

## Next Steps

1. Implement user authentication
2. Add job posting functionality
3. Implement application tracking
4. Add file upload for resumes
5. Set up email notifications
6. Add admin dashboard