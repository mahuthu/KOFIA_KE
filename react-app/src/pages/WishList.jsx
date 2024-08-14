import React from 'react'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Wishlist from '../components/Wishlist';

import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className='container'>
      <Announcement/>
      <Navbar/>
      <Wishlist/>
      <Footer/>
    </div>
  )
}

export default Home