import { Link } from 'react-router-dom'
import { useBag } from '../context/BagContext'

function Navbar() {
  const { totalCount } = useBag()

  return (
    <nav style={styles.nav}>

      {/* Left — Brand */}
      <Link to="/" style={styles.brand}>HANDORA®</Link>

      {/* Right — Links */}
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Shop</Link>
        <Link to="/bag" style={styles.link}>
          Bag ({totalCount})
        </Link>
        <Link to="/admin" style={styles.link}>Admin</Link>
      </div>

    </nav>
  )
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 40px',
    borderBottom: '1px solid #eee',
    position: 'sticky',
    top: 0,
    background: '#fff',
    zIndex: 100,
  },
  brand: {
    fontSize: '16px',
    fontWeight: '600',
    letterSpacing: '2px',
  },
  links: {
    display: 'flex',
    gap: '30px',
  },
  link: {
    fontSize: '13px',
    letterSpacing: '1px',
    opacity: 0.7,
  }
}

export default Navbar