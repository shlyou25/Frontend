import React from 'react'

const ConnectedBrands = () => {
    return (
        <>
            <div className="bg-white py-12 sm:py-14"> 
                <div className="mx-auto max-w-7xl px-6 lg:px-8"> 
                    <h2 className="text-center text-lg/8 font-semibold text-gray-900">Friends We Respect</h2>
                    <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                        <img width="158" height="48" src="/assets/Brands/Icann_logo.svg.webp" alt="Transistor" className="col-span-2 max-h-12 w-full object-contain lg:col-span-1" />
                        <img width="158" height="48" src="/assets/Brands/Rectangle 5.webp" alt="Reform" className="col-span-2 max-h-12 w-full object-contain lg:col-span-1" />
                        <img width="158" height="48" src="/assets/Brands/iana_official_logo_icon_169020.webp" alt="Tuple" className="col-span-2 max-h-12 w-full object-contain lg:col-span-1" />
                        <img width="158" height="48" src="/assets/Brands/W3C®_Icon.svg.webp" alt="SavvyCal" className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1" />
                        <img width="158" height="48" src="/assets/Brands/ica-logo.webp" alt="Statamic" className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1" />
                    </div>
                </div>
            </div>

        </>
    )
}

export default ConnectedBrands