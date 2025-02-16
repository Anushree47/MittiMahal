"use client"

import { useState } from "react"
import { Minus, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    { id: "1", name: "T-Shirt", price: 19.99, quantity: 2 },
    { id: "2", name: "Jeans", price: 49.99, quantity: 1 },
    { id: "3", name: "Sneakers", price: 79.99, quantity: 1 },
  ])

  const updateQuantity = (id, newQuantity) => {
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item)),
    )
  }

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-xl">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-8">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-4">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border rounded">
                    <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-2">{item.quantity}</span>
                    <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="font-semibold w-24 text-right">${(item.price * item.quantity).toFixed(2)}</p>
                  <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-between items-center">
            <div>
              <p className="text-xl">Total Items: {totalItems}</p>
              <p className="text-2xl font-bold">Total Price: ${totalPrice.toFixed(2)}</p>
            </div>
            <Button size="lg">Proceed to Checkout</Button>
          </div>
        </>
      )}
    </div>
  )
}

