import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import MiddleSec from '@/components/MiddleSec'
import React from 'react'
import EndSec from '@/components/EndSec'

const page = () => {
  return (
    <div className='p-5 my-4 '>
      
      <Hero/>

      {/* animation section */}
      <MiddleSec/>

      {/*end section */}
      <EndSec/>
      
    </div>
  )
}

export default page
