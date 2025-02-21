import React from 'react'

const PrivacyPolicy = () => {
  return (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Privacy Policy</h1>

          <div className="space-y-6">
              <section>
                  <h2 className="text-2xl font-semibold mb-3 text-gray-700">1. Information We Collect</h2>
                  <p className="text-gray-600 leading-relaxed">
                      We collect information that you provide directly to us, including but not limited to:
                      name, email address, phone number, billing information, and any other information
                      you choose to provide.
                  </p>
              </section>

              <section>
                  <h2 className="text-2xl font-semibold mb-3 text-gray-700">2. How We Use Your Information</h2>
                  <p className="text-gray-600 leading-relaxed">
                      We use the information we collect to:
                      - Process your payments and orders
                      - Send you order confirmations and updates
                      - Respond to your comments and questions
                      - Send you marketing communications (with your consent)
                      - Improve our services and develop new features
                  </p>
              </section>

              <section>
                  <h2 className="text-2xl font-semibold mb-3 text-gray-700">3. Data Security</h2>
                  <p className="text-gray-600 leading-relaxed">
                      We implement appropriate security measures to protect your personal information.
                      However, no method of transmission over the Internet is 100% secure.
                  </p>
              </section>

              <p className="text-sm text-gray-500 mt-8">Last updated: [Date]</p>
          </div>
      </div>
  )
}

export default PrivacyPolicy