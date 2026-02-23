import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import BrowseDomain from '../components/BrowseDomain'
import Faq from '../components/Faq'
import GetStarted from '../components/GetStarted'
import Footer from '../components/Footer'
import DiscoveryPartner from '../components/DiscoveryPartner'


const page = () => {
  return (
    <div className='lg:pl-[10%] lg:pr-[10%] lg:pt-9'>
      <main className="min-h-screen bg-linear-to-b from-blue-100 via-blue-50 to-white">
        <Navbar />
        <Hero />
        <BrowseDomain />
      </main>
      <DiscoveryPartner />
      <Faq />
      <GetStarted />
      <Footer/>
    </div>
  )
}

export default page