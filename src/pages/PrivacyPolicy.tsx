import React from 'react';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';

const PrivacyPolicy = () => {
  return (
    <>
      <SEO 
        title="Privacy Policy - Jay Ambe Construction"
        description="Privacy Policy for Jay Ambe Construction website. Learn how we collect, use, and protect your personal information."
        url="https://jay-ambe-construction.vercel.app/privacy-policy"
      />
      
      <div className="pt-16 lg:pt-20 min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 mb-4">
                We collect information you provide directly to us, such as when you:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Fill out our contact form</li>
                <li>Request project information</li>
                <li>Communicate with us via email or phone</li>
                <li>Use our website services</li>
              </ul>
              <p className="text-gray-700 mt-4">
                This may include your name, email address, phone number, project details, and any other information you choose to provide.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Respond to your inquiries and provide customer service</li>
                <li>Send you information about our services</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
                <li>Protect against fraud and abuse</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
              <p className="text-gray-700 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>To trusted service providers who assist us in operating our website</li>
                <li>When required by law or to protect our rights</li>
                <li>In connection with a business transfer or acquisition</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
              <p className="text-gray-700">
                We implement appropriate security measures to protect your personal information against unauthorized access, 
                alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Cookies and Tracking</h2>
              <p className="text-gray-700">
                Our website may use cookies and similar tracking technologies to enhance your experience. 
                You can control cookie settings through your browser preferences.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Third-Party Services</h2>
              <p className="text-gray-700">
                Our website may contain links to third-party websites. We are not responsible for the privacy 
                practices of these external sites. We encourage you to review their privacy policies.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Your Rights</h2>
              <p className="text-gray-700 mb-4">You have the right to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Changes to This Policy</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. We will notify you of any changes by 
                posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Us</h2>
              <p className="text-gray-700">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-4 text-gray-700">
                <p><strong>Jay Ambe Construction</strong></p>
                <p>Email: info@jayambeconstruction.com</p>
                <p>Phone: +91 95868 22668</p>
                <p>Address: 1304, 13TH FLOOR GANESH GLORY<br />
                NEAR BSNL OFFICE, JAGATPUR-CHENPUR ROAD<br />
                S.G.HIGHWAY, JAGATPUR<br />
                AHMEDABAD-382481, GUJARAT</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
