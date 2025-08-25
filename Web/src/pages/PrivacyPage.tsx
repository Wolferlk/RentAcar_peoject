import React from 'react';
import { Shield, Eye, Lock, Database, Users, Globe } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  const sections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: [
        'Personal information you provide when creating an account (name, email, phone number)',
        'Driver\'s license and identity verification documents',
        'Payment information and billing details',
        'Vehicle information for car owners (make, model, photos, location)',
        'Usage data and interaction with our platform',
        'Location data when using our mobile app (with your permission)'
      ]
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: [
        'To provide and improve our car sharing services',
        'To verify your identity and eligibility to rent or list vehicles',
        'To process payments and prevent fraud',
        'To communicate with you about bookings and account updates',
        'To provide customer support and resolve disputes',
        'To send marketing communications (with your consent)'
      ]
    },
    {
      icon: Users,
      title: 'Information Sharing',
      content: [
        'With other users as necessary to facilitate rentals (contact info, vehicle details)',
        'With service providers who help us operate our platform',
        'With insurance companies for coverage and claims processing',
        'With law enforcement when required by law or to protect safety',
        'With business partners for integrated services (with your consent)',
        'In connection with business transfers or acquisitions'
      ]
    },
    {
      icon: Lock,
      title: 'Data Security',
      content: [
        'We use industry-standard encryption to protect your data',
        'Secure servers and regular security audits',
        'Limited access to personal information on a need-to-know basis',
        'Regular monitoring for unauthorized access or breaches',
        'Secure payment processing through certified providers',
        'Data backup and recovery procedures'
      ]
    }
  ];

  const rights = [
    {
      title: 'Access Your Data',
      description: 'Request a copy of the personal information we have about you'
    },
    {
      title: 'Correct Information',
      description: 'Update or correct any inaccurate personal information'
    },
    {
      title: 'Delete Your Data',
      description: 'Request deletion of your personal information (subject to legal requirements)'
    },
    {
      title: 'Data Portability',
      description: 'Receive your data in a structured, machine-readable format'
    },
    {
      title: 'Opt-Out',
      description: 'Unsubscribe from marketing communications at any time'
    },
    {
      title: 'Restrict Processing',
      description: 'Limit how we use your personal information in certain circumstances'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
          <p className="text-purple-200">Last updated: January 1, 2024</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Privacy</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              At RentACar, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, share, and protect your information when you use our platform.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We believe in transparency and want you to understand exactly how your information is handled. 
              If you have any questions about this policy, please don't hesitate to contact us.
            </p>
          </div>

          {/* Main Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-600 leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Your Rights */}
          <div className="bg-white rounded-xl shadow-md p-8 mt-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Your Privacy Rights</h2>
            </div>
            <p className="text-gray-600 mb-6">
              You have several rights regarding your personal information. Here's what you can do:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rights.map((right, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{right.title}</h3>
                  <p className="text-gray-600 text-sm">{right.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Globe className="w-6 h-6 mr-2 text-blue-600" />
                International Transfers
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Your information may be transferred to and processed in countries other than your own. 
                We ensure appropriate safeguards are in place to protect your data during international transfers, 
                including using standard contractual clauses and ensuring adequate data protection laws.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Lock className="w-6 h-6 mr-2 text-green-600" />
                Data Retention
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We retain your personal information only as long as necessary to provide our services and comply with legal obligations. 
                Account information is typically retained for 7 years after account closure for legal and regulatory purposes.
              </p>
            </div>
          </div>

          {/* Cookies Section */}
          <div className="bg-white rounded-xl shadow-md p-8 mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Cookies and Tracking</h3>
            <p className="text-gray-600 mb-4">
              We use cookies and similar technologies to improve your experience on our platform:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Essential Cookies</h4>
                <p className="text-gray-600 text-sm">Required for basic platform functionality and security</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Analytics Cookies</h4>
                <p className="text-gray-600 text-sm">Help us understand how you use our platform to improve it</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Marketing Cookies</h4>
                <p className="text-gray-600 text-sm">Used to show you relevant ads and measure campaign effectiveness</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-purple-50 rounded-xl p-8 mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Our Privacy Team</h3>
            <p className="text-gray-600 mb-4">
              If you have questions about this Privacy Policy or want to exercise your privacy rights, contact us:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Email</h4>
                <p className="text-gray-600">privacy@rentacar.com</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Mail</h4>
                <p className="text-gray-600">
                  RentACar Privacy Team<br />
                  123 Main Street<br />
                  Downtown, City 12345
                </p>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center mt-8 p-6 bg-gray-100 rounded-xl">
            <p className="text-gray-600 text-sm">
              This Privacy Policy may be updated from time to time. We will notify you of any material changes 
              by email or through our platform. Your continued use of our services after changes constitutes 
              acceptance of the updated policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;