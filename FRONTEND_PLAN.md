# Canada Jobs Application Platform Frontend Plan

## 1. 🎯 Product Overview

Build a platform that is:
- Modern
- Fast
- Mobile-first
- Secure
- Trustworthy
- Conversion-driven

### Target Users
- Kenyan job seekers
- Android users (low–mid devices)
- Limited internet/data users

### UX Principles
- Simple
- Fast
- Clear actions
- Low data usage
- Trust-focused design

---

## 2. 🧱 Tech Stack

### Core
- Next.js 15 (App Router) — SSR + routing
- TypeScript — Type safety
- Tailwind CSS — Styling
- ShadCN UI — UI components

### State & Data
- React Query — Server state
- Zustand — Client state
- Axios — API requests

### Forms & Validation
- React Hook Form — Form handling
- Zod — Validation

### UX Enhancements
- Framer Motion — Animations
- Swiper.js — Sliders

---

## 3. 🗂 Project Structure (Scalable)

/src
 ├── app/
 ├── components/
 │    ├── ui/
 │    ├── shared/
 │    └── features/
 ├── features/
 │    ├── auth/
 │    ├── jobs/
 │    ├── applications/
 │    ├── payments/
 │    └── profile/
 ├── services/
 ├── hooks/
 ├── store/
 ├── utils/
 ├── constants/
 ├── types/
 ├── styles/
 ├── lib/
 └── middleware/

---

## 4. 🧭 Routing Plan

### 🌐 Public Routes
- `/` → Homepage
- `/jobs` → Jobs listing
- `/jobs/[id]` → Job details
- `/about`
- `/contact`
- `/login`
- `/register`
- `/forgot-password`
- `/privacy-policy`
- `/terms`

### 👤 User Dashboard
- `/dashboard`
- `/dashboard/profile`
- `/dashboard/applications`
- `/dashboard/saved-jobs`
- `/dashboard/notifications`
- `/dashboard/settings`

### 🛠 Admin Panel
- `/admin/login`
- `/admin/dashboard`
- `/admin/jobs`
- `/admin/jobs/create`
- `/admin/jobs/edit/[id]`
- `/admin/applications`
- `/admin/users`
- `/admin/payments`
- `/admin/settings`

---

## 5. 🧩 Global Layouts

### Public Layout
- Navbar
- Footer
- Mobile menu

### User Dashboard Layout
- Sidebar
- Topbar
- Content area

### Admin Layout
- Sidebar
- Analytics topbar
- Protected routes

---

## 6. 🏠 Homepage Plan

### Structure
- Navbar
- Hero Section
- Search Section
- Featured Jobs
- How It Works
- Testimonials
- Statistics
- CTA Section
- Footer

### Hero Section
- Headline: Find Verified Canada Jobs For Kenyans
- Subheadline: Apply for visa-sponsored opportunities online
- Buttons: `Browse Jobs`, `Start Application`

### Trust Indicators
- Verified jobs only
- Secure M-Pesa payment
- No hidden charges

### How It Works
1. Create Account
2. Complete Profile
3. Browse Jobs
4. Apply & Pay
5. Track Application

---

## 7. 💼 Jobs Page

### Features
- Job listing grid
- Search bar
- Filters
- Infinite scroll (mobile)

### Filters
- Category
- Salary
- Province
- Experience
- Visa Sponsorship

### Job Card
- Title
- Salary
- Province
- Deadline
- `View`
- `Save`

---

## 8. 📄 Single Job Page

### Sections
- Header
- Job title
- Salary
- Province

### Content
- Description
- Requirements
- Benefits

### Apply Section
- `Apply Now`

### Apply Flow
1. Click Apply
2. Login check
3. Profile completion check
4. Payment modal
5. M-Pesa payment
6. Application submitted

---

## 9. 💳 Payment System

### Payment Modal
- Application Fee: KES 500
- Phone Number
- `Pay & Submit`

### States
- Idle
- Processing
- STK Sent
- Success
- Failed
- Timeout

### UX Features
- Retry payment
- Auto-detect phone
- Real-time status

---

## 10. 🔐 Authentication

### Register
- Name
- Email
- Phone
- Password
- Confirm Password

### Login
- Email/Phone
- Password

### Features
- Validation
- Error handling
- Optional OTP

---

## 11. 👤 User Dashboard

### Sidebar
- Dashboard
- Applications
- Saved Jobs
- Notifications
- Profile
- Settings
- Logout

### Dashboard Overview
- Applications count
- Saved jobs
- Notifications
- Profile completion %

---

## 12. 🧾 Profile Page

### Sections
- Personal Info: Name, DOB, Gender, Nationality
- Contact: Phone, Email, Address
- Education: School, Course, Year
- Experience: Company, Role, Years
- Documents: CV, Passport, Certificates

### Profile Completion Bar
- `80% Complete`

---

## 13. 📊 Applications Page

### Table
- Job
- Payment
- Status
- Date

### Status Flow
- Submitted
- Reviewed
- Shortlisted
- Interview
- Approved
- Rejected

---

## 14. 🔔 Notifications

### Types
- Payment success
- Application updates
- New jobs

---

## 15. 🛠 Admin Frontend

### Sidebar
- Dashboard
- Jobs
- Applications
- Users
- Payments
- Settings
- Logout

### Dashboard
- Users
- Jobs
- Applications
- Revenue

### Job Management
- Create Job
- Title
- Salary
- Province
- Category
- Deadline
- Description

### Manage Jobs
- Title
- Applications
- Status
- Actions: Edit, Delete, Pause, Feature

### Applications
- Applicant
- Job
- Status
- Actions: Review, Approve, Reject

### Payments
- User
- Amount
- Status

---

## 16. 🧩 Components
- `Navbar`
- `Footer`
- `Sidebar`
- `Button`
- `Input`
- `Modal`
- `Loader`
- `JobCard`
- `PaymentModal`
- `NotificationCard`
- `Pagination`

---

## 17. 🧠 State Management
- `authStore`
- `jobStore`
- `applicationStore`
- `paymentStore`
- `notificationStore`

---

## 18. 🔌 API Services
- `authService`
- `jobService`
- `applicationService`
- `paymentService`
- `userService`
- `adminService`

---

## 19. 📱 Responsive Design

### Must Support
- Android phones
- Tablets
- Desktop

### Rules
- Large buttons
- Mobile-first
- Lightweight UI

---

## 20. ⚡ Performance
- Lazy loading
- Code splitting
- Skeleton loaders
- Image optimization

---

## 21. 🔐 Security
- JWT authentication
- Protected routes
- Input validation
- XSS protection

---

## 22. 🎨 UI Style

### Colors
- White
- Dark Blue
- Red (CTA)

### Style
- Clean layout
- Rounded cards
- Soft shadows

---

## 23. 🎞 Animations
- Fade In
- Slide Up
- Hover Effects
- Transitions

---

## 24. 🚀 Development Phases

### Phase 1
- Setup + Layouts

### Phase 2
- Homepage + Auth

### Phase 3
- Jobs + Apply

### Phase 4
- Dashboard + Profile

### Phase 5
- Admin Panel

### Phase 6
- Optimization

### Final User Flow
1. Visit site
2. Browse jobs
3. Register/Login
4. Complete profile
5. Apply
6. Pay via M-Pesa
7. Track application

### Final Result
Frontend will be:
- Mobile optimized
- Fast on low-end devices
- Easy to use
- Secure
- Focused on job seekers
- Fully admin-controlled jobs
