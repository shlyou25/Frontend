import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import backgroundImg from '../public/assets/background.webp'
import DomainTable from '@/components/DomainTable'
import ConnectedBrands from '@/components/ConnectedBrands'
import BrowseDomain from '@/components/BrowseDomain'
import Features from '@/components/Features'
import Faq from '@/components/Faq'
import GetStarted from '@/components/GetStarted'
import Footer from '@/components/Footer'
import DiscoveryPartner from '@/components/DiscoveryPartner'
import DemoVideo from '@/components/DemoVideo'

const page = () => {
  return (
    <div className='lg:pl-[10%] lg:pr-[10%] lg:pt-9'>
      <div className="min-h-full bg-cover bg-center rounded-4xl"
        style={{ backgroundImage: `url(${backgroundImg.src})` }}>
        <Navbar />
        <Hero />
      </div>
      <ConnectedBrands />
      <BrowseDomain />
      <Features />
      <DiscoveryPartner/>
      <DemoVideo/>
      <Faq/>
      <GetStarted/>
      <Footer/>
      {/* <div className='px-4 lg:ml-[20%] lg:mr-[20%]'>
        <DomainTable />
      </div> */}

    </div>
  )
}

export default page