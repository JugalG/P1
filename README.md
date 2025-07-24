# 🛍️ Next.js E-Commerce App with Redux, JSON-Server & Authentication

This is a minimal e-commerce frontend built using **Next.js (App Router)**, **Redux**, and a **mock JSON server** backend.  
It includes features like user login, session-based homepage authentication, product listings, cart functionality, and a quick view modal.


## 🔧 Tech Stack

- ⚛️ React + Next.js (App Router)
- 🛠️ Redux (for cart state management)
- 📦 json-server (mock backend for users, products, and cart data)
- 🍪 Cookie + sessionStorage-based login session
- 🧪 Jest & React Testing Library for unit tests

## 📁 Project Structure

/app
/login          # Login page with form and auth redirect
/homepage       # Authenticated homepage with products
/product/\[id]   # Dynamic product detail page
/components     # UI components (e.g., ProductCard, QuickViewModal)
/features       # Redux slices (cart, auth)
/api            # API routes (login, logout, session)
/utils          # Helper functions
/public
/db.json          # JSON-server data (users, user-data, products)

## 🚀 Features

- ✅ Login with mocked credentials (from `db.json`)
- ✅ Session + cookie validation across routes
- ✅ Product grid from mock data
- ✅ Add to cart / remove / quantity updates using Redux
- ✅ Quick view modal for product preview
- ✅ Route protection: homepage redirects to `/login` if not authenticated
- ✅ Server-side rendering (SSR) for dynamic routes
- ✅ Unit tests for login and component behaviors


## 🖥️ Getting Started

### 1️⃣ Clone & Install

git clone https://github.com/JugalG/P1.git
cd Repo_file-Name

# Install dependencies
cd P1 && npm install 
cd json-server && npm install

### 2️⃣ Start JSON Server (mock backend)

npx json-server --watch db.json --port 8000

This will expose:

* `http://localhost:8000/users`
* `http://localhost:8000/user-data`
* `http://localhost:8000/products`

### 3️⃣ Run Next.js App

cd P1 && npm run dev

App will be available at:
📍 `http://localhost:3000`

## 🔒 Authentication Flow

* On login, the app:

  * Validates credentials from `db.json`
  * Stores cookie (`auth-token`) + `sessionStorage.userSession`
* On protected routes (like `/homepage`), it:

  * Compares `auth-token` cookie with `sessionStorage.userSession.user.id`
  * If mismatch or missing, logs out the user and redirects to `/login`

## 🧪 Running Tests

npm run test

This runs Jest with `jsdom`, testing:

* Login flow
* Redux cart behavior
* QuickViewModal buttons and modal control

## 📦 Example `db.json`

{
  "users": [
    { "id": 1, "email": "test@example.com", "password": "123456" }
  ],
  "user-data": [
    { "id": 1, "cart": [] }
  ],
  "products": [
    {
      "id": 1,
      "name": "T-shirt",
      "price": 499,
      "image": "/images/tshirt.png",
      "description": "Soft cotton tee"
    }
  ]
}

## 🧠 Known Issues

* ❗ Hydration errors may occur if client-only data is used too early — this is mitigated using `useEffect` and conditional rendering.
* ❗ `node_modules` modules using ESM may cause Jest issues — consider adding transforms in `jest.config.js`.


## 📃 License

MIT License

## 👤 Author

Made with ❤️ by [Jugal Ghia & Dhiraj Jadhav]


