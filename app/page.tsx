import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import backgroundImg from '../public/assets/background.webp'
import ConnectedBrands from '../components/ConnectedBrands'
import BrowseDomain from '../components/BrowseDomain'
import Features from '../components/Features'
import Faq from '../components/Faq'
import GetStarted from '../components/GetStarted'
import Footer from '../components/Footer'
import DiscoveryPartner from '../components/DiscoveryPartner'
import DemoVideo from '../components/DemoVideo'


const page = () => {
  return (
    <div className='lg:pl-[10%] lg:pr-[10%] lg:pt-9'>
      {/* <Hero/> */}
      <div className="min-h-full bg-cover bg-center bg-linear-to-b from-blue-100 via-blue-50 to-white rounded-2xl">
        <section id="navbar">
          <Navbar />
        </section>
        <Hero />
         {/* <Hero/> */}
      </div>
    
      <BrowseDomain />
      {/* <Features /> */}
      <DiscoveryPartner />
        {/* <ConnectedBrands /> */}
      {/* <DemoVideo /> */}
      <Faq />
      <GetStarted />
      <Footer />
    </div>
  )
}

export default page