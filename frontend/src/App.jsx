import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import AdminPage from './pages/AdminPage'
import BagPage from './pages/BagPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/admin"     element={<AdminPage />} />
        <Route path="/bag"       element={<BagPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App