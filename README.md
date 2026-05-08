# Talex - Canada Jobs Application Platform

A modern web application connecting Kenyan job seekers with Canadian employment opportunities. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Job Search & Matching**: Browse and apply for Canadian jobs tailored for Kenyan applicants
- **User Registration**: Secure account creation with Kenyan phone number support
- **Profile Management**: Complete and update user profiles
- **Application Tracking**: Monitor job application status
- **Contact Support**: Email support with subject and message forms
- **Issue Reporting**: Report problems with selectable categories
- **Responsive Design**: Optimized for desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom component library
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/talexrecruitmentinfo-art/talex.git
   cd talex
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
app/                    # Next.js app directory
├── (auth)/            # Authentication pages
├── dashboard/         # User dashboard
├── jobs/              # Job listings and details
├── contact/           # Contact page
├── report/            # Issue reporting
└── ...

components/            # Reusable UI components
├── ui/               # Basic UI elements
├── features/         # Feature-specific components
└── shared/           # Shared components (navbar, footer)

lib/                  # Utilities and API
services/             # Business logic services
store/                # State management
types/                # TypeScript type definitions
```

## API Integration

The frontend communicates with a backend API for data operations. See `BACKEND_GUIDE.md` for backend setup instructions.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Open a Pull Request

## License

This project is private and proprietary.

## Contact

For support, visit the [Contact page](http://localhost:3000/contact) or email talex.recruitment.info@gmail.com.
