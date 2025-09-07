# Music App

A modern micro-frontend music application built with React and Vite, featuring authentication and a comprehensive music library interface.

## 🎵 Features

- Secure login with role-based access (User/Admin)  
- Micro-frontend architecture with separate Music Library component  
- Modern responsive UI with Material-UI  
- Music browsing, filtering, and admin management  

## 🏗 Architecture

### Main App (main-app/)
- Port: 5175  
- Handles authentication, layout, and role-based routing  
- Integrates Music Library micro-frontend  

### Music Library (Music-Library/)
- Port: 5174  
- Standalone music browsing component  
- Admin-specific functionalities  

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)  
- npm or yarn  

### Installation
``bash
git clone <repository-url>
cd Music

# Install dependencies
cd main-app && npm install
cd ../Music-Library && npm install

# Start servers
# Terminal 1 - Music Library
cd Music-Library && npm run dev
# Terminal 2 - Main App
cd main-app && npm run dev


Access locally:

Main App: http://localhost:5175

Music Library: http://localhost:5174

Deployment

Main App: https://music-1n3p.vercel.app/

Music Library: https://music-kappa-woad.vercel.app/

🔐 Demo Credentials

Admin: admin@example.com / Admin123

User: user@example.com / User123

🧩 Micro-Frontend & Role-Based Auth

Micro-Frontend: Music Library is loaded dynamically into the main app using Module Federation, allowing independent deployment.

Role-Based Auth:

Users: Browse and filter music

Admins: Full management access

Permissions are enforced on both frontend UI and backend data access.

📱 Responsive Design

Optimized for desktop, tablet, and mobile devices.
