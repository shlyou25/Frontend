import React from 'react'
import Navbar from '../../components/Navbar'
import AboutDomz from './About'
import Footer from '@/components/Footer'

const page = () => {
  return (
    <div>
      <Navbar/>
      <AboutDomz/>
      <Footer/>
    </div>
  )
}

export default page