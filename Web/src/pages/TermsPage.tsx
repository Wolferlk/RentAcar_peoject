import React from 'react';
import { Shield, FileText, Users, AlertTriangle } from 'lucide-react';

const TermsPage: React.FC = () => {
  const sections = [
    {
      icon: FileText,
      title: 'Agreement Overview',
      content: [
        'These Terms of Service ("Terms") govern your use of the RentACar platform and services.',
        'By accessing or using our services, you agree to be bound by these Terms.',
        'If you do not agree to these Terms, you may not use our services.',
        'We may update these Terms from time to time, and your continued use constitutes acceptance of any changes.'
      ]
    },
    {
      icon: Users,
      title: 'User Accounts',
      content: [
        'You must be at least 21 years old to rent a vehicle and 18 years old to list a vehicle.',
        'You are responsible for maintaining the confidentiality of your account credentials.',
        'You must provide accurate and complete information when creating your account.',
        'You are responsible for all activities that occur under your account.',
        'We reserve the right to suspend or terminate accounts that violate these Terms.'
      ]
    },
    {
      icon: Shield,
      title: 'Vehicle Rentals',
      content: [
        'All drivers must possess a valid driver\'s license and meet our eligibility requirements.',
        'Vehicles must be returned in the same condition as received, normal wear and tear excepted.',
        'Smoking, pets, and illegal activities are prohibited in all vehicles unless explicitly permitted.',
        'You are responsible for any traffic violations, tolls, or parking fees incurred during the rental period.',
        'Late returns may result in additional charges as specified in the rental agreement.'
      ]
    },
    {
      icon: AlertTriangle,
      title: 'Prohibited Uses',
      content: [
        'Using vehicles for illegal activities, racing, or off-road driving.',
        'Subletting or transferring the rental to unauthorized parties.',
        'Tampering with or disabling vehicle tracking or safety systems.',
        'Providing false information or documentation.',
        'Using the platform to harass, threaten, or harm other users.'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Please read these terms carefully before using our services
          </p>
          <p className="text-gray-300">Last updated: January 1, 2024</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to RentACar</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              RentACar operates a peer-to-peer car sharing marketplace that connects car owners with people who need to rent vehicles. 
              These Terms of Service outline the rules and regulations for using our platform and services.
            </p>
            <p className="text-gray-600 leading-relaxed">
              By using RentACar, you enter into a legal agreement with us. Please take the time to read and understand these terms, 
              as they affect your rights and obligations.
            </p>
          </div>

          {/* Main Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-600 leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Additional Terms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Payment Terms</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• All payments are processed securely through our platform</li>
                <li>• Security deposits are held and released according to our policy</li>
                <li>• Refunds are processed within 5-7 business days</li>
                <li>• Additional fees may apply for damages or violations</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Insurance & Liability</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• All rentals include comprehensive insurance coverage</li>
                <li>• Users are responsible for deductibles as outlined in the policy</li>
                <li>• Personal belongings are not covered by our insurance</li>
                <li>• Report all incidents immediately to our support team</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Cancellation Policy</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Free cancellation up to 24 hours before pickup</li>
                <li>• Partial refunds for cancellations within 24 hours</li>
                <li>• No refund for no-shows or late cancellations</li>
                <li>• Emergency cancellations are reviewed case-by-case</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Dispute Resolution</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Contact our support team for assistance with disputes</li>
                <li>• Mediation services available for unresolved issues</li>
                <li>• Binding arbitration for legal disputes</li>
                <li>• Class action lawsuits are waived under these terms</li>
              </ul>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-blue-50 rounded-xl p-8 mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Questions About These Terms?</h3>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms of Service, please don't hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/contact"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                Contact Support
              </a>
              <a
                href="mailto:legal@rentacar.com"
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-colors text-center"
              >
                Email Legal Team
              </a>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center mt-8 p-6 bg-gray-100 rounded-xl">
            <p className="text-gray-600 text-sm">
              These Terms of Service are effective as of January 1, 2024. We reserve the right to update these terms at any time. 
              Continued use of our services after changes constitutes acceptance of the new terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;