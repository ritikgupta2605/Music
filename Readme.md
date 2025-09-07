# Music App

A modern micro-frontend music application built with React and Vite, featuring authentication and a comprehensive music library interface.

## 🎵 Features

- *Authentication System*: Secure login with role-based access (User/Admin)
- *Micro-Frontend Architecture*: Modular design with separate Music Library component
- *Modern UI*: Built with Material-UI for a sleek, responsive interface
- *Music Library*: Browse and manage music with filtering capabilities
- *Role-Based Access*: Different permissions for users and administrators

## 🏗 Architecture

This project uses a micro-frontend architecture with two main applications:

### Main App (main-app/)
- *Port*: 5175
- *Purpose*: Authentication and main application shell
- *Features*:
  - User authentication and login
  - Role-based access control
  - Main navigation and layout
  - Integration with Music Library micro-frontend

### Music Library (Music-Library/)
- *Port*: 5174
- *Purpose*: Music library management component
- *Features*:
  - Music browsing and filtering
  - Song grid display
  - Admin-specific functionality

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. *Clone the repository*
   bash
   git clone <repository-url>
   cd Music
   

2. *Install dependencies for both applications*
   bash
   # Install main-app dependencies
   cd main-app
   npm install
   
   # Install Music-Library dependencies
   cd ../Music-Library
   npm install
   

3. *Start the development servers*

   *Option 1: Use the provided PowerShell script (Windows)*
   powershell
   .\start-dev.ps1
   

   *Option 2: Start manually*
   bash
   # Terminal 1 - Start Music Library (port 5174)
   cd Music-Library
   npm run dev
   
   # Terminal 2 - Start Main App (port 5175)
   cd main-app
   npm run dev
   

4. *Access the application*
   - Main App: http://localhost:5175
   - Music Library: http://localhost:5174

## 🛠 Development

### Available Scripts

Both applications support the following npm scripts:

- npm run dev - Start development server
- npm run build - Build for production
- npm run preview - Preview production build
- npm run lint - Run ESLint

### Project Structure


Music/
├── main-app/                 # Main application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── contexts/        # React contexts (Auth)
│   │   └── App.jsx          # Main app component
│   ├── package.json
│   └── vite.config.js
├── Music-Library/           # Music library micro-frontend
│   ├── src/
│   │   ├── components/      # Music-related components
│   │   ├── contexts/        # Music context
│   │   ├── data/           # Mock data
│   │   └── MusicLibrary.jsx # Main library component
│   ├── package.json
│   └── vite.config.js
└── start-dev.ps1           # Development startup script


## 🔧 Technology Stack

- *Frontend Framework*: React 18
- *Build Tool*: Vite
- *UI Library*: Material-UI (MUI)
- *Styling*: Emotion
- *Micro-Frontend*: Module Federation
- *Linting*: ESLint

## 🎨 UI Components

- *LoginPage*: User authentication interface
- *MusicLibraryComponent*: Main music browsing interface
- *FilterControls*: Music filtering and search
- *GridSongCard*: Individual song display cards

## 🔐 Authentication

The application includes a role-based authentication system:
- *Users*: Standard access to music library
- *Admins*: Enhanced permissions and additional features

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add some amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Troubleshooting

### Common Issues

1. *Port conflicts*: Ensure ports 5174 and 5175 are available
2. *Module federation errors*: Make sure both applications are running
3. *Authentication issues*: Check browser console for error messages

### Development Tips

- Use the provided start-dev.ps1 script for easy development setup
- Check browser developer tools for debugging micro-frontend communication
- Ensure both applications are running before testing integration features

## 📞 Support

For support and questions, please open an issue in the repository or contact the development team.