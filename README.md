# Theater Management Application

This project is a theater management application with separate frontend and backend components. Follow the steps below to set up and run the application.

## Project Structure

- **frontend**: The React-based frontend.
- **backend**: The Node.js-based backend.

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/souravmenon1999/theaterManagementApplication.git
cd theaterManagementApplication
```
### 2. Setup Environment Variables Backend
     Navigate to the backend folder:

```bash
cd backend

```

Create a .env file and set the following environment variables with dummy or your actual values:

env

```bash
Copy code
EMAIL_USER=
EMAIL_PASS=
EMAIL_FROM=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
```

### 3. Run the backend and frontend seperatly by commands

for backend

``` bash

cd backend
nodemon start

```

for frontend

```bash

cd frontend
npm run dev

```



