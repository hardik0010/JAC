# Jay Ambe Construction - Setup Instructions

## Project Overview
This is a complete construction company website with admin panel for managing projects, gallery, services, and team members.

## Features Implemented ✅
- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB
- **Admin Panel**: Complete CRUD operations for all entities
- **Image Upload**: Cloudinary integration
- **Authentication**: JWT-based admin authentication
- **CSV Export**: Export projects data to CSV
- **Responsive Design**: Mobile-first approach

## Quick Start

### 1. Backend Setup
```bash
cd backend
npm install
npm run create-admin  # Creates admin user (username: admin, password: admin123)
npm run seed          # Seeds sample projects
npm run dev           # Starts backend server on port 5000
```

### 2. Frontend Setup
```bash
# In a new terminal
npm install
npm run dev           # Starts frontend on port 3000
```

### 3. Access the Application
- **Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **Admin Login**: 
  - Username: `admin`
  - Password: `admin123`

## Admin Panel Features

### Dashboard
- View project statistics
- Quick overview of ongoing/completed projects

### Projects Management
- ✅ Add new projects
- ✅ Edit existing projects
- ✅ Delete projects (soft delete)
- ✅ Image upload for projects
- ✅ **CSV Export** - Download all project data

### Gallery Management
- View gallery items
- Add/Edit/Delete gallery items (TODO: implement forms)

### Services Management
- View services
- Add/Edit/Delete services (TODO: implement forms)

### Team Management
- View team members
- Add/Edit/Delete team members (TODO: implement forms)

## API Endpoints

### Public Endpoints
- `GET /api/projects` - Get all projects with pagination and search
- `GET /api/gallery` - Get gallery items
- `GET /api/services` - Get services
- `GET /api/team` - Get team members

### Admin Endpoints (Protected)
- `POST /api/admin/login` - Admin login
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/profile` - Admin profile
- `POST /api/admin/create` - Create new admin (super admin only)

### Project Management (Protected)
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `GET /api/projects/export/csv` - Export projects to CSV

## Database Models

### Project
- Project name, type, client, area, status, location, image

### Gallery Item
- Title, category, type, image, description

### Service
- Title, description, icon, features array

### Team Member
- Name, position, image, bio, experience, specializations

### Admin
- Username, email, password, role, last login

## Security Features
- JWT authentication for admin routes
- Password hashing with bcrypt
- Rate limiting on API endpoints
- Helmet security headers
- CORS configuration

## Environment Variables
The project uses hardcoded environment variables for development. For production, you should:
1. Create a `.env` file
2. Set proper environment variables
3. Remove hardcoded values from server.js

## Current Status
- ✅ **Core functionality complete**
- ✅ **Admin authentication working**
- ✅ **Project CRUD operations working**
- ✅ **CSV export working**
- ✅ **Search functionality with debouncing**
- 🔄 **Gallery/Services/Team forms need implementation**

## Next Steps for Production
1. Implement proper security measures
2. Add input validation and sanitization
3. Set up proper environment variables
4. Add HTTPS and security headers
5. Implement rate limiting and request validation
6. Add logging and monitoring
7. Set up proper error handling

## Support
For any issues or questions, please check the code comments and implement the TODO items marked in the admin panel.
