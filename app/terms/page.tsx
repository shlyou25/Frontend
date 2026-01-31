import Navbar from "../../components/Navbar";

export const metadata = {
  title: 'Terms of Service & Privacy Policy | Domz',
  description:
    'Read Domz Terms of Service and Privacy Policy. Learn how we operate, protect your data, and define platform responsibilities.',
};

export default function TermsPage() {
  return (
    <>
    <Navbar/>

    <main className="bg-white">
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
        <section>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Last Updated: December 25, 2025
          </p>

          <div className="space-y-6 text-gray-700 leading-relaxed">

            <p>
              These Terms of Service (“Terms”) govern your access to and use of
              the Domz platform (the “Platform”), operated by Domz.com LLC, a
              limited liability company organized under the laws of the State of
              New Jersey (“Domz,” “we,” “us,” or “our”).
            </p>

            <p>
              By accessing or using the Platform, you agree to be bound by these
              Terms. If you do not agree, you may not access or use the Platform.
            </p>

            <h2 className="text-xl font-semibold text-gray-900">
              1. Nature of the Platform
            </h2>
            <p>
              Domz is a directory and communication platform that enables domain
              name buyers and sellers to discover listings and communicate
              directly.
            </p>
            <p>
              Domz does not act as a broker, escrow agent, marketplace,
              intermediary, or representative. Domz does not participate in
              negotiations, process payments, hold funds, facilitate domain
              transfers, provide legal or financial advice, or verify ownership
              or intent.
            </p>

            <h2 className="text-xl font-semibold text-gray-900">
              2. Eligibility and Accounts
            </h2>
            <p>
              You must be at least 18 years old and legally capable of entering
              binding agreements to use the Platform.
            </p>
            <p>
              You are responsible for maintaining the confidentiality of your
              account credentials and all activity conducted through your
              account.
            </p>

            <h2 className="text-xl font-semibold text-gray-900">
              3. Listings and User Content
            </h2>
            <p>
              By submitting content or listings, you represent that you have the
              legal right to list the domain and that the information provided
              is accurate.
            </p>
            <p>
              Listings must link to a domain-specific landing page and clearly
              indicate that the domain is for sale.
            </p>

            <h2 className="text-xl font-semibold text-gray-900">
              4. No Transaction Involvement
            </h2>
            <p>
              Domz does not oversee or participate in transactions. Users are
              solely responsible for due diligence, negotiations, payments, and
              transfers.
            </p>

            <h2 className="text-xl font-semibold text-gray-900">
              5. Prohibited Conduct
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Fraud, phishing, or deceptive activity</li>
              <li>Listing domains you do not own or control</li>
              <li>Introducing malware or harmful code</li>
              <li>Unauthorized data scraping or abuse</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900">
              6. Fees and Subscriptions
            </h2>
            <p>
              Subscription fees provide access to Platform features only. Domz
              does not charge commissions and does not receive transaction
              proceeds.
            </p>

            <h2 className="text-xl font-semibold text-gray-900">
              7. Disclaimer of Warranties
            </h2>
            <p className="uppercase text-sm text-gray-600">
              The Platform is provided “as is” and “as available” without
              warranties of any kind.
            </p>

            <h2 className="text-xl font-semibold text-gray-900">
              8. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, Domz shall not be liable
              for indirect, incidental, or consequential damages.
            </p>

            <h2 className="text-xl font-semibold text-gray-900">
              9. Governing Law
            </h2>
            <p>
              These Terms are governed by the laws of the State of New Jersey.
              Disputes shall be resolved exclusively in New Jersey courts.
            </p>

            <p className="text-sm text-gray-600">
              Contact: support@domz.com
            </p>
          </div>
        </section>

        {/* ===================== PRIVACY POLICY ===================== */}
        <section>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Last Updated: December 25, 2025
          </p>

          <div className="space-y-6 text-gray-700 leading-relaxed">

            <p>
              This Privacy Policy describes how Domz.com LLC collects, uses, and
              protects information in connection with your use of the Platform.
            </p>

            <h2 className="text-xl font-semibold text-gray-900">
              1. Information We Collect
            </h2>
            <p>
              We collect only the minimum information necessary to operate the
              Platform, such as name, email address, login credentials, and
              domain listings.
            </p>

            <h2 className="text-xl font-semibold text-gray-900">
              2. How We Use Information
            </h2>
            <p>
              Information is used to manage accounts, display listings, enable
              communication, provide support, and maintain Platform security.
            </p>

            <h2 className="text-xl font-semibold text-gray-900">
              3. Payments
            </h2>
            <p>
              Domz does not store payment information. Payments are processed
              entirely by third-party providers.
            </p>

            <h2 className="text-xl font-semibold text-gray-900">
              4. Buyer-Seller Messaging
            </h2>
            <p>
              Messaging is routed through an anonymized proxy. Personal contact
              details are not disclosed unless you choose to share them.
            </p>

            <h2 className="text-xl font-semibold text-gray-900">
              5. Data Security
            </h2>
            <p>
              We use reasonable technical and organizational measures to protect
              your information. No system is perfectly secure.
            </p>

            <h2 className="text-xl font-semibold text-gray-900">
              6. Data Retention
            </h2>
            <p>
              Information is retained only as long as necessary to operate the
              Platform or comply with legal obligations.
            </p>

            <h2 className="text-xl font-semibold text-gray-900">
              7. Children’s Privacy
            </h2>
            <p>
              The Platform is not intended for individuals under the age of 18.
            </p>

            <p className="text-sm text-gray-600">
              Contact: support@domz.com
            </p>
          </div>
        </section>

      </div>
    </main>
        </>
  );
}
