import React from 'react'

const RefundPolicy = () => {
  return (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Refund & Cancellation Policy</h1>

          <div className="space-y-6">
              <section>
                  <h2 className="text-2xl font-semibold mb-3 text-gray-700">1. Refund Policy</h2>
                  <p className="text-gray-600 leading-relaxed">
                      We issue refunds for the following reasons:
                      - Product/service not as described
                      - Technical issues preventing service delivery
                      - Double charging or incorrect amount charged
                  </p>
              </section>

              <section>
                  <h2 className="text-2xl font-semibold mb-3 text-gray-700">2. Refund Process</h2>
                  <p className="text-gray-600 leading-relaxed">
                      To request a refund:
                      1. Contact our support team
                      2. Provide order details and reason for refund
                      3. Allow up to 7 business days for processing
                  </p>
              </section>

              <section>
                  <h2 className="text-2xl font-semibold mb-3 text-gray-700">3. Non-refundable Items</h2>
                  <p className="text-gray-600 leading-relaxed">
                      The following are non-refundable:
                      - Digital downloads after access
                      - Customized or personalized services
                      - Services already rendered
                  </p>
              </section>

              <p className="text-sm text-gray-500 mt-8">Last updated: [Date]</p>
          </div>
      </div>
  )
}

export default RefundPolicy