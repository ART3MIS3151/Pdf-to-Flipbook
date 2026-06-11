import LegalLayout from './LegalLayout';

export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy">
      <div className="disclaimer-box">
        <strong>Disclaimer:</strong> This privacy policy is provided as a template
        for informational purposes only and does not constitute legal advice.
        Consult a qualified attorney to ensure compliance with all applicable laws
        and regulations.
      </div>

      <p>
        Welcome to <strong>Aria Flipbook</strong>. Your privacy is important to
        us. This Privacy Policy explains what information we collect, how we use
        it, and your rights regarding your data when you use our application.
      </p>

      <h2>1. Information We Collect</h2>

      <h3>1.1 Uploaded Files</h3>
      <p>
        When you upload a PDF file, the file is stored in{' '}
        <strong>Firebase Cloud Storage</strong> (powered by Google Cloud) so that
        it can be rendered as a flipbook and, if you choose, shared via a link.
      </p>

      <h3>1.2 Metadata</h3>
      <p>
        We store basic metadata about your uploads in{' '}
        <strong>Cloud Firestore</strong>, including the file name, upload
        timestamp, page count, and a unique share identifier.
      </p>

      <h3>1.3 Analytics &amp; Performance Data</h3>
      <p>
        We use <strong>Vercel Analytics</strong> and{' '}
        <strong>Vercel Speed Insights</strong> to collect anonymous usage and
        performance metrics such as page views, load times, and Web Vitals. These
        services may process your <strong>IP address</strong> in accordance with
        their own privacy policies.
      </p>

      <h3>1.4 IP Addresses</h3>
      <p>
        Your IP address may be logged by our hosting provider (Vercel) and cloud
        infrastructure (Google Cloud / Firebase) as part of standard server
        operations. We do not use IP addresses for tracking or profiling.
      </p>

      <h2>2. How We Use Your Data</h2>
      <ul>
        <li>To render and display your uploaded PDFs as interactive flipbooks.</li>
        <li>To generate shareable links for your flipbooks.</li>
        <li>
          To monitor and improve application performance and reliability via
          anonymous analytics.
        </li>
      </ul>

      <h2>3. Data Storage &amp; Security</h2>
      <p>
        Uploaded PDF files are stored in <strong>Firebase Cloud Storage</strong>.
        File metadata is stored in <strong>Cloud Firestore</strong>. Both services
        are operated by Google and are subject to{' '}
        <a
          href="https://firebase.google.com/support/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google's privacy and security practices
        </a>
        . We use industry-standard security measures including TLS encryption for
        data in transit.
      </p>

      <h2>4. Data Retention</h2>
      <p>
        Uploaded files and associated metadata are retained until you manually
        delete them or until they are automatically expired according to the
        retention policy in effect at the time. We reserve the right to remove
        files that have not been accessed for an extended period.
      </p>

      <h2>5. Third-Party Services</h2>
      <p>We use the following third-party services:</p>
      <ul>
        <li>
          <strong>Vercel</strong> — Hosting, serverless functions, analytics, and
          speed insights.
        </li>
        <li>
          <strong>Firebase / Google Cloud</strong> — Cloud Storage for PDF files,
          Firestore for metadata, and Authentication.
        </li>
        <li>
          <strong>Vercel Analytics</strong> — Anonymous usage metrics and Web
          Vitals.
        </li>
      </ul>
      <p>
        Each third-party service operates under its own privacy policy. We
        encourage you to review them.
      </p>

      <h2>6. Cookies</h2>
      <p>
        Aria Flipbook uses <strong>minimal cookies</strong>. We only use cookies
        that are strictly necessary for authentication sessions (e.g., Firebase
        Auth session tokens). We do not use cookies for advertising or behavioral
        tracking.
      </p>

      <h2>7. Children's Privacy (COPPA)</h2>
      <p>
        Aria Flipbook is <strong>not intended for children under 13</strong>. We
        do not knowingly collect personal information from children under 13 years
        of age. If you believe a child under 13 has provided us with personal
        data, please contact us and we will promptly delete it.
      </p>

      <h2>8. Your Rights (GDPR / CCPA)</h2>
      <p>
        Depending on your jurisdiction, you may have the following rights
        regarding your personal data:
      </p>
      <ul>
        <li>
          <strong>Right to Access</strong> — Request a copy of the personal data
          we hold about you.
        </li>
        <li>
          <strong>Right to Deletion</strong> — Request that we delete your
          personal data and uploaded files.
        </li>
        <li>
          <strong>Right to Data Portability</strong> — Receive your data in a
          structured, commonly-used format.
        </li>
        <li>
          <strong>Right to Rectification</strong> — Request correction of
          inaccurate personal data.
        </li>
        <li>
          <strong>Right to Object</strong> — Object to or restrict certain
          processing of your data.
        </li>
      </ul>
      <p>
        To exercise any of these rights, please contact us at{' '}
        <a href="mailto:contact@ariaflipbook.com">contact@ariaflipbook.com</a>.
      </p>

      <h2>9. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Changes will be
        reflected by the "Last Updated" date at the top of this page. Your
        continued use of Aria Flipbook after any changes constitutes acceptance of
        the updated policy.
      </p>

      <h2>10. Contact Us</h2>
      <p>
        If you have questions or concerns about this Privacy Policy, please
        contact us at{' '}
        <a href="mailto:contact@ariaflipbook.com">contact@ariaflipbook.com</a>.
      </p>
    </LegalLayout>
  );
}
