import React from 'react'
import NavbarComponenet from '../../components/NavbarComponenet'
import Plancard from './plancard'
import OurCare from './OurCare'
import Footer from '../../components/Footer'

const packages = [
  { title: 'Starter', price: 0.99, per: 'Month', feature: 5 },
  { title: 'Basic', price: 4.99, per: 'Month', feature: 100 },
  { title: 'Business', price: 9.99, per: 'Month', feature: 500 },
  { title: 'Premium', price: 14.99, per: 'Month', feature: 1000 },
  { title: 'Platinum', price: 19.99, per: 'Month', feature: 2000 },
  { title: 'Gold', price: 24.99, per: 'Month', feature: 5000 },
]

const page = () => (
  <div className='lg:px-[10%] pt-12 pb-6'>
    <NavbarComponenet text="Choose the Plan that Fits Your Portfolio"IsParaText={true} />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
      {packages.map((itm) => (
        <Plancard
          key={itm.title}
          title={itm.title}
          price={itm.price}
          per={itm.per}
          feature={itm.feature}
        />
      ))}
    </div>
    <div className="w-full text-center text-base text-[#1C1E21] mt-3 mb-2">
      For portfolios of <span className="text-[#2865E8] font-medium">5,000+ domains</span>, <a className="underline text-[#2865E8]" href="/contact">contact us</a> to discuss special pricing.
    </div>
    <OurCare />
    <Footer />
  </div>
)

export default page
