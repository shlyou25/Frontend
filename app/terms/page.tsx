
import Footer from '@/components/Footer';
import { LegalTemplate, LegalSection } from '@/components/legal/LegalTemplate';
import Navbar from '@/components/Navbar';

const TermsOfServicePage=()=>{
  return (
    <>
    <Navbar/>
    <LegalTemplate title="Terms of Service" lastUpdated="December 25, 2025">
      <LegalSection title="Agreement to Terms">
        <p>
          These Terms of Service ("Terms") govern your access to and use of
          Domz (the "Platform"), operated by Domz.com LLC. By accessing or
          using the Platform, you agree to be bound by these Terms. If you do
          not agree, you may not access or use the Platform.
        </p>
      </LegalSection>

      <LegalSection title="Nature of the Platform">
        <p>
          Domz is a directory and communication platform that enables domain
          name buyers and sellers to discover listings and communicate
          directly.
        </p>
        <ul>
          <li>Domz is not a broker, escrow agent, or marketplace.</li>
          <li>Domz does not process payments or transfers.</li>
          <li>All transactions occur entirely outside the Platform.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Eligibility and Accounts">
        <ul>
          <li>You must be at least 18 years old to use the Platform.</li>
          <li>You are responsible for maintaining account security.</li>
          <li>Domz may suspend or terminate access at its discretion.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Listings and User Content">
        <ul>
          <li>You must have the legal right to list the domain.</li>
          <li>Listings must clearly indicate the domain is for sale.</li>
          <li>You must update or remove sold domains promptly.</li>
          <li>Domz may remove content at its discretion.</li>
        </ul>
      </LegalSection>

      <LegalSection title="No Transaction Involvement">
        <p>
          Domz does not participate in negotiations, payments, transfers, or
          dispute resolution. Users are solely responsible for due diligence
          and transaction decisions.
        </p>
      </LegalSection>

      <LegalSection title="Prohibited Conduct">
        <ul>
          <li>Fraud, phishing, or deceptive activity.</li>
          <li>Impersonation of individuals or entities.</li>
          <li>Listing domains you do not control.</li>
          <li>Introducing malware or harmful code.</li>
          <li>Unauthorized scraping or data harvesting.</li>
          <li>Interfering with Platform security.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Fees and Subscriptions">
        <p>
          Subscription fees grant access to Platform features only. Fees are
          non‑refundable unless otherwise stated. Payments are handled by
          third‑party processors.
        </p>
      </LegalSection>

      <LegalSection title="Disclaimer of Warranties">
        <p>
          THE PLATFORM IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS
          WITHOUT WARRANTIES OF ANY KIND.
        </p>
      </LegalSection>

      <LegalSection title="Limitation of Liability">
        <p>
          To the maximum extent permitted by law, Domz.com LLC shall not be
          liable for indirect, incidental, or consequential damages arising
          from use of the Platform.
        </p>
      </LegalSection>

      <LegalSection title="Governing Law">
        <p>
          These Terms are governed by the laws of the State of New Jersey,
          United States.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>support@domz.com</p>
      </LegalSection>
    </LegalTemplate>
    <Footer/>
    </>
  );
}

export default TermsOfServicePage