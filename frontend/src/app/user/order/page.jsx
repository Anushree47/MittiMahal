import { Suspense } from 'react'
import OrderConfirmation from './Component'

const OrderPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OrderConfirmation />
      </Suspense>
    </div>
  )
}

export default OrderPage