import React from 'react'

const ContactUs = () => {
  return (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Contact Us</h1>

          <div className="space-y-6">
              <section>
                  <h2 className="text-2xl font-semibold mb-3 text-gray-700">Get in Touch</h2>
                  <div className="text-gray-600 leading-relaxed space-y-2">
                      <p>Email:prashnapatra@gmail.com</p>
                      <p>Phone: 9520303583</p>
                  </div>
              </section>

              <section>
                  <h2 className="text-2xl font-semibold mb-3 text-gray-700">Response Time</h2>
                  <p className="text-gray-600 leading-relaxed">
                      We aim to respond to all inquiries within 3 business days.
                      For urgent matters, please contact us by phone.
                  </p>
              </section>
          </div>
      </div>
  )
}

export default ContactUs