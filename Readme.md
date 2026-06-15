# TaskPad Backend

The robust Node.js/Express API powering **TaskPad**, a collaborative Kanban board and task management platform.

Frontend Repository: [Raghav1825/TaskPad](https://github.com/Raghav1825/TaskPad)

---

## 🚀 Features

- **User Authentication**: Secure JWT-based registration, login, logout, and token refresh mechanisms using HTTP-only cookies.
- **Profile Management**: Profile image upload support integrated with **Multer** and **Cloudinary**.
- **Project Workspaces**: Collaborate with teams by creating projects, updating project settings, and managing workspace members.
- **Kanban Tasks**: Core task tracking operations including task assignment and status updates (To Do, In Progress, Done).
- **Daily Agenda**: Task tracking scoped to individual daily agendas.

## 🛠️ Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/) (ES Modules)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **File Storage**: [Cloudinary](https://cloudinary.com/) (handled via [Multer](https://github.com/expressjs/multer))
- **Security**: [bcrypt](https://github.com/kelektiv/node.bcrypt.js) for password hashing & [JSON Web Tokens (JWT)](https://jwt.io/) for authorization

---

## 🛤️ API Endpoints

### 👤 Users (`/api/v1/users`)
- `POST /register` - Register a new user with profile picture
- `POST /login` - Log in user & retrieve cookies/tokens
- `POST /logout` - Log out current user *(Auth Required)*
- `POST /refresh-token` - Refresh expired access token
- `GET /current-user` - Retrieve authenticated user info *(Auth Required)*
- `PATCH /update-account-details` - Update account details *(Auth Required)*
- `PATCH /update-profile-image` - Update profile picture *(Auth Required)*
- `PATCH /change-password` - Change account password *(Auth Required)*
- `DELETE /delete-account` - Delete user account *(Auth Required)*
- `GET /:id` - Get user by ID *(Auth Required)*

### 📁 Projects (`/api/v1/projects`) *(All require authentication)*
- `POST /create-project` - Create a new project workspace
- `PATCH /edit-project-details/:projectId` - Edit project metadata
- `PATCH /edit-project-status/:projectId` - Update project workflow status
- `DELETE /delete-project/:projectId` - Delete project
- `GET /get-project-details/:projectId` - Get project details & collaborators
- `POST /add-project-members/:projectId` - Add members to project
- `DELETE /delete-project-member/:projectId` - Remove member from project
- `GET /all-projects` - Get all projects associated with the user
- `GET /member-projects` - Get projects where user is a member
- `GET /owner-projects` - Get projects owned by user

### 📝 Project Tasks (`/api/v1/projectTasks`) *(All require authentication)*
- `POST /create-task/:projectId` - Create task under a project
- `PATCH /update-task-status/:taskId` - Update task status (To Do / In Progress / Done)
- `GET /get-project-tasks/:projectId` - Fetch all tasks for a project
- `PATCH /edit-project-task/:taskId` - Edit task details
- `DELETE /delete-project-task/:taskId` - Delete task

### 📅 Daily Tasks (`/api/v1/dailyTasks`) *(All require authentication)*
- `POST /add-task` - Create daily task
- `PATCH /edit-task/:taskId` - Edit daily task details
- `PATCH /edit-task-date/:taskId` - Reschedule daily task date
- `DELETE /delete-task/:taskId` - Delete daily task
- `GET /today` - Get tasks due today
- `GET /all-tasks` - Get all daily tasks
- `PATCH /edit-task-status/:taskId` - Toggle daily task status

---

👤 **Author**: Raghav Arora

