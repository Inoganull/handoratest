# Handora

A minimal e-commerce store for handcrafted goods.
Built as a learning project using Node.js and React.

## Tech Stack

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- Cloudinary (image/video uploads)

**Frontend**
- React + Vite
- React Router DOM
- Axios

## Features

- Product listing page
- Product detail page with image gallery
- Admin upload page
- Shopping bag with quantity controls
- More coming soon...

## Getting Started

### Backend
cd backend
npm install
npm run dev

Runs on http://localhost:8000

### Frontend
cd frontend
npm install
npm run dev

Runs on http://localhost:5173

## Environment Variables

Create a `.env` file inside the `backend/` folder:

MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=8000

## Inspiration

UI inspired by [outfit.hellohello.is](https://outfit.hellohello.is/)