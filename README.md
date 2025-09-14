# SAARTHI 2025 - College Hackathon Portal

A comprehensive web application for managing college hackathon registrations, team formations, and submissions.

## Features

### ✅ Completed Features
- **Homepage** - Modern landing page with hackathon information
- **Authentication** - Google OAuth integration with Firebase Auth
- **User Registration** - Complete user profile setup
- **Team Formation System** - Advanced team creation and management
- **Team Invites** - Shareable invite links for team members
- **Member Validation** - Prevents duplicate team memberships
- **Leader Management** - Clear team leadership indicators
- **Responsive Design** - Works on all devices

### 🔄 In Progress
- Submission management system
- Results and judging interface
- Admin dashboard

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Authentication**: Firebase Auth (Google OAuth)
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **Deployment**: Vercel (recommended)

## Quick Start

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd hackathon-portal
```

### 2. Install Dependencies
```bash
npm install
# or
pnpm install
# or
yarn install
```

### 3. Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Google provider
   - Add your domain to authorized domains
4. Enable Firestore Database:
   - Go to Firestore Database
   - Create database in test mode
5. Get your configuration:
   - Go to Project Settings > General
   - Scroll to "Your apps" section
   - Add web app if not already added
   - Copy the config object

### 4. Environment Setup

1. Copy the example environment file:
```bash
cp env.example .env.local
```

2. Fill in your Firebase configuration in `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 5. Run the Development Server
```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Team Formation System

### Creating Teams
1. Users must complete registration first
2. Navigate to `/teams` page
3. Click "Create Team" button
4. Fill in team details:
   - Team name (unique)
   - Description
   - Maximum team size (2-4 members)
   - Team skills
   - Skills looking for
5. Add team members with their information:
   - Full name
   - Email address
   - Phone number
   - University/College
6. System validates:
   - No duplicate emails
   - Members not already in other teams
   - Team size limits

### Joining Teams
1. **Via Invite Link**: Share the generated invite link with teammates
2. **Via Browse**: Browse available teams and request to join
3. Members provide their information during join process
4. System automatically updates team status when full

### Team Management
- **Leader Indicators**: Crown icon shows team leader
- **Member Details**: Complete contact information for all members
- **Team Status**: Open, Full, or Closed
- **Validation**: Prevents duplicate memberships and invalid data

## Database Structure

### Collections

#### `users`
```typescript
{
  uid: string
  email: string
  fullName: string
  phone: string
  university: string
  registrationComplete: boolean
  createdAt: string
}
```

#### `teams`
```typescript
{
  id: string
  teamName: string
  leaderId: string
  leaderName: string
  members: string[]
  memberDetails: TeamMember[]
  maxMembers: number
  description?: string
  skills?: string[]
  lookingFor?: string[]
  status: "open" | "full" | "closed"
  inviteCode: string
  createdAt: string
}
```

#### `TeamMember`
```typescript
{
  uid: string
  fullName: string
  email: string
  phone: string
  university: string
  isLeader: boolean
}
```

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ for SAARTHI 2025**


