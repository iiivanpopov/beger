# 💻 Beger - Board Management System

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=white)
![Hono](https://img.shields.io/badge/Hono-v4-E36002?style=flat&logo=hono&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-v1-FBF0DF?style=flat&logo=bun&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=flat&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat&logo=docker&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)

> A modern, full-stack application for managing boards with user authentication, repairs tracking, and test results management. Features a React 19 frontend and blazing-fast Hono backend powered by Bun.

## ⚡ Quick Start

```bash
git clone https://github.com/iiivanpopov/beger.git
cd beger

cp .env.example .env # Then config

docker-compose build
docker-compose up -d
```

## 🚀 Features

- 🔐 **JWT Authentication** - Secure user authentication with access/refresh tokens
- 👥 **Role-Based Access Control** - Admin and user roles with different permissions
- 🔧 **Repairs Management** - Track and manage board repairs
- 📊 **Test Results** - Record and monitor test results
- 📋 **Google Sheets Integration** - Import data directly from Google Sheets
- 🎨 **Modern UI** - Beautiful and responsive interface with React 19
- ⚡ **High Performance** - Built with Bun for exceptional speed
- 🐳 **Docker Ready** - Easy deployment with Docker Compose

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://www.docker.com/get-started)
- [Git](https://git-scm.com/downloads)

## ⚙️ Tech Stack

### 📱 Frontend

**Framework**: React v19 ⚛️

- [Tanstack Router](https://tanstack.com/router/latest) - File-based routing solution
- [Ky](https://github.com/sindresorhus/ky) - Elegant HTTP client with a convenient API
- [Tanstack Query](https://tanstack.com/query/latest) - Powerful server state management for data fetching
- [React Hook Form](https://react-hook-form.com/) - Performant form state management
- [Valibot](https://valibot.dev/) - Lightweight validation library (Zod alternative)

### 🔒 Backend

**Framework**: Hono v4 🔥

- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript-first ORM for type safety
- [Valibot](https://valibot.dev/) - Request validation
- [Bun](https://bun.com/) - Ultra-fast JavaScript runtime with built-in PostgreSQL and Redis drivers

### 🗄️ Database

- **PostgreSQL** - Primary database
- **Redis** - Caching and session management

### 🔧 Development Tools

- [ESLint](https://eslint.org/) - Code linting with [@antfu/eslint-config](https://github.com/antfu/eslint-config)
- [Stylelint](https://stylelint.io/) - CSS/Style linting
- [@yelaiii/stylelint](https://github.com/iiivanpopov/stylelint-config) - My Custom Stylelint configuration

## 📦 Installation (Docker Compose)

### 1. Clone the Repository

```bash
git clone https://github.com/iiivanpopov/beger.git
cd beger
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```dotenv
# Server Configuration
PORT=5333                                           # Backend port

JWT_ACCESS_SECRET=c9e5fd5df58770fea7063ebad0c78d6c  # Generate new secret for production
JWT_REFRESH_SECRET=2d03a2683014ad790487149e73d97bc2 # Generate new secret for production

# Admin Credentials
ADMIN_PASSWORD=                                     # Set a strong admin password

# Database Configuration
DB_USER=postgres                                    # PostgreSQL username
DB_PASSWORD=postgres                                # PostgreSQL password (change in production!)

# Google Sheets Integration
SHEET_URL=""                                        # Your Google Sheet CSV URL (in quotes)
```

> The default JWT secrets shown above are for development only. Generate strong, random secrets using:
>
> ```bash
> openssl rand -hex 32
> ```

📝 **Note**: The `SHEET_URL` must be enclosed in **double quotes**

#### 2.1 Custom Port Configuration (Optional)

If you need to use a different backend port, update both files:

**`.env`:**

```dotenv
PORT=4111  # Your custom port
```

**`apps/frontend/nginx.conf`:**

```conf
location /api/ {
  proxy_pass http://backend:4111/api/;
  # ... rest of configuration
}
```

### 3. Build the Project

```bash
docker-compose build
```

### 4. Start the Application

```bash
docker-compose up
```

Or run in detached mode:

```bash
docker-compose up -d
```

The application will be available at:

- **Frontend**: <http://localhost> (port 80)
- **Backend API**: <http://localhost:5333/api> (or your custom port)

## 🔄 Updating the Application

When new updates are available:

```bash
docker-compose down

git pull

docker-compose build

docker-compose up -d
```

## 📊 Google Sheets Integration Setup

The application supports importing data from Google Sheets. Here's how to set it up:

### Step 1: Prepare Your Sheet

Ensure your Google Sheet has the exact column headers as shown:

![Proper Format](/assets/proper-format.png)

### Step 2: Publish to Web

1. Open your sheet in **Google Sheets**
2. Go to **File → Share → Publish to web**
3. In the modal, select **CSV (Comma-Separated Values)** format (not "Web Page")
4. Click **Publish** and copy the generated URL

![Get Sheet URL](/assets/get-sheet-url.png)

### Step 3: Add to Environment

Add the CSV URL to your `.env` file (remember to use quotes):

```dotenv
SHEET_URL="https://docs.google.com/spreadsheets/d/e/YOUR_SHEET_ID/pub?output=csv"
```

## 📁 Project Structure

```bash
beger/
├── apps/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── modules/    # Feature modules
│   │   │   ├── database/   # Database schemas & migrations
│   │   │   ├── middleware/
│   │   │   └── utils/
│   │   └── drizzle/        # Database migrations
│   └── frontend/
│       ├── src/
│       │   ├── api/        # API hooks & requests
│       │   ├── routes/     # Tanstack Router routes
│       │   ├── pages/      # Page components
│       │   ├── components/ # Business components
│       │   └── shared/     # UI-Kit, hooks, utils
├── assets/
├── docker-compose.yml
└── .env
```
