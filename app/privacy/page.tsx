import Footer from '@/components/Footer';
import { LegalTemplate, LegalSection } from '@/components/legal/LegalTemplate';
import Navbar from '@/components/Navbar';

const PrivacyPolicyPage = () => {
  return (
    <>
      <Navbar />
      <LegalTemplate title="Privacy Policy" lastUpdated="December 25, 2025">

        <LegalSection title="Overview">
          <p>
             Privacy Policy describes how Domz.com LLC, a limited liability company organized under
            the laws of the State of New Jersey (“Domz,” “we,” “us,” or “our”), collects, uses, and protects
            information in connection with your access to and use of the Domz platform (the “Platform”).
          </p>
          <p>
            By accessing or using the Platform, you acknowledge and agree to the practices described in
            this Privacy Policy.
          </p>
        </LegalSection>

        <LegalSection title="Information We Collect">
          <p>
            We collect only the minimum information necessary to operate the Platform.
          </p>
          <p>
            Information you may provide directly includes name, email address, account login credentials,
            listed domain names, and optional contact or profile information you choose to provide.
          </p>
          <p>
            We do not collect or store payment card numbers, bank account information, escrow details,
            transaction amounts, or ownership documentation for domains. Payments are processed entirely
            by third-party payment processors.
          </p>
        </LegalSection>

        <LegalSection title="How We Use Information">
          <p>
            We use collected information solely to create and manage user accounts, display domain listings,
            enable buyer-seller communication, provide customer support, process subscriptions and access
            control, maintain Platform security and integrity, and comply with legal obligations.
          </p>
          <p>
            We may disclose your information if required to do so by law.
          </p>
          <p>We do not sell personal information.</p>
        </LegalSection>

        <LegalSection title="Communications">
          <p>
            We may use your email address to send account-related notifications, provide service updates,
            and respond to inquiries or support requests.
          </p>
          <p>
            We do not send marketing emails unrelated to Platform operation unless you explicitly opt in.
          </p>
        </LegalSection>

        <LegalSection title="Buyer-Seller Messaging">
          <p>
            The Platform includes an internal messaging system designed to allow buyers and sellers to
            communicate without directly revealing personal contact information.
          </p>
          <p>
            Messages are routed through an anonymized proxy. Your private email address is not disclosed
            unless you voluntarily share it.
          </p>
        </LegalSection>

        <LegalSection title="Cookies and Technical Data">
          <p>
            We may use limited cookies or similar technologies for session management, authentication,
            basic analytics, and security purposes.
          </p>
          <p>
            We do not use cookies for cross-site advertising or behavioral tracking.
          </p>
        </LegalSection>

        <LegalSection title="Third-Party Services">
          <p>
            The Platform may integrate or link to third-party services, including payment processors,
            externally hosted landing pages, and analytics or infrastructure providers.
          </p>
          <p>
            We may share your information with service providers who perform services for us. These providers
            are authorized to use your information only as necessary to provide services to us.
          </p>
          <p>
            Domz does not control and is not responsible for the privacy practices of third-party services
            not acting on our behalf.
          </p>
        </LegalSection>

        <LegalSection title="Data Security">
          <p>
            We implement reasonable administrative, technical, and organizational measures designed to
            protect information from unauthorized access, disclosure, or misuse.
          </p>
          <p>
            No system is perfectly secure. You acknowledge that use of the Platform is at your own risk.
          </p>
        </LegalSection>

        <LegalSection title="Data Retention">
          <p>
            We retain personal information only for as long as necessary to maintain your account, provide
            Platform functionality, comply with legal obligations, and resolve disputes.
          </p>
          <p>
            You may request account deletion by contacting us.
          </p>
        </LegalSection>

        <LegalSection title="Your Choices and Rights">
          <p>
            You may update or correct your account information, choose what information is displayed publicly,
            and request account deletion.
          </p>
          <p>
            Depending on your jurisdiction, you may have additional rights regarding access or deletion of
            personal information.
          </p>
        </LegalSection>

        <LegalSection title="Children’s Privacy">
          <p>
            The Platform is not intended for individuals under the age of 18. We do not knowingly collect
            personal information from minors.
          </p>
        </LegalSection>

        <LegalSection title="Changes to This Privacy Policy">
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on the Platform
            with an updated “Last Updated” date.
          </p>
          <p>
            Continued use of the Platform after changes are posted constitutes acceptance of the revised
            Privacy Policy.
          </p>
        </LegalSection>

        <LegalSection title="Governing Law">
          <p>
            This Privacy Policy is governed by the laws of the State of New Jersey, United States,
            without regard to conflict-of-law principles.
          </p>
        </LegalSection>

        <LegalSection title="Contact Information">
          <p>support@domz.com</p>
        </LegalSection>

      </LegalTemplate>
      <Footer />
    </>
  );
};

export default PrivacyPolicyPage;