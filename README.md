# 🛍️ MB Fashion – Full-Stack E-Commerce Store

A modern, professional, and production-ready **Full-Stack E-Commerce Application** built using the **MERN Stack** (React.js, Node.js, Express, MongoDB) and styled with **Tailwind CSS**. 

This monorepo project features a clean architecture that allows you to manage and run both the Frontend client and the Backend API server concurrently with a single command. It is optimized for high performance, smooth UI/UX transitions, secure user sessions, and easy local onboarding.

---

## 🚀 Key Features

### 💻 Frontend (React & Tailwind CSS)
* **Responsive Layouts:** Seamless shopping experience optimized across mobile, tablet, and desktop viewports.
* **Smart Catalog & Navigation:** Multi-page browsing using **React Router DOM**, with robust category, subcategory, and bestseller filters.
* **Quick Search:** Live product search functionality to find matching items instantly.
* **Interactive Shopping Cart:** Real-time quantity updates and persistence across browser reloads.
* **Visual Notifications:** Instant, responsive toast alerts powered by **React Toastify** for actions like adding items to the cart, logins, and errors.

### ⚙️ Backend (Node.js, Express & MongoDB)
* **RESTful API:** Modular, clean API structure with controller-route separation.
* **Secure Authentication:** JSON Web Token (JWT) stateless sessions and **bcryptjs** password hashing.
* **MongoDB Integration:** Structured database schemas designed with **Mongoose** modeling.
* **Database Seeding:** A comprehensive script (`seed.js`) to instantly populate your MongoDB database with over 50 mock apparel items.
* **Concurrent Run Environment:** Developer-friendly scripts powered by `concurrently` to run both local servers side-by-side.

---

## 🛠️ Technology Stack

| Frontend | Backend & Database | Development Tools |
| :--- | :--- | :--- |
| **React.js** (v18.3) | **Node.js** | **Vite** (Next-gen frontend build tool) |
| **Tailwind CSS** | **Express.js** | **Concurrently** (Run frontend + backend together) |
| **React Router DOM** | **MongoDB Atlas / Local** | **Nodemon** (Auto-restart node server on changes) |
| **Axios** | **Mongoose** (ODM) | **ESLint** (Static code analysis) |
| **React Toastify** | **jsonwebtoken & bcryptjs** | **PostCSS & Autoprefixer** |

---

## 📂 Project Architecture

The codebase is organized as a unified monorepo for streamlined local setup:

```text
mbfashion/
├── backend/                  # Express REST API Server
│   ├── config/               # Database connection config
│   ├── controllers/          # Business logic handlers
│   ├── middleware/           # Route guards (Authentication)
│   ├── models/               # Mongoose database schemas
│   ├── routes/               # Express endpoint definitions
│   ├── seed.js               # Database population script
│   ├── server.js             # API entrypoint
│   └── .env.example          # Backend environment variables template
├── frontend/                 # Vite-React Single Page Application
│   ├── public/               # Static assets
│   ├── src/                  # Client-side source code
│   │   ├── assets/           # Images & styling assets
│   │   ├── components/       # Reusable UI components
│   │   ├── context/          # React Context API global state
│   │   ├── pages/            # View pages (Home, Collection, Cart, Login, etc.)
│   │   ├── main.jsx          # App renderer
│   │   └── App.jsx           # Main routing & wrapper
│   └── .env.example          # Frontend environment variables template
├── package.json              # Monorepo task orchestration
└── README.md                 # Project documentation
```

---

## 💻 Local Machine Setup & Import Guide

Follow these simple steps to import, configure, and boot the application on your local workspace:

### Prerequisites
Make sure you have the following installed on your machine:
* [Node.js](https://nodejs.org/) (v18.x or higher recommended)
* [MongoDB](https://www.mongodb.com/try/download/community) (Local server running or a free [MongoDB Atlas Cloud Database](https://www.mongodb.com/cloud/atlas) URI)
* Git

---

### Step 1: Clone the Repository
Open your terminal and run the following command to clone this repository to your local system:
```bash
git clone https://github.com/your-username/mbfashion.git
cd mbfashion
```

---

### Step 2: Install Dependencies
This project is configured to let you install dependencies for both frontend and backend instantly from the root folder:

1. **Install Root Orchestration Dependencies:**
   ```bash
   npm install
   ```
2. **Install Workspace Dependencies (Frontend & Backend):**
   ```bash
   npm run install-all
   ```

---

### Step 3: Configure Environment Variables
You will need to set up environment variable files for both the frontend and backend to communicate correctly.

#### 1. Backend Config
Navigate to the `backend` folder, duplicate the `.env.example` file, and name it `.env`:
* Windows: `copy backend\.env.example backend\.env`
* macOS/Linux: `cp backend/.env.example backend/.env`

Open `backend/.env` and update the keys:
```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string # E.g., mongodb://localhost:27017/mbfashion or Atlas cluster URL
JWT_SECRET=your_super_secure_jwt_secret_key_here
```

#### 2. Frontend Config
Navigate to the `frontend` folder, duplicate the `.env.example` file, and name it `.env`:
* Windows: `copy frontend\.env.example frontend\.env`
* macOS/Linux: `cp frontend/.env.example frontend/.env`

Open `frontend/.env` and verify the API endpoint:
```env
VITE_BACKEND_URL=http://localhost:4000
```

---

### Step 4: Seed the Database (Recommended)
Populate your database with the store's default product collection so you don't start with a blank UI. Run this command directly from the root folder:
```bash
npm run seed
```
*(This script connects to your MongoDB database, flushes any old records, and inserts 52 default fashion items with sizes, categories, and tags).*

---

### Step 5: Start the Development Server
You can boot both the backend and frontend servers concurrently with a single command run from the project root:
```bash
npm run dev
```

* **Frontend Client** will load at: `http://localhost:5173`
* **Backend API Server** will run at: `http://localhost:4000`

---

## 📡 API Endpoint Reference

Here is a summary of the available endpoints exposed by the backend:

### Auth Endpoints (`/api/user`)
* `POST /api/user/register` - Create a new customer profile.
* `POST /api/user/login` - Authenticate credentials and receive a JWT.

### Product Endpoints (`/api/product`)
* `GET /api/product/list` - Fetch all products.
* `POST /api/product/add` - Add a new product to the catalog.
* `POST /api/product/remove` - Delete a product by its ID.

### Shopping Cart Endpoints (`/api/cart`)
*(Requires `token` in header for authentication)*
* `POST /api/cart/get` - Fetch the authenticated user's current shopping cart.
* `POST /api/cart/add` - Add an item/size variant to the cart.
* `POST /api/cart/update` - Adjust the quantity of a cart item.
* `POST /api/cart/sync` - Bulk-sync locally cached guest carts with the server DB.

### Order Endpoints (`/api/order`)
*(Requires `token` in header for authentication)*
* `POST /api/order/place` - Place a new order with checkout details.
* `POST /api/order/userorders` - Retrieve historical order receipts for the logged-in customer.

---

## 📸 Application Showcase

### Home Page Showcase
<img width="1916" height="906" alt="Home Page" src="https://github.com/user-attachments/assets/8e9853c7-e4fe-44e7-b9bb-6ac4221cd927" />

### Category Collections
<img width="1912" height="902" alt="Collections" src="https://github.com/user-attachments/assets/071b4de4-ea1f-4ba6-838d-fcf32e86d7b3" />

### Dynamic Filters & Listings
<img width="1916" height="749" alt="Product Listing" src="https://github.com/user-attachments/assets/d817a2c9-1889-4480-a3be-7cbeefb952a5" />

### Detail Page
<img width="1909" height="811" alt="Product Details" src="https://github.com/user-attachments/assets/a24f8489-5f95-4833-a7db-3e12bccbc4ca" />

### Interactive Shopping Cart
<img width="1910" height="899" alt="Cart Page" src="https://github.com/user-attachments/assets/f91e64bb-3afc-4866-b899-c9b5d967e2e5" />

### Search Query Overlay
<img width="1919" height="905" alt="Search" src="https://github.com/user-attachments/assets/ae19ccfb-4af6-470d-8199-56e6313cc7d6" />

### User Portal
<img width="1914" height="900" alt="Login Page" src="https://github.com/user-attachments/assets/d741d4f4-a820-4b32-8a4f-a651ec28556e" />

### Responsive Framework Layouts
<p float="left">
  <img src="https://github.com/user-attachments/assets/4e110662-2b4a-4103-9192-83ac970b522d" width="32%" alt="Responsive UI" />
  <img src="https://github.com/user-attachments/assets/7686951e-26f0-4e9e-9d93-eb94a783314e" width="32%" alt="Mobile View" />
  <img src="https://github.com/user-attachments/assets/37433dfd-6804-4bd6-82b0-5ec18ebe924a" width="32%" alt="Tablet View" />
</p>

---

## 👨‍💻 Developer Information

* **Developer:** Mohan Badiger
* **Email:** [mohanbadiger250@gmail.com](mailto:mohanbadiger250@gmail.com)
* **Portfolio Website:** [mohanbadiger.site](https://mohanbadiger.site)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). Feel free to fork, modify, and distribute as needed!
