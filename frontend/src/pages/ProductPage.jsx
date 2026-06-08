import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useBag } from '../context/BagContext'
import axios from 'axios'
import Navbar from '../components/Navbar'

function ProductPage() {
  const { id } = useParams()
  const { addToBag } = useBag()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/products/${id}`)
      .then(res => {
        setProduct(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [id])

  const handleAddToBag = () => {
  addToBag(product)      // ← actually adds to bag now
  setAdded(true)
  setTimeout(() => setAdded(false), 2000)
}

  if (loading) return (
    <div>
      <Navbar />
      <p style={styles.message}>Loading...</p>
    </div>
  )

  if (!product) return (
    <div>
      <Navbar />
      <p style={styles.message}>Product not found.</p>
    </div>
  )

  return (
    <div>
      <Navbar />

      {/* Back Button */}
      <div style={styles.backWrapper}>
        <button onClick={() => navigate('/')} style={styles.backBtn}>
          ← Back to Shop
        </button>
      </div>

      <div style={styles.container}>

        {/* LEFT — Images */}
        <div style={styles.imageSection}>

          {/* Main Image */}
          <div style={styles.mainImageWrapper}>
            <img
              src={product.media[selectedImage]?.url}
              alt={product.title}
              onError={(e) => e.target.src = '/placeholder.jpg'}
              style={styles.mainImage}
            />
          </div>

          {/* Thumbnail Row (if multiple images) */}
          {product.media.length > 1 && (
            <div style={styles.thumbnails}>
              {product.media.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  style={{
                    ...styles.thumb,
                    border: selectedImage === index
                      ? '2px solid #000'
                      : '2px solid transparent'
                  }}
                >
                  <img
                    src={item.url}
                    alt={`view ${index + 1}`}
                    style={styles.thumbImage}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT — Product Info */}
        <div style={styles.infoSection}>

          {/* Category */}
          <p style={styles.category}>{product.category}</p>

          {/* Title */}
          <h1 style={styles.title}>{product.title}</h1>

          {/* Price */}
          <p style={styles.price}>${product.price}</p>

          {/* Divider */}
          <div style={styles.divider} />

          {/* Description */}
          <p style={styles.description}>{product.description}</p>

          {/* Stock Status */}
          <p style={styles.stock}>
            {product.countInStock > 0
              ? `${product.countInStock} in stock`
              : 'Out of stock'}
          </p>

          {/* Add to Bag Button */}
          <button
            onClick={handleAddToBag}
            disabled={product.countInStock === 0}
            style={{
              ...styles.addBtn,
              background: added ? '#555' : '#000',
            }}
          >
            {added ? '✓ Added to Bag' : 'Add to Bag'}
          </button>

          {/* Featured Badge */}
          {product.isFeatured && (
            <p style={styles.featured}>★ Featured Product</p>
          )}

        </div>
      </div>
    </div>
  )
}

const styles = {
  message: {
    textAlign: 'center',
    marginTop: '100px',
    opacity: 0.5,
  },
  backWrapper: {
    padding: '20px 40px 0',
  },
  backBtn: {
    fontSize: '13px',
    opacity: 0.5,
    cursor: 'pointer',
    letterSpacing: '0.5px',
    transition: 'opacity 0.2s',
  },
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '80px',
    padding: '40px 40px 80px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  imageSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  mainImageWrapper: {
    backgroundColor: '#f5f5f5',
    aspectRatio: '3/4',
    overflow: 'hidden',
  },
  mainImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  thumbnails: {
    display: 'flex',
    gap: '8px',
  },
  thumb: {
    width: '70px',
    height: '70px',
    overflow: 'hidden',
    cursor: 'pointer',
    backgroundColor: '#f5f5f5',
  },
  thumbImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  infoSection: {
    paddingTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  category: {
    fontSize: '11px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    opacity: 0.4,
  },
  title: {
    fontSize: '28px',
    fontWeight: '400',
    letterSpacing: '1px',
    lineHeight: 1.3,
  },
  price: {
    fontSize: '20px',
    letterSpacing: '1px',
  },
  divider: {
    borderTop: '1px solid #eee',
    margin: '8px 0',
  },
  description: {
    fontSize: '14px',
    lineHeight: 1.8,
    opacity: 0.7,
  },
  stock: {
    fontSize: '12px',
    opacity: 0.4,
    letterSpacing: '1px',
  },
  addBtn: {
    width: '100%',
    padding: '16px',
    color: '#fff',
    fontSize: '13px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    transition: 'background 0.3s ease',
    marginTop: '8px',
    cursor: 'pointer',
  },
  featured: {
    fontSize: '12px',
    opacity: 0.4,
    textAlign: 'center',
    letterSpacing: '1px',
  }
}

export default ProductPage