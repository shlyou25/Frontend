import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import BrowseDomain from '../components/BrowseDomain'
import Faq from '../components/Faq'
import GetStarted from '../components/GetStarted'
import Footer from '../components/Footer'
import DiscoveryPartner from '../components/DiscoveryPartner'
import bg from '../public/assets/background.webp'


const page = () => {
  return (
    <div className='lg:pl-[10%] lg:pr-[10%] lg:pt-9'>
      <main className="relative min-h-full overflow-hidden rounded-4xl">
        <div className="absolute inset-0 bg-linear-to-b from-blue-100 via-blue-50 to-white" />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-125 w-200 -translate-x-1/2 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.08),transparent_40%)]" />
        <div className="relative">
          <Navbar />
          <Hero />
        </div>
      </main>
      <BrowseDomain />
      <DiscoveryPartner />
      <Faq />
      <GetStarted />
      <Footer />
    </div>
  )
}

export default page