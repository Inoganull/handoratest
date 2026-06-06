import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'

const CATEGORIES = [
  'Ceramics',
  'Textiles',
  'Woodwork',
  'Jewelry',
  'Leather',
  'Glass',
  'Paper',
  'Other'
]

function AdminPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [previews, setPreviews] = useState([])

  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    countInStock: '',
    isFeatured: false,
    media: []
  })

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  // Handle file selection + show previews
  const handleFiles = (e) => {
    const files = Array.from(e.target.files)
    setForm(prev => ({ ...prev, media: files }))

    // Create preview URLs
    const urls = files.map(file => URL.createObjectURL(file))
    setPreviews(urls)
  }

  // Handle form submit
  const handleSubmit = async () => {
    setError('')

    // Basic validation
    if (!form.title || !form.price || !form.category) {
      setError('Please fill in title, price and category.')
      return
    }
    if (form.media.length === 0) {
      setError('Please upload at least one image.')
      return
    }

    setLoading(true)

    try {
      // FormData is needed for file uploads
      const formData = new FormData()
      formData.append('title', form.title)
      formData.append('description', form.description)
      formData.append('price', form.price)
      formData.append('category', form.category)
      formData.append('countInStock', form.countInStock || 1)
      formData.append('isFeatured', form.isFeatured)

      // Append each file
      form.media.forEach(file => {
        formData.append('media', file)
      })

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/products`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )

      setSuccess(true)
      setLoading(false)

      // Reset form after 2 seconds then go to shop
      setTimeout(() => {
        navigate('/')
      }, 2000)

    } catch (err) {
      console.error(err)
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div>
      <Navbar />

      <div style={styles.container}>

        {/* Page Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Add New Product</h1>
          <p style={styles.subtitle}>Upload a new handcrafted item to the shop</p>
        </div>

        <div style={styles.formWrapper}>

          {/* Image Upload — top, full width */}
          <div style={styles.uploadBox}>
            <input
              type="file"
              id="media"
              multiple
              accept="image/*,video/*"
              onChange={handleFiles}
              style={{ display: 'none' }}
            />
            <label htmlFor="media" style={styles.uploadLabel}>
              {previews.length === 0 ? (
                <div style={styles.uploadPlaceholder}>
                  <p style={styles.uploadIcon}>+</p>
                  <p style={styles.uploadText}>Click to upload images</p>
                  <p style={styles.uploadHint}>You can select multiple files</p>
                </div>
              ) : (
                <div style={styles.previewGrid}>
                  {previews.map((url, i) => (
                    <div key={i} style={styles.previewItem}>
                      <img src={url} alt={`preview ${i}`} style={styles.previewImg} />
                    </div>
                  ))}
                  <div style={styles.addMore}>
                    <p>+ Add more</p>
                  </div>
                </div>
              )}
            </label>
          </div>

          {/* Form Fields */}
          <div style={styles.fields}>

            {/* Title */}
            <div style={styles.field}>
              <label style={styles.label}>Product Title *</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Handwoven Linen Basket"
                style={styles.input}
              />
            </div>

            {/* Description */}
            <div style={styles.field}>
              <label style={styles.label}>Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe your product..."
                rows={4}
                style={{ ...styles.input, resize: 'vertical' }}
              />
            </div>

            {/* Price + Stock — side by side */}
            <div style={styles.row}>
              <div style={styles.field}>
                <label style={styles.label}>Price (USD) *</label>
                <input
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Count in Stock</label>
                <input
                  name="countInStock"
                  type="number"
                  value={form.countInStock}
                  onChange={handleChange}
                  placeholder="1"
                  style={styles.input}
                />
              </div>
            </div>

            {/* Category */}
            <div style={styles.field}>
              <label style={styles.label}>Category *</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="">Select a category</option>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Featured Checkbox */}
            <div style={styles.checkboxRow}>
              <input
                type="checkbox"
                id="isFeatured"
                name="isFeatured"
                checked={form.isFeatured}
                onChange={handleChange}
                style={styles.checkbox}
              />
              <label htmlFor="isFeatured" style={styles.checkboxLabel}>
                Mark as Featured Product
              </label>
            </div>

            {/* Error Message */}
            {error && <p style={styles.error}>{error}</p>}

            {/* Success Message */}
            {success && (
              <p style={styles.successMsg}>
                ✓ Product uploaded! Redirecting to shop...
              </p>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading || success}
              style={{
                ...styles.submitBtn,
                opacity: loading || success ? 0.6 : 1,
              }}
            >
              {loading ? 'Uploading...' : success ? '✓ Done!' : 'Publish Product'}
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '60px 40px',
  },
  header: {
    marginBottom: '50px',
    borderBottom: '1px solid #eee',
    paddingBottom: '24px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '400',
    letterSpacing: '1px',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '13px',
    opacity: 0.4,
    letterSpacing: '0.5px',
  },
  formWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
  },
  uploadBox: {
    width: '100%',
  },
  uploadLabel: {
    display: 'block',
    cursor: 'pointer',
    border: '1px dashed #ccc',
    minHeight: '200px',
    transition: 'border-color 0.2s',
  },
  uploadPlaceholder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '200px',
    gap: '8px',
  },
  uploadIcon: {
    fontSize: '32px',
    opacity: 0.3,
  },
  uploadText: {
    fontSize: '14px',
    opacity: 0.5,
    letterSpacing: '0.5px',
  },
  uploadHint: {
    fontSize: '11px',
    opacity: 0.3,
    letterSpacing: '0.5px',
  },
  previewGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    padding: '12px',
  },
  previewItem: {
    width: '120px',
    height: '120px',
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  previewImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  addMore: {
    width: '120px',
    height: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px dashed #ccc',
    fontSize: '12px',
    opacity: 0.4,
  },
  fields: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '11px',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    opacity: 0.5,
  },
  input: {
    padding: '12px 16px',
    border: '1px solid #ddd',
    fontSize: '14px',
    fontFamily: 'inherit',
    outline: 'none',
    width: '100%',
    backgroundColor: '#fff',
    transition: 'border-color 0.2s',
  },
  checkboxRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  checkbox: {
    width: '16px',
    height: '16px',
    cursor: 'pointer',
  },
  checkboxLabel: {
    fontSize: '13px',
    opacity: 0.6,
    cursor: 'pointer',
  },
  error: {
    color: '#cc0000',
    fontSize: '13px',
    padding: '12px 16px',
    backgroundColor: '#fff5f5',
    border: '1px solid #ffdddd',
  },
  successMsg: {
    color: '#006600',
    fontSize: '13px',
    padding: '12px 16px',
    backgroundColor: '#f0fff0',
    border: '1px solid #ccffcc',
  },
  submitBtn: {
    width: '100%',
    padding: '16px',
    backgroundColor: '#000',
    color: '#fff',
    fontSize: '13px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
    border: 'none',
    fontFamily: 'inherit',
  }
}

export default AdminPage