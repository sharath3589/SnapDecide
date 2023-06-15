# SnapDecide60 ⚡

> Clarity within a snap - Make better decisions in 60 seconds

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-%3E%3D4.0-green)](https://www.mongodb.com)

## 📖 Overview

SnapDecide60 is a decision-making web application that helps you make clearer choices by giving you exactly 60 seconds to think through your decision. The time constraint helps you focus on what truly matters and prevents overthinking.

### How It Works

1. **Enter your decision** - Type in what you're trying to decide (e.g., "Should I buy this car?")
2. **60-second timer starts** - You have one minute to list pros and cons
3. **Review and decide** - See all your thoughts organized clearly
4. **Make your decision** - Choose confidently based on your analysis

## ✨ Features

- ⏱️ **60-second countdown timer** - Forces focused thinking
- ✅ **Pros & Cons lists** - Organized input during the timer
- 💾 **Save decisions** - Review past decisions anytime
- 📊 **Decision history** - Track your decision-making patterns
- 🎨 **Beautiful Material-UI interface** - Clean, modern design
- 📱 **Responsive design** - Works on desktop, tablet, and mobile
- 🔒 **Secure authentication** - Your decisions are private

## 🚀 Tech Stack

### Frontend
- **React 18** - UI library
- **Material-UI (MUI) v5** - Component library
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt** - Password hashing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14.0.0 or higher)
- **npm** or **yarn**
- **MongoDB** (v4.0 or higher) - Running locally or MongoDB Atlas account

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/sharath3589/SnapDecide.git
cd SnapDecide
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### 4. Environment Configuration

#### Backend (.env)

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/snapdecide
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

#### Frontend (.env)

Create a `.env` file in the `frontend` directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 5. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# macOS (with Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

## 🎯 Running the Application

### Development Mode

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

The application will open automatically at `http://localhost:3000`

### Production Build

**Build Frontend:**
```bash
cd frontend
npm run build
```

**Run Backend:**
```bash
cd backend
npm start
```

## 📁 Project Structure

```
SnapDecide/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   └── decisionController.js # Decision CRUD operations
│   ├── middleware/
│   │   └── auth.js               # JWT authentication middleware
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Decision.js           # Decision schema
│   ├── routes/
│   │   ├── auth.js               # Auth routes
│   │   └── decisions.js          # Decision routes
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js                 # Entry point
│
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.js
│   │   │   │   └── Register.js
│   │   │   ├── Decision/
│   │   │   │   ├── DecisionForm.js
│   │   │   │   ├── Timer.js
│   │   │   │   ├── ProsConsList.js
│   │   │   │   └── DecisionReview.js
│   │   │   ├── History/
│   │   │   │   ├── DecisionHistory.js
│   │   │   │   └── DecisionCard.js
│   │   │   ├── Layout/
│   │   │   │   ├── Navbar.js
│   │   │   │   └── Footer.js
│   │   │   └── PrivateRoute.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Dashboard.js
│   │   │   └── NotFound.js
│   │   ├── services/
│   │   │   └── api.js            # Axios instance
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── theme.js              # MUI theme configuration
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🎮 Usage Guide

### Making Your First Decision

1. **Sign up** for an account or **log in**
2. Click **"New Decision"** button
3. Enter your decision question (e.g., "Should I accept the job offer?")
4. Click **"Start Timer"**
5. You have 60 seconds to add:
   - **Pros** - Click the ➕ button under "Pros"
   - **Cons** - Click the ➕ button under "Cons"
6. When time runs out or you click **"Done Early"**, review your lists
7. Make your final decision and save it

### Viewing Decision History

- Navigate to **"My Decisions"** to see all past decisions
- Filter by date, decision type, or outcome
- Click on any decision to see full details

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Decisions
- `POST /api/decisions` - Create new decision
- `GET /api/decisions` - Get all user decisions
- `GET /api/decisions/:id` - Get single decision
- `PUT /api/decisions/:id` - Update decision
- `DELETE /api/decisions/:id` - Delete decision

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 🚢 Deployment

### Backend (Heroku)

```bash
cd backend
heroku create snapdecide-api
heroku config:set MONGODB_URI=your_mongodb_atlas_uri
heroku config:set JWT_SECRET=your_secret_key
git push heroku main
```

### Frontend (Vercel)

```bash
cd frontend
vercel --prod
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Sharath**
- GitHub: [@sharath3589](https://github.com/sharath3589)

## 🙏 Acknowledgments

- Inspired by the need for better decision-making tools
- Material-UI for the beautiful component library
- The MERN stack community

## 📧 Support

If you have any questions or need help, please open an issue or contact the maintainer.

---

**Made with ❤️ and ☕ by Sharath**
