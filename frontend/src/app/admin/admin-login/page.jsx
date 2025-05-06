import { Suspense } from 'react'
import AdminLogin from './component'

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