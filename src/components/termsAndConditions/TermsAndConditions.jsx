import React from 'react'

const TermsAndConditions = () => {
  return (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Terms and Conditions</h1>

          <div className="space-y-6">
              <section>
                  <h2 className="text-2xl font-semibold mb-3 text-gray-700">1. Acceptance of Terms</h2>
                  <p className="text-gray-600 leading-relaxed">
                      By accessing and using this website, you accept and agree to be bound by the terms
                      and provision of this agreement.
                  </p>
              </section>

              <section>
                  <h2 className="text-2xl font-semibold mb-3 text-gray-700">2. Use License</h2>
                  <p className="text-gray-600 leading-relaxed">
                      Permission is granted to temporarily access the materials on our website for
                      personal, non-commercial transitory viewing only.
                  </p>
              </section>

              <section>
                  <h2 className="text-2xl font-semibold mb-3 text-gray-700">3. Limitations</h2>
                  <p className="text-gray-600 leading-relaxed">
                      We shall not be held liable for any damages that result from the use of our website.
                  </p>
              </section>

              <p className="text-sm text-gray-500 mt-8">Last updated: 21/02/2025</p>
          </div>
      </div>
  )
}

export default TermsAndConditions