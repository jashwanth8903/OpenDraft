# OpenDraft Blog App

🌐 **Live Demo:** [https://open-draft.vercel.app/](https://open-draft.vercel.app/)

OpenDraft is a modern, full-stack MERN (MongoDB, Express, React, Node.js) blog application designed for seamless content creation, sharing, and community engagement. Built with a focus on performance, security, and user experience, OpenDraft enables users and authors to publish articles, comment, and interact in a professional, responsive environment.

## Features

- **User & Author Registration/Login:** Secure authentication for both users and authors.
- **Article Management:** Authors can create, edit, delete, and restore articles with rich content support.
- **Live Comments:** Real-time comment updates for engaging discussions.
- **Responsive UI:** Modern, mobile-friendly design with a unified color palette and professional layout.
- **Role-Based Access:** Separate dashboards and privileges for users and authors.
- **Input Validation:** Robust validation for all forms (login, register, article, comment, etc.).
- **API Security:** CORS configured for secure cross-origin requests.
- **Environment Config:** All sensitive URLs and keys managed via environment variables.
- **Deployment Ready:** Optimized for deployment on Vercel (frontend and backend separated).

## Tech Stack
- **Frontend:** React, React Router, Axios, CSS (custom & modular)
- **Backend:** Node.js, Express, MongoDB, JWT, CORS
- **Database:** MongoDB Atlas
- **Deployment:** Vercel (recommended), Render, or similar

## Getting Started

### Prerequisites
- Node.js & npm
- MongoDB Atlas account

### Installation
1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd Blog-app
   ```
2. **Install dependencies:**
   ```sh
   cd backend && npm install
   cd ../client && npm install
   ```
3. **Configure environment variables:**
   - In `backend/.env`, set:
     ```
     PORT=4000
     DB_URL=<your-mongodb-connection-string>
     SECRET_KEY=<your-secret-key>
     FRONTEND_URL=<your-frontend-url>
     ```
   - In `client/.env`, set:
     ```
     REACT_APP_BACKEND_URL=<your-backend-url>
     ```
4. **Run locally:**
   - Backend: `npm start` (from `backend`)
   - Frontend: `npm start` (from `client`)

## Deployment
- Deploy the frontend and backend separately (recommended for Vercel).
- Ensure all environment variables are set in the Vercel dashboard for both projects.
- For more, see the deployment section in this README or your platform's documentation.

## Folder Structure
```
Blog-app/
  backend/
    APIs/
    .env
    server.js
    ...
  client/
    src/
    public/
    .env
    ...
```

## Contributing
Contributions are welcome! Please fork the repo and submit a pull request.

## License
This project is licensed under the MIT License.

---
**OpenDraft** — Your professional platform for sharing knowledge and ideas.
