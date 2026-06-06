import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()

  return (
    <div
      style={styles.card}
      onClick={() => navigate(`/product/${product._id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Product Image */}
      <div style={styles.imageWrapper}>
        <img
          src={product.media[0]?.url}
          alt={product.title}
          style={{
            ...styles.image,
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
          }}
        />
      </div>

      {/* Product Info */}
      <div style={styles.info}>
        <p style={styles.title}>{product.title}</p>
        <div style={styles.bottom}>
          <span style={styles.category}>{product.category}</span>
          <span style={styles.price}>${product.price}</span>
        </div>
      </div>
    </div>
  )
}

const styles = {
  card: {
    cursor: 'pointer',
  },
  imageWrapper: {
    overflow: 'hidden',
    aspectRatio: '3/4',
    backgroundColor: '#f5f5f5',
    marginBottom: '12px',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
  },
  info: {
    padding: '0 4px',
  },
  title: {
    fontSize: '13px',
    marginBottom: '6px',
    letterSpacing: '0.5px',
  },
  bottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: {
    fontSize: '11px',
    opacity: 0.5,
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  price: {
    fontSize: '13px',
  }
}

export default ProductCard