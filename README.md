# Shamazon eCommerce Web App

![Shamazon Logo](frontend/src/assets/amazon-logo-white.png)

A modern, Amazon-inspired eCommerce web application built with React, TypeScript, and Vite. Features a polished UI, robust navigation, authentication, cart/checkout, order history, and more.

---

## Features

- 🛒 **Cart & Checkout**: Add/remove items, select payment methods, and complete orders with a smooth, Amazon-like flow.
- 👤 **Authentication**: Sign up, sign in, and protected account pages with local user management.
- 🏠 **Account & Order History**: View past orders, clickable order items, and manage payment methods/addresses.
- 🗺️ **Navigation**: Breadcrumbs, clickable product cards, and a dynamic cart badge for seamless navigation.
- 🔔 **Toast Notifications**: Themed notifications for key actions (cart, checkout, account changes).
- 🖼️ **Product Pages**: Individual product pages with images, details, and links from all product cards.
- 🧭 **Modern UI/UX**: Responsive, accessible, and visually consistent design inspired by Amazon.

---

## Directory Structure

```
ecom-web-app/
  frontend/           # Main React app (source code, assets, configs)
  createRepo.sh       # Script to initialize and push repo to GitHub
  download-product-images.sh # Script to fetch product images
  README.md           # This file
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

---

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd ecom-web-app
   ```

2. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

## Running the App (Development)

```bash
cd frontend
npm run dev
```

- The app will be available at [http://localhost:5173](http://localhost:5173) by default.

---

## Building for Production

```bash
cd frontend
npm run build
```
- Output will be in `frontend/dist/`.

---

## Linting

```bash
cd frontend
npm run lint
```

---

## Custom Scripts

- **`createRepo.sh`**: Initialize and push a new repo to GitHub (requires [hub](https://github.com/github/hub)).
- **`download-product-images.sh`**: Download all product images for the app.

---

## Tech Stack

- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [ESLint](https://eslint.org/)

---

## Future Improvements

- Order details pages
- Product reviews & ratings
- Related products
- Backend/API integration
- Testing & CI
- PWA support

---

## License

MIT (or specify your license here)

