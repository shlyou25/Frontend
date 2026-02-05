
// "use client";

// import { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// interface Props {
//   domainId: string;
//   domain: string;
//   onClose: () => void;
// }

// const EmailTemplate = ({ domainId, domain, onClose }: Props) => {
//   const [email, setEmail] = useState("");
//   const [proxyEmail, setProxyEmail] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const subject = encodeURIComponent(`Interested in buying ${domain}`);
//   const body = encodeURIComponent(
//     `Hi,\n\nI am interested in buying ${domain}.\n\nThanks`
//   );

//   const generateProxy = async () => {
//     if (!email) {
//       toast.error("Your email is required");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_apiLink}communication/send-email`,
//         { domainId, buyerEmail: email }
//       );

//       setProxyEmail(res.data.proxyEmail);
//     } catch (err: any) {
//       toast.error("Failed to generate proxy email");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!proxyEmail) {
//     return (
//       <section className="space-y-6">
//         <div>
//           <label className="block mb-2 text-sm font-medium">
//             Your email (kept private)
//           </label>
//           <input
//             type="email"
//             className="w-full p-2.5 border rounded-lg"
//             placeholder="you@example.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>

//         <div className="flex justify-end gap-3">
//           <button onClick={onClose} className="text-gray-600">
//             Cancel
//           </button>
//           <button
//             onClick={generateProxy}
//             disabled={loading}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg"
//           >
//             {loading ? "Preparing..." : "Continue"}
//           </button>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="space-y-6">
//       <div className="bg-blue-50 p-4 rounded-lg text-sm">
//         <p className="font-medium mb-2">
//           Choose how you want to email the seller
//         </p>

//         <p className="text-gray-600 mb-3">
//           Your real email will remain hidden.
//         </p>

//         {/* DEFAULT EMAIL CLIENT */}
//         <a
//           href={`mailto:${proxyEmail}?subject=${subject}&body=${body}`}
//           className="block w-full text-center px-4 py-2 mb-3 bg-gray-800 text-white rounded-lg"
//         >
//           Use default email app
//         </a>

//         {/* GMAIL */}
//         <a
//           href={`https://mail.google.com/mail/?view=cm&to=${proxyEmail}&su=${subject}&body=${body}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="block w-full text-center px-4 py-2 mb-3 bg-red-600 text-white rounded-lg"
//         >
//           Use Gmail
//         </a>

//         {/* OUTLOOK */}
//         <a
//           href={`https://outlook.live.com/mail/0/deeplink/compose?to=${proxyEmail}&subject=${subject}&body=${body}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="block w-full text-center px-4 py-2 bg-blue-700 text-white rounded-lg"
//         >
//           Use Outlook
//         </a>
//       </div>

//       <div className="flex justify-end">
//         <button onClick={onClose} className="text-gray-600">
//           Done
//         </button>
//       </div>
//     </section>
//   );
// };

// export default EmailTemplate;


"use client";

interface Props {
  domainId: string;
  domain: string;
  sellerEmail: string;
  onClose: () => void;
}

const EmailTemplate = ({ domain, sellerEmail, onClose }: Props) => {
  const subject = encodeURIComponent(`Interested in buying ${domain}`);
  const body = encodeURIComponent(
    `Hi,\n\nI am interested in buying ${domain}.\n\nLooking forward to your response.\n\nThanks`
  );

  return (
    <section className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg text-sm">
        <p className="font-medium mb-2">
          Contact seller
        </p>

        <p className="text-gray-600 mb-4">
          Your default email application will open. You can send the message
          using your own email address.
        </p>

        {/* DEFAULT EMAIL CLIENT */}
        <a
          href={`mailto:${sellerEmail}?subject=${subject}&body=${body}`}
          className="block w-full text-center px-4 py-2 mb-3 bg-gray-800 text-white rounded-lg"
        >
          Open default email app
        </a>

        {/* GMAIL */}
        <a
          href={`https://mail.google.com/mail/?view=cm&to=${sellerEmail}&su=${subject}&body=${body}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center px-4 py-2 mb-3 bg-red-600 text-white rounded-lg"
        >
          Open Gmail
        </a>

        {/* OUTLOOK */}
        <a
          href={`https://outlook.live.com/mail/0/deeplink/compose?to=${sellerEmail}&subject=${subject}&body=${body}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center px-4 py-2 bg-blue-700 text-white rounded-lg"
        >
          Open Outlook
        </a>
      </div>

      <div className="flex justify-end">
        <button onClick={onClose} className="text-gray-600">
          Close
        </button>
      </div>
    </section>
  );
};

export default EmailTemplate;
