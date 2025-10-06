import React from 'react';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';

const TermsOfService = () => {
  return (
    <>
      <SEO 
        title="Terms of Service - Jay Ambe Construction"
        description="Terms of Service for Jay Ambe Construction. Read our terms and conditions for using our website and services."
        url="https://jay-ambe-construction.vercel.app/terms-of-service"
      />
      
      <div className="pt-16 lg:pt-20 min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-lg text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700">
                By accessing and using the Jay Ambe Construction website, you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Use License</h2>
              <p className="text-gray-700 mb-4">
                Permission is granted to temporarily download one copy of the materials on Jay Ambe Construction's website 
                for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Services</h2>
              <p className="text-gray-700 mb-4">
                Jay Ambe Construction provides construction and related services. All services are subject to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Separate written agreements and contracts</li>
                <li>Site inspections and assessments</li>
                <li>Applicable building codes and regulations</li>
                <li>Permits and approvals from local authorities</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Disclaimer</h2>
              <p className="text-gray-700">
                The materials on Jay Ambe Construction's website are provided on an 'as is' basis. Jay Ambe Construction 
                makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including 
                without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, 
                or non-infringement of intellectual property or other violation of rights.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Limitations</h2>
              <p className="text-gray-700">
                In no event shall Jay Ambe Construction or its suppliers be liable for any damages (including, without 
                limitation, damages for loss of data or profit, or due to business interruption) arising out of the use 
                or inability to use the materials on Jay Ambe Construction's website, even if Jay Ambe Construction or 
                an authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Accuracy of Materials</h2>
              <p className="text-gray-700">
                The materials appearing on Jay Ambe Construction's website could include technical, typographical, or 
                photographic errors. Jay Ambe Construction does not warrant that any of the materials on its website 
                are accurate, complete, or current. Jay Ambe Construction may make changes to the materials contained 
                on its website at any time without notice.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Links</h2>
              <p className="text-gray-700">
                Jay Ambe Construction has not reviewed all of the sites linked to its website and is not responsible 
                for the contents of any such linked site. The inclusion of any link does not imply endorsement by 
                Jay Ambe Construction of the site. Use of any such linked website is at the user's own risk.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Modifications</h2>
              <p className="text-gray-700">
                Jay Ambe Construction may revise these terms of service for its website at any time without notice. 
                By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Governing Law</h2>
              <p className="text-gray-700">
                These terms and conditions are governed by and construed in accordance with the laws of India and 
                you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="text-gray-700">
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

export default TermsOfService;
