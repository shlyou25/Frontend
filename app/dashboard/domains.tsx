import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface PortfolioProps {
   portfolioStatus: boolean;
}
interface DomainType {
   domain: string;
}


const Domains = ({ portfolioStatus }: PortfolioProps) => {
   const [userDomains, setUserDomains] = useState<DomainType[]>([]);

   useEffect(() => {
      const fetchDomain = async () => {
         try {
            const res = await axios.get(
               `${process.env.NEXT_PUBLIC_apiLink}domain/getdomainbyuser`,
               { withCredentials: true }
            );

            setUserDomains(res?.data?.domains);
         } catch (error) {
            console.error(error);
         }
      };

      fetchDomain();

   }, [portfolioStatus]);

   return (
      <>
         <h2 className="mb-2 text-lg font-medium text-heading">The domain you own:</h2>
         <ul className="max-w-md space-y-1 text-body list-disc list-inside h-72 overflow-scroll w-full">
            {userDomains?.map((item: any, index: number) => (
               <li key={index}>
                  {item.domain}
               </li>
            ))}
         </ul>

      </>
   )
}

export default Domains