import { Suspense } from 'react'
import AdminLogin from './Component'

const AdminPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <AdminLogin />
      </Suspense>
    </div>
  )
}

export default AdminPage