import LegalLayout from './LegalLayout';

export default function TermsOfService() {
  return (
    <LegalLayout title="Terms of Service">
      <div className="disclaimer-box">
        <strong>Disclaimer:</strong> These terms are provided as a template for
        informational purposes only and do not constitute legal advice. Consult a
        qualified attorney before relying on these terms.
      </div>

      <p>
        By accessing or using <strong>Aria Flipbook</strong> (the "Service"), you
        agree to be bound by these Terms of Service ("Terms"). If you do not agree
        to these Terms, do not use the Service.
      </p>

      <h2>1. Acceptable Use</h2>
      <p>You agree not to use the Service to:</p>
      <ul>
        <li>
          Upload, store, or distribute any content that is illegal, obscene,
          defamatory, or otherwise harmful.
        </li>
        <li>
          Upload copyrighted material that you do not own or do not have explicit
          permission to use.
        </li>
        <li>
          Distribute malware, viruses, or any other malicious code via uploaded
          files.
        </li>
        <li>
          Attempt to gain unauthorized access to the Service, other users'
          accounts, or our infrastructure.
        </li>
        <li>
          Use the Service for spam, phishing, or any form of unsolicited bulk
          communication.
        </li>
        <li>
          Interfere with or disrupt the Service or place an unreasonable load on
          our systems.
        </li>
      </ul>

      <h2>2. User Content &amp; Responsibilities</h2>
      <p>
        You retain full ownership of any content (PDF files, documents) you upload
        to the Service. By uploading content, you grant Aria Flipbook a{' '}
        <strong>
          limited, non-exclusive, royalty-free, worldwide license
        </strong>{' '}
        to store, process, render, and serve your content solely for the purpose
        of providing the Service to you (e.g., displaying flipbooks and
        generating shareable links).
      </p>
      <p>
        You are solely responsible for all content you upload. You represent and
        warrant that you have all necessary rights and permissions to upload and
        share such content and that it does not infringe on any third party's
        intellectual property or other rights.
      </p>

      <h2>3. Limitation of Liability</h2>
      <p>
        The Service is provided <strong>"AS IS"</strong> and{' '}
        <strong>"AS AVAILABLE"</strong> without warranties of any kind, whether
        express, implied, or statutory. We do not warrant that the Service will be
        uninterrupted, error-free, or secure.
      </p>
      <p>
        To the fullest extent permitted by applicable law, Aria Flipbook and its
        operators shall not be liable for any indirect, incidental, special,
        consequential, or punitive damages, including but not limited to loss of
        data, revenue, profits, or business opportunities, arising out of or
        related to your use of the Service.
      </p>

      <h2>4. Indemnification</h2>
      <p>
        You agree to indemnify, defend, and hold harmless Aria Flipbook, its
        operators, and affiliates from and against any claims, liabilities,
        damages, losses, and expenses (including reasonable attorney's fees)
        arising out of or in any way connected with:
      </p>
      <ul>
        <li>Your use of the Service.</li>
        <li>Content you upload or share through the Service.</li>
        <li>Your violation of these Terms.</li>
        <li>
          Your violation of any rights of a third party, including intellectual
          property rights.
        </li>
      </ul>

      <h2>5. Termination</h2>
      <p>
        We reserve the right, at our sole discretion, to suspend or terminate your
        access to the Service and remove any content you have uploaded, at any
        time and for any reason, without prior notice or liability. Reasons for
        termination may include, but are not limited to:
      </p>
      <ul>
        <li>Violation of these Terms.</li>
        <li>Uploading prohibited or infringing content.</li>
        <li>Abuse of the Service or its infrastructure.</li>
        <li>Receipt of valid legal or DMCA takedown requests.</li>
      </ul>

      <h2>6. DMCA &amp; Copyright Infringement</h2>
      <p>
        We respect intellectual property rights and comply with the Digital
        Millennium Copyright Act (DMCA). If you believe content hosted on the
        Service infringes your copyright, please review our{' '}
        <a href="/dmca">DMCA Policy</a> for instructions on submitting a takedown
        request.
      </p>

      <h2>7. Modifications to These Terms</h2>
      <p>
        We may revise these Terms at any time by updating this page. The "Last
        Updated" date at the top indicates when the latest changes were made.
        Continued use of the Service after changes constitutes your acceptance of
        the revised Terms.
      </p>

      <h2>8. Governing Law</h2>
      <p>
        These Terms shall be governed by and construed in accordance with
        applicable law, without regard to conflict of law principles. Any disputes
        arising under these Terms shall be resolved in the courts of competent
        jurisdiction.
      </p>

      <h2>9. Contact Us</h2>
      <p>
        If you have questions about these Terms, please contact us at{' '}
        <a href="mailto:contact@ariaflipbook.com">contact@ariaflipbook.com</a>.
      </p>
    </LegalLayout>
  );
}
