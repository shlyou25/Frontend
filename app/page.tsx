import Navbar from '@/components/Navbar'
import backgroundImg from '../public/assets/background.webp'

const page = () => {
  return (
    <div className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg.src})` }}
      >
    <Navbar/>
    </div>
  )
}

export default page