import NavbarComponenet from '@/components/NavbarComponenet'
import React from 'react'

const page = () => {
  return (
    <div className='lg:pl-[10%] lg:pr-[10%] lg:pt-9'>
        <NavbarComponenet colorText="S" plainText="ignUp" IsParaText={true} ParaText="Browse a commission-free catalog and connect directly with domain owners." />
    </div>
  )
}

export default page