import { createContext, useContext, useState } from 'react'

const BagContext = createContext()

// This wraps your whole app and shares bag data everywhere
export function BagProvider({ children }) {
  const [bagItems, setBagItems] = useState([])

  // Add product to bag
  const addToBag = (product) => {
    setBagItems(prev => {
      const exists = prev.find(item => item._id === product._id)

      // If already in bag → increase quantity
      if (exists) {
        return prev.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      // If new → add with quantity 1
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  // Remove product from bag
  const removeFromBag = (productId) => {
    setBagItems(prev => prev.filter(item => item._id !== productId))
  }

  // Increase quantity
  const increaseQty = (productId) => {
    setBagItems(prev =>
      prev.map(item =>
        item._id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  }

  // Decrease quantity
  const decreaseQty = (productId) => {
    setBagItems(prev =>
      prev.map(item =>
        item._id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter(item => item.quantity > 0)
    )
  }

  // Total number of items (for navbar badge)
  const totalCount = bagItems.reduce((sum, item) => sum + item.quantity, 0)

  // Total price
  const totalPrice = bagItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  )

  return (
    <BagContext.Provider value={{
      bagItems,
      addToBag,
      removeFromBag,
      increaseQty,
      decreaseQty,
      totalCount,
      totalPrice
    }}>
      {children}
    </BagContext.Provider>
  )
}

// Custom hook — easy way to use bag anywhere
export function useBag() {
  return useContext(BagContext)
}