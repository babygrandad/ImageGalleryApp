# Image Gallery Application

## 1. Introduction

### 1.1. Project Overview
Image Gallery App is a web-based image-sharing platform where users can upload, share, and interact with images. The application allows users to create an account, upload images, and engage with other users through likes and comments. It serves as a community-driven space for sharing creativity and visual content.

## 2. Project Architecture

### 2.1. Project Technologies
- **Backend Technologies:** ASP.Net Core
- **Frontend Technologies:** Vite + React Js
- **Database Technology:** Microsoft SQL Server
- **Cloud Storage:** Imgbb.com

### 2.2. Database Diagram
The project requires a comprehensive set of tables to support the application's features. Below is an example of the Entity-Relationship Diagram (ERD).

## 3. Technologies

### 3.1. Front-end Technologies
React was utilized for front-end development, incorporating the following React packages:
- "axios": "^1.7.2"
- "exifreader": "^4.23.3"
- "react-dropzone": "^14.2.3"
- "react-infinite-scroll-component": "^6.1.0"
- "react-router-dom": "^6.24.0"
- "react-token-auth": "^2.3.8"

### 3.2. Back-end Technologies
ASP.NET Core, along with Entity Framework Core and ASP.NET Core Identity, was used for the back-end.

### 3.3. Database
Microsoft SQL Server 2019 was selected as the database of choice.

### 3.4. Cloud Storage
IMGBB.com was chosen for cloud storage of images due to its high availability, fast performance, and free pricing model. The API offers easy image management.

### 3.5. Authentication
JSON Web Token (JWT) was used for authentication and authorization, offering secure, stateless communication between client and server.

### 3.6. API Testing
Swagger was primarily used for API testing, complemented occasionally by Postman.

## 4. Development Environment

### 4.1. Prerequisites

#### 4.1.1. Prerequisites For Back-end
- .NET SDK (version 8.0+)
- Visual Studio 2019+ (or Visual Studio Code with C# extensions)
- Microsoft SQL Server
- Mailhog Email Server

#### 4.1.2. Prerequisites For Front-end
- Node.js
- NPM

### 4.2. Running the Local Development Environment

#### 4.2.1. Setup For Back-end
1. Clone the git repository.
2. Navigate to the directory named “api” and open it using Visual Studio, VS Code, or your terminal of choice.
3. Run `dotnet restore` to download and install all the NuGet packages.
4. Configure the connection string in the `appsettings.json` file.
5. Run the database migration: `dotnet ef migrations add <MigrationName>`.
6. Update your database: `dotnet ef database update`.
7. Run the application: `dotnet watch run`.
8. Run the Mailhog server to handle email tasks.

#### 4.2.2. Setup For Front-end
1. Clone the git repository.
2. Navigate to the "image_gallery_app_frontend" directory.
3. Run `npm install` to install all node packages.
4. Start the application: `npm run dev`.

## 5. API Endpoints

### 5.1. Account Endpoints
- **Register [POST]:** `api/account/register`
- **Login [POST]:** `api/account/login`
- **Logout [GET]:** `api/account/logout`
- **Forgot Password [POST]:** `api/account/forgotpassword`
- **Change Password [POST]:** `api/account/changepassword`
- **Reset Password [POST]:** `api/account/resetpassword`
- **Confirm Email [GET]:** `api/account/confirmemail`

### 5.2. Category Endpoints
- **Get Category [GET]:** `api/category`

### 5.3. Comment Endpoints
- **Create Comment [POST]:** `api/comment/{ImageId}`
- **Get Comment [GET]:** `api/comment/{commentId}`
- **Update Comment [PATCH]:** `api/comment/{commentId}`
- **Delete Comment [DELETE]:** `api/comment/{commentId}`

### 5.4. Image Endpoints
- **Get Images [GET]:** `api/image`
- **Post Image [POST]:** `api/image`
- **Get My Images [GET]:** `api/image/mylibrary`
- **Get Image by ID [GET]:** `api/image/{imageId}`
- **Update Image Details [PATCH]:** `api/image/{imageId}`
- **Delete Image [DELETE]:** `api/image/{imageId}`

### 5.5. Like Endpoint
- **Toggle Like [POST]:** `api/likes/{imageId}`

## 6. App Use

### 6.1. User Authentication and Account Management
Users can register, log in, reset their password, and manage their accounts securely using JWT tokens.

### 6.2. Image Browsing and Interaction
- **Homepage / Gallery:** Users can scroll through a gallery of images, filter them by category, and use infinite scroll.
- **Image Upload:** Users can post images from their device and view them in the public gallery or personal library.
- **Personal Image Library:** Users can manage their uploaded images.
- **Detailed Image View:** Users can interact with images by liking or commenting on them.

### 6.3. Comments and Feedback
Users can leave, edit, or delete comments on images.

### 6.4. Liking System
Users can like or unlike images, and view real-time feedback on the number of likes.

---

For more information, see the [Documentation](./Documentation/IGA%20Documentaion.pdf).
