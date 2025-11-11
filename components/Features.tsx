import React from 'react'
import bulkicon from '../public/assets/icons/bulk-buying.jpg'
import direction from '../public/assets/icons/direction.webp'
import saving from '../public/assets/icons/salary.webp';
import chat from '../public/assets/icons/chat.webp'
import domain from '../public/assets/icons/domain.webp'
import security from '../public/assets/icons/cyber-security.webp'
import Image from 'next/image'

const features = [
  {
    icon: <Image src={direction} alt='direct' className="w-8 h-8 object-contain"/>,
    title: 'Direct',
    desc: 'Paste your existing landing page URLs to list instantly — no DNS changes required.',
    italic: 'You’ve put in the work — now let it work for you.'
  },
  {
    icon: <Image src={bulkicon} alt="Bulk Upload" className="w-8 h-8 object-contain" />,
    title: 'Bulk',
    desc: 'Upload dozens or hundreds of domains in seconds — with or without automation.',
    italic: 'Spend less time setting up, and more time closing deals.'
  },
  {
    icon: <Image src={saving} alt="Bulk Upload" className="w-8 h-8 object-contain" />,
    title: 'Earnings',
    desc: 'Keep 100% of your revenue. No commissions, no fees.',
    italic: 'Because you earned it, not the platform.'
  },
  {
    icon: <Image src={chat} alt="Bulk Upload" className="w-8 h-8 object-contain" />,
    title: 'Chat',
    desc: 'Negotiate in real time with built-in buyer messaging.',
    italic: 'You shouldn’t need a support ticket to answer a buyer.'
  },
  {
   icon: <Image src={domain} alt="Bulk Upload" className="w-8 h-8 object-contain" />,
    title: 'Flexibility',
    desc: 'Link to any existing lander — from marketplaces to personal pages.',
    italic: 'Built for domainers who want control — not red tape.'
  },
  {
    icon: <Image src={security} alt="Bulk Upload" className="w-8 h-8 object-contain" />,
    title: 'Security',
    desc: 'Only your domain URL is public. 2FA and verification ensure safe, private listings.',
    italic: 'We’re not asking for trust — we’re working to earn it.'
  }
]

const Features = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-center text-3xl md:text-5xl font-semibold text-gray-900 mb-16">
          Built to work for you — not around you.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {features.map((item, idx) => (
            <div key={idx} className="text-left max-w-sm">
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-2 leading-relaxed">{item.desc}</p>
              <p className="italic text-gray-500 text-sm">{item.italic}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
