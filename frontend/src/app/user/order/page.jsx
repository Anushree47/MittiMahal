import { Suspense } from 'react'
import OrderConfirmation from './component'

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