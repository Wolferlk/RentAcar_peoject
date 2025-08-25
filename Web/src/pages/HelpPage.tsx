import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, MessageCircle, Phone, Mail, Book } from 'lucide-react';

const HelpPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const categories = [
    {
      title: 'Getting Started',
      icon: Book,
      faqs: [
        {
          question: 'How do I create an account?',
          answer: 'Click on the "Sign Up" button in the top right corner, choose whether you want to rent cars or list your vehicle, and fill out the required information. You\'ll receive a confirmation email to verify your account.'
        },
        {
          question: 'What documents do I need to rent a car?',
          answer: 'You need a valid driver\'s license, a government-issued ID, and a credit card for the security deposit. International visitors may need an International Driving Permit.'
        },
        {
          question: 'How do I search for available cars?',
          answer: 'Use our search form on the homepage or search page. Enter your location, pickup and return dates, and any specific preferences like car type or features. You can also filter results by price, rating, and other criteria.'
        }
      ]
    },
    {
      title: 'Booking & Payment',
      icon: MessageCircle,
      faqs: [
        {
          question: 'How do I book a car?',
          answer: 'Once you find a car you like, click "View Details" to see more information. If you\'re satisfied, click "Book Now", select your dates, and complete the payment process. You\'ll receive a confirmation email with pickup instructions.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, MasterCard, American Express), debit cards, and PayPal. Payment is processed securely through our encrypted payment system.'
        },
        {
          question: 'Can I modify or cancel my booking?',
          answer: 'Yes, you can modify or cancel your booking up to 24 hours before the pickup time. Cancellation fees may apply depending on how close to the pickup date you cancel.'
        },
        {
          question: 'What happens if I return the car late?',
          answer: 'Late returns may incur additional charges based on the hourly rate. If you know you\'ll be late, contact the car owner as soon as possible to discuss options.'
        }
      ]
    },
    {
      title: 'For Car Owners',
      icon: Phone,
      faqs: [
        {
          question: 'How do I list my car?',
          answer: 'Sign up as a car owner, then click "Add Vehicle" in your dashboard. Fill out all the required information including photos, pricing, and availability. Our team will review your listing before it goes live.'
        },
        {
          question: 'How much can I earn?',
          answer: 'Earnings depend on your car type, location, and how often you rent it out. On average, owners earn $200-$1000 per month. You set your own daily rates and availability.'
        },
        {
          question: 'Is my car insured during rentals?',
          answer: 'Yes, all rentals are covered by our comprehensive insurance policy. This includes liability, collision, and comprehensive coverage. Your personal insurance remains unaffected.'
        },
        {
          question: 'How do I get paid?',
          answer: 'Payments are processed automatically after each completed rental. Funds are typically deposited to your bank account within 3-5 business days.'
        }
      ]
    },
    {
      title: 'Safety & Insurance',
      icon: Mail,
      faqs: [
        {
          question: 'What insurance coverage is provided?',
          answer: 'All rentals include comprehensive insurance covering liability, collision, and theft. The coverage includes up to $1 million in liability protection and covers damage to the vehicle.'
        },
        {
          question: 'What if there\'s an accident?',
          answer: 'In case of an accident, ensure everyone\'s safety first, then contact emergency services if needed. Report the incident to us immediately through the app or phone. Our insurance team will guide you through the claims process.'
        },
        {
          question: 'How are drivers verified?',
          answer: 'All drivers undergo background checks and license verification. We also check driving records to ensure only qualified drivers can rent vehicles on our platform.'
        }
      ]
    }
  ];

  const filteredCategories = categories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">How Can We Help?</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Find answers to common questions or get in touch with our support team
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for help articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 text-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Quick Contact */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <h3 className="text-xl font-semibold mb-6">Need More Help?</h3>
              
              <div className="space-y-4">
                <a
                  href="/contact"
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                  <div>
                    <div className="font-medium text-gray-900">Contact Support</div>
                    <div className="text-sm text-gray-500">Get personalized help</div>
                  </div>
                </a>
                
                <a
                  href="tel:+1234567890"
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Phone className="w-6 h-6 text-green-600" />
                  <div>
                    <div className="font-medium text-gray-900">Call Us</div>
                    <div className="text-sm text-gray-500">+1 (234) 567-890</div>
                  </div>
                </a>
                
                <a
                  href="mailto:support@rentacar.com"
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Mail className="w-6 h-6 text-purple-600" />
                  <div>
                    <div className="font-medium text-gray-900">Email Us</div>
                    <div className="text-sm text-gray-500">support@rentacar.com</div>
                  </div>
                </a>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Business Hours</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <div>Monday - Friday: 8:00 AM - 8:00 PM</div>
                  <div>Saturday - Sunday: 9:00 AM - 6:00 PM</div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            {filteredCategories.length === 0 ? (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">Try searching with different keywords or browse our categories below.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {filteredCategories.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <category.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <h2 className="text-2xl font-semibold text-gray-900">{category.title}</h2>
                    </div>

                    <div className="space-y-4">
                      {category.faqs.map((faq, faqIndex) => {
                        const globalIndex = categoryIndex * 100 + faqIndex;
                        return (
                          <div key={faqIndex} className="border border-gray-200 rounded-lg">
                            <button
                              onClick={() => toggleFAQ(globalIndex)}
                              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                            >
                              <span className="font-medium text-gray-900">{faq.question}</span>
                              {openFAQ === globalIndex ? (
                                <ChevronUp className="w-5 h-5 text-gray-500" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-gray-500" />
                              )}
                            </button>
                            {openFAQ === globalIndex && (
                              <div className="px-4 pb-4">
                                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;