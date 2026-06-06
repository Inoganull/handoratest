import { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'

function HomePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/products`)
      .then(res => {
        setProducts(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  return (
    <div>
      <Navbar />

      <main style={styles.main}>

        {/* Page Title */}
        <div style={styles.header}>
          <h1 style={styles.title}>Shop</h1>
          <p style={styles.count}>{products.length} products</p>
        </div>

        {/* Loading State */}
        {loading && (
          <p style={styles.message}>Loading...</p>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <p style={styles.message}>No products yet. Add some from Admin!</p>
        )}

        {/* Product Grid */}
        {!loading && products.length > 0 && (
          <div style={styles.grid}>
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>HANDORA® © 2026</p>
        <p style={{ opacity: 0.5, fontSize: '12px' }}>Handcrafted with love</p>
      </footer>
    </div>
  )
}

const styles = {
  main: {
    padding: '60px 40px',
    minHeight: '80vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: '40px',
    borderBottom: '1px solid #eee',
    paddingBottom: '20px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '400',
    letterSpacing: '2px',
  },
  count: {
    fontSize: '12px',
    opacity: 0.5,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '40px 30px',
  },
  message: {
    textAlign: 'center',
    opacity: 0.5,
    marginTop: '100px',
    fontSize: '14px',
  },
  footer: {
    padding: '40px',
    borderTop: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
}

export default HomePage