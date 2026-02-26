

import Footer from '@/components/Footer';
import { LegalTemplate, LegalSection } from '@/components/legal/LegalTemplate';
import Navbar from '@/components/Navbar';

const PrivacyPolicyPage=()=> {
  return (
     <>
     <Navbar/>
    <LegalTemplate title="Privacy Policy" lastUpdated="December 25, 2025">
      <LegalSection title="Overview">
        <p>
          This Privacy Policy describes how Domz.com LLC collects, uses, and
          protects information in connection with your use of the Platform.
        </p>
      </LegalSection>

      <LegalSection title="Information We Collect">
        <ul>
          <li>Name and email address.</li>
          <li>Account credentials.</li>
          <li>Listed domain names.</li>
          <li>Optional profile information you provide.</li>
        </ul>
      </LegalSection>

      <LegalSection title="How We Use Information">
        <ul>
          <li>Create and manage accounts.</li>
          <li>Display domain listings.</li>
          <li>Enable buyer‑seller communication.</li>
          <li>Provide support and maintain security.</li>
          <li>Comply with legal obligations.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Communications">
        <p>
          We may send account and service emails. Marketing emails are sent
          only if you opt in.
        </p>
      </LegalSection>

      <LegalSection title="Cookies and Technical Data">
        <p>
          We use limited cookies for authentication, session management,
          analytics, and security. We do not use cross‑site advertising
          cookies.
        </p>
      </LegalSection>

      <LegalSection title="Data Security">
        <p>
          We implement reasonable safeguards, but no system is completely
          secure. Use of the Platform is at your own risk.
        </p>
      </LegalSection>

      <LegalSection title="Your Rights">
        <p>
          You may update your information or request account deletion by
          contacting support@domz.com.
        </p>
      </LegalSection>

      <LegalSection title="Governing Law">
        <p>
          This Privacy Policy is governed by the laws of the State of New
          Jersey, United States.
        </p>
      </LegalSection>
    </LegalTemplate>
    <Footer/>
   </>
  );
}

export default PrivacyPolicyPage