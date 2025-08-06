# TestOps Dashboard Tests

**TestOps Dashboard Tests** is a comprehensive test management and visualization platform that combines automated testing with real-time dashboards. It helps QA and DevOps teams monitor, analyze, and report on testing pipelines with a modern, responsive web interface. Built with a modular architecture including a Node.js backend, TypeScript-powered frontend, and automation powered by Playwright.

---

## Project Overview

This project provides a **centralized dashboard** for visualizing test execution results, tracking trends over time, and managing test workflows. It features a responsive web interface with real-time test data, comprehensive reporting, and seamless integration into CI/CD pipelines. The platform supports both **API and GUI testing** using Playwright with detailed result visualization.

---

## Key Features

### 🚀 **Core Functionality**
- **Real-time Test Dashboard** with responsive card-based layout
- **Test Execution Management** - trigger, monitor, and analyze test runs
- **Comprehensive Reporting** with aggregate statistics and trend analysis
- **Interactive Data Visualization** using Observable Plot charts
- **RESTful API** for test data management and integration

### 🎨 **Modern UI/UX**
- **Responsive Design** - mobile-first approach with desktop enhancements
- **Hamburger Menu Navigation** - collapsible sidebar with smooth animations
- **Dark/Light Theme Support** with system preference detection
- **Real-time Status Updates** with color-coded test result indicators
- **Clean, Intuitive Interface** with modular component architecture

### 🔧 **Technical Features**
- **Full TypeScript Implementation** for type safety and maintainability
- **SQLite Database** for persistent test result storage
- **Modular Architecture** following SOLID principles
- **Automated GUI and API Testing** with Playwright
- **Hot Reload Development** via nodemon and TypeScript watch mode
- **Code Quality Tools** - Prettier formatting and consistent styling
- **Integration Ready** - Allure reporting, CI/CD pipeline support

---

## Tech Stack

### 🖥️ **Backend** (`backend/`)
- **Node.js** with Express 5
- **TypeScript** for type safety
- **SQLite3** for data persistence
- **CORS** for cross-origin requests
- **Nodemon** for development hot reload

### 🌐 **Frontend** (`frontend/`)
- **TypeScript** with ES Modules
- **Observable Plot** for data visualization
- **Modern CSS** with Grid and Flexbox layouts
- **Responsive Design** with mobile-first approach
- **Theme System** with dark/light mode support

### 🧪 **Testing & Tools**
- **Playwright** (`@playwright/test`) for E2E testing
- **Allure** integration for test reporting
- **TypeScript Compiler** (tsc) for build pipeline
- **Prettier** for code formatting
- **Concurrently** for parallel script execution

### 📁 **Project Structure**
```
testops-dashboard-tests/
├── backend/                    # Server-side application
│   ├── app/
│   │   ├── controllers/        # API route handlers
│   │   ├── config/            # Database configuration
│   │   ├── routes/            # Express route definitions
│   │   ├── utils/             # Helper functions
│   │   └── index.ts           # Main server entry point
│   ├── dist/                  # Compiled JavaScript output
│   └── package.json           # Backend dependencies
├── frontend/                   # Client-side application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── views/             # Page-specific logic
│   │   ├── utils/             # Client utilities (theme, sidebar)
│   │   └── main.ts            # Frontend entry point
│   ├── dist/                  # Compiled frontend + static files
│   └── package.json           # Frontend dependencies
├── tests/                     # Playwright test suites
├── allure-results/            # Test execution results
└── utils/                     # Shared utilities
```

---

## 🚀 Quick Start Guide

### **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn package manager

### **1. Install Dependencies**
```bash
# Install all dependencies (root, backend, frontend)
npm run install:all
```

### **2. Start the Application**
```bash
# Start backend server and build frontend
npm run start:full
```
**OR run separately:**
```bash
# Terminal 1: Start backend server (http://localhost:3000)
npm run start:backend

# Terminal 2: Build frontend (compiles TypeScript)
npm run build:frontend
```

### **3. Access the Dashboard**
- Open your browser to: **http://localhost:3000**
- The backend serves both API endpoints and static frontend files
- Navigate through different sections using the responsive sidebar menu

---

## 🧪 Testing with Playwright

Playwright is used for comprehensive end-to-end testing of both API endpoints and GUI functionality. Tests are organized in the `tests/` directory and can be run locally or integrated with CI pipelines.

### **Run Tests**
```bash
# Run all tests (headless mode)
npm test

# Run tests with browser UI visible
npm run test:headed

# Interactive test development mode
npm run test:ui
```

### **Generate Allure Reports**
```bash
# After running tests, generate Allure report
allure generate allure-results --clean -o allure-report
allure open allure-report
```

---

## 🛠️ Development Workflow

### **Making Changes**

#### **Backend Development:**
```bash
cd backend
npm run dev          # Start with hot reload
# Edit files in backend/app/
# Server automatically restarts on changes
```

#### **Frontend Development:**
```bash
cd frontend
npm run watch        # Start TypeScript watch mode
# Edit files in frontend/src/
# Refresh browser to see changes
```

### **Build for Production**
```bash
# Build frontend TypeScript
npm run build:frontend

# Build backend TypeScript
cd backend && npm run build

# Start production server
cd backend && npm start
```

### **Key Development Commands**
```bash
# Root level commands
npm run install:all     # Install all dependencies
npm run start:full      # Start backend + build frontend
npm test               # Run Playwright tests

# Backend commands (run from backend/)
npm run dev            # Development with hot reload
npm run build          # Compile TypeScript
npm start             # Start production server

# Frontend commands (run from frontend/)
npm run build         # Compile TypeScript once
npm run watch         # Watch mode for development
```

---

## 📖 Application Features

### **Dashboard Pages**
- **Main Dashboard** (`/`) - Overview of recent test runs with status cards
- **Test Runs** (`/tests.html`) - Detailed list of all test executions
- **Data Visualization** (`/data_visualization.html`) - Charts and trend analysis
- **Reports** (`/reports.html`) - Aggregate statistics and summaries
- **Settings** (`/settings.html`) - Theme toggle and configuration
- **Login** (`/login.html`) - Authentication interface (UI demo)

### **API Endpoints**
- `GET /api/tests` - Retrieve all test results
- `GET /api/tests/:id` - Get specific test details
- `POST /api/tests` - Trigger new test execution

### **Responsive Design**
- **Mobile-First** approach with progressive enhancement
- **Hamburger Menu** for collapsible navigation on smaller screens
- **CSS Grid** layouts for optimal content organization
- **Dark/Light Theme** with automatic system preference detection

---

## 🔧 Technical Architecture

### **Backend Architecture**
- **Express.js** server with TypeScript
- **SQLite** database with abstraction layer
- **RESTful API** design with proper error handling
- **CORS** enabled for cross-origin requests
- **Static file serving** for frontend assets

### **Frontend Architecture**
- **TypeScript modules** with ES6 imports
- **Component-based** UI with reusable elements
- **View-based routing** for different pages
- **Utility modules** for theme and navigation management
- **Observable Plot** integration for data visualization

### **Data Flow**
1. Frontend makes API calls to backend endpoints
2. Backend processes requests and interacts with SQLite database
3. Results are returned as JSON and rendered in the UI
4. Real-time updates through manual refresh (can be enhanced with WebSockets)

---

## 🎯 Future Enhancements

- **Real-time WebSocket** updates for live test monitoring
- **User Authentication** and role-based access control
- **Advanced Filtering** and search capabilities
- **Webhook Integration** for external CI/CD systems
- **Performance Metrics** and historical trend analysis
- **Test Suite Management** and scheduling
- **Email/Slack Notifications** for test results

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Make your changes following the existing code style
4. Run tests to ensure functionality (`npm test`)
5. Commit your changes (`git commit -am 'Add new feature'`)
6. Push to the branch (`git push origin feature/new-feature`)
7. Create a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.