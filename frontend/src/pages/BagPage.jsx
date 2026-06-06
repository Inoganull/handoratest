import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useBag } from '../context/BagContext'

function BagPage() {
  const navigate = useNavigate()
  const { bagItems, removeFromBag, increaseQty, decreaseQty, totalPrice, totalCount } = useBag()

  return (
    <div>
      <Navbar />

      <div style={styles.container}>

        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Your Bag</h1>
          <p style={styles.count}>
            {totalCount === 0 ? 'Empty' : `${totalCount} item${totalCount > 1 ? 's' : ''}`}
          </p>
        </div>

        {/* Empty State */}
        {bagItems.length === 0 && (
          <div style={styles.emptyState}>
            <p style={styles.emptyText}>Your bag is empty</p>
            <button
              onClick={() => navigate('/')}
              style={styles.shopBtn}
            >
              Continue Shopping
            </button>
          </div>
        )}

        {/* Bag Items + Summary */}
        {bagItems.length > 0 && (
          <div style={styles.layout}>

            {/* LEFT — Item List */}
            <div style={styles.itemList}>
              {bagItems.map(item => (
                <div key={item._id} style={styles.item}>

                  {/* Product Image */}
                  <div
                    style={styles.itemImage}
                    onClick={() => navigate(`/product/${item._id}`)}
                  >
                    <img
                      src={item.media[0]?.url}
                      alt={item.title}
                      style={styles.itemImg}
                    />
                  </div>

                  {/* Product Details */}
                  <div style={styles.itemDetails}>
                    <div>
                      <p style={styles.itemCategory}>{item.category}</p>
                      <p style={styles.itemTitle}>{item.title}</p>
                      <p style={styles.itemPrice}>${item.price}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div style={styles.qtyRow}>
                      <div style={styles.qtyControls}>
                        <button
                          onClick={() => decreaseQty(item._id)}
                          style={styles.qtyBtn}
                        >
                          −
                        </button>
                        <span style={styles.qtyNum}>{item.quantity}</span>
                        <button
                          onClick={() => increaseQty(item._id)}
                          style={styles.qtyBtn}
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromBag(item._id)}
                        style={styles.removeBtn}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div style={styles.itemTotal}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>

                </div>
              ))}
            </div>

            {/* RIGHT — Order Summary */}
            <div style={styles.summary}>
              <h2 style={styles.summaryTitle}>Order Summary</h2>

              <div style={styles.summaryDivider} />

              {/* Line Items */}
              {bagItems.map(item => (
                <div key={item._id} style={styles.summaryRow}>
                  <span style={styles.summaryItem}>
                    {item.title} × {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}

              <div style={styles.summaryDivider} />

              {/* Total */}
              <div style={styles.totalRow}>
                <span style={styles.totalLabel}>Total</span>
                <span style={styles.totalPrice}>
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              {/* Checkout Button */}
              <button style={styles.checkoutBtn}>
                Proceed to Checkout
              </button>

              {/* Continue Shopping */}
              <button
                onClick={() => navigate('/')}
                style={styles.continueBtn}
              >
                ← Continue Shopping
              </button>

            </div>
          </div>
        )}

      </div>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '60px 40px',
    minHeight: '80vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    borderBottom: '1px solid #eee',
    paddingBottom: '24px',
    marginBottom: '40px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '400',
    letterSpacing: '1px',
  },
  count: {
    fontSize: '12px',
    opacity: 0.4,
    letterSpacing: '1px',
  },
  emptyState: {
    textAlign: 'center',
    paddingTop: '100px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
  },
  emptyText: {
    opacity: 0.4,
    fontSize: '14px',
    letterSpacing: '1px',
  },
  shopBtn: {
    padding: '14px 32px',
    backgroundColor: '#000',
    color: '#fff',
    fontSize: '12px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    fontFamily: 'inherit',
    border: 'none',
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '1fr 360px',
    gap: '60px',
    alignItems: 'start',
  },
  itemList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
  },
  item: {
    display: 'grid',
    gridTemplateColumns: '100px 1fr auto',
    gap: '24px',
    padding: '24px 0',
    borderBottom: '1px solid #eee',
    alignItems: 'start',
  },
  itemImage: {
    width: '100px',
    height: '130px',
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    cursor: 'pointer',
  },
  itemImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  itemDetails: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '130px',
  },
  itemCategory: {
    fontSize: '10px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    opacity: 0.4,
    marginBottom: '4px',
  },
  itemTitle: {
    fontSize: '14px',
    marginBottom: '8px',
    letterSpacing: '0.5px',
  },
  itemPrice: {
    fontSize: '14px',
    opacity: 0.6,
  },
  qtyRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  qtyControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '0',
    border: '1px solid #ddd',
  },
  qtyBtn: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#fff',
    border: 'none',
    fontFamily: 'inherit',
    transition: 'background 0.2s',
  },
  qtyNum: {
    width: '32px',
    textAlign: 'center',
    fontSize: '13px',
    borderLeft: '1px solid #ddd',
    borderRight: '1px solid #ddd',
    height: '32px',
    lineHeight: '32px',
  },
  removeBtn: {
    fontSize: '11px',
    opacity: 0.4,
    cursor: 'pointer',
    letterSpacing: '0.5px',
    textDecoration: 'underline',
    backgroundColor: 'transparent',
    border: 'none',
    fontFamily: 'inherit',
    transition: 'opacity 0.2s',
  },
  itemTotal: {
    fontSize: '14px',
    paddingTop: '4px',
    minWidth: '60px',
    textAlign: 'right',
  },
  summary: {
    border: '1px solid #eee',
    padding: '32px',
    position: 'sticky',
    top: '100px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  summaryTitle: {
    fontSize: '14px',
    fontWeight: '500',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  summaryDivider: {
    borderTop: '1px solid #eee',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    opacity: 0.6,
    gap: '16px',
  },
  summaryItem: {
    flex: 1,
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  totalLabel: {
    fontSize: '13px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  totalPrice: {
    fontSize: '20px',
    letterSpacing: '1px',
  },
  checkoutBtn: {
    width: '100%',
    padding: '16px',
    backgroundColor: '#000',
    color: '#fff',
    fontSize: '12px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    border: 'none',
    fontFamily: 'inherit',
    marginTop: '8px',
  },
  continueBtn: {
    width: '100%',
    padding: '12px',
    backgroundColor: 'transparent',
    color: '#000',
    fontSize: '12px',
    letterSpacing: '1px',
    cursor: 'pointer',
    border: '1px solid #ddd',
    fontFamily: 'inherit',
    textAlign: 'center',
  },
}

export default BagPage