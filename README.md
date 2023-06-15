# SnapDecide60

> Clarity within a snap - Make better decisions in 60 seconds

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-%3E%3D4.0-green)](https://www.mongodb.com)

## Overview

SnapDecide60 is a decision-making web application that helps you make clearer choices by giving you exactly 60 seconds to think through your decision. The time constraint helps you focus on what truly matters and prevents overthinking.

### How It Works

1. Enter your decision question
2. 60-second timer starts - list pros and cons
3. Review your thoughts organized clearly
4. Make your final decision

## ✨ Features

- **60-second countdown timer** - Forces focused thinking without overthinking
- **Pros & Cons lists** - Organized input during the timer to structure your thoughts
- **Save decisions** - Review past decisions anytime to learn from your choices
- **Decision history** - Track your decision-making patterns over time
- **Beautiful Material-UI interface** - Clean, modern design that's easy to use
- **Responsive design** - Works seamlessly on desktop, tablet, and mobile
- **Secure authentication** - Your decisions are private and protected

## Tech Stack

**Frontend:** React 18, Material-UI v5, React Router v6, Axios, Context API

**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt

## Prerequisites

- Node.js v14.0.0 or higher
- npm or yarn
- MongoDB v4.0 or higher (local or MongoDB Atlas)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/sharath3589/SnapDecide.git
cd SnapDecide
```

### 2. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd ../frontend
npm install
```

### 3. Environment Configuration

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/snapdecide
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

Create a `.env` file in the `frontend` directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Start MongoDB

Make sure MongoDB is running:

```bash
# macOS (with Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

## Running the Application

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

The application will open at `http://localhost:3000`

### Production Build

Build the frontend:
```bash
cd frontend
npm run build
```

Run the backend:
```bash
cd backend
npm start
```

## API Endpoints

**Authentication:**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

**Decisions:**
- `POST /api/decisions` - Create new decision
- `GET /api/decisions` - Get all user decisions
- `GET /api/decisions/:id` - Get single decision
- `PUT /api/decisions/:id` - Update decision
- `DELETE /api/decisions/:id` - Delete decision

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

