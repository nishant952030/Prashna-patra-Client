import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Brain, BarChart3, Clock, BookOpen, Award, ArrowRight, Sparkles, X } from "lucide-react";
import TestFormUnAuthorized from "./TestForm.jsx"; // Import your test form

const TestFormLanding = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute w-96 h-96 bg-orange-500/20 rounded-full blur-3xl -top-40 -right-40"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -bottom-40 -left-40"
          />
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-500/50 rounded-full mb-6"
          >
            <Sparkles size={18} className="text-orange-400" />
            <span className="text-sm font-semibold text-orange-300">AI-Powered Test Generation</span>
          </motion.div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            Create Tests in
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Seconds, Not Hours
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            AI-powered test generator for educators & students. Create unlimited question papers with custom difficulty, instant insights, and zero manual work.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 border border-orange-400/50 transition text-lg"
            >
              <Zap size={24} />
              Generate Your First Test Free
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg border border-white/30 transition text-lg flex items-center justify-center gap-2"
            >
              Watch Demo
              <ArrowRight size={20} />
            </motion.button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              1000+ Educators
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              50K+ Tests Created
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              4.8/5 Rating
            </div>
          </div>
        </motion.div>

        {/* Hero Image/Screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-5xl"
        >
          <div className="w-full rounded-t-3xl shadow-2xl shadow-orange-500/20 border-t border-white/10 bg-slate-800/50 p-8">
            <div className="text-center text-gray-400">Dashboard Preview Coming Soon</div>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="relative py-20 px-4 bg-slate-900/50 backdrop-blur mt-40">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">Why Choose Prashna Patra?</h2>
            <p className="text-gray-400 text-lg">Save time, improve quality, engage students</p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Brain size={32} />,
                title: "AI-Powered Generation",
                desc: "Smart AI creates diverse, relevant questions in seconds"
              },
              {
                icon: <Clock size={32} />,
                title: "Save 10+ Hours Weekly",
                desc: "No more manual question writing or paper formatting"
              },
              {
                icon: <BarChart3 size={32} />,
                title: "Instant Analytics",
                desc: "Track student performance with real-time insights"
              },
              {
                icon: <BookOpen size={32} />,
                title: "Multiple Subjects",
                desc: "Math, Science, English, History, Geography & more"
              },
              {
                icon: <Award size={32} />,
                title: "Customizable Difficulty",
                desc: "Easy, Medium, Hard - adjust to your needs"
              },
              {
                icon: <Zap size={32} />,
                title: "Lightning Fast",
                desc: "Generate full test papers in under 1 minute"
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-xl hover:border-orange-500/50 transition group"
              >
                <div className="text-orange-400 mb-4 group-hover:scale-110 transition">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">Loved by Educators</h2>
            <p className="text-gray-400 text-lg">See what teachers are saying</p>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Priya Sharma",
                role: "Mathematics Teacher",
                text: "Reduced my test creation time from 3 hours to 10 minutes. A game-changer!",
                rating: 5
              },
              {
                name: "Rajesh Kumar",
                role: "School Principal",
                text: "Our teachers love it. Student engagement has increased significantly.",
                rating: 5
              },
              {
                name: "Ananya Singh",
                role: "Tutor",
                text: "The analytics help me track my students' progress like never before.",
                rating: 5
              }
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 bg-slate-800/50 border border-white/10 rounded-xl"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-300 mb-4">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 px-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 border-y border-orange-500/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50K+", label: "Tests Created" },
              { number: "1000+", label: "Educators" },
              { number: "500K+", label: "Students" },
              { number: "99%", label: "Satisfaction" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
              >
                <h3 className="text-4xl md:text-5xl font-black text-orange-400 mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Save Hours on Test Creation?</h2>
            <p className="text-xl mb-8 opacity-90">Join 1000+ educators using Prashna Patra</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="px-10 py-4 bg-white text-orange-600 font-bold rounded-lg shadow-lg hover:shadow-xl transition text-lg"
            >
              Create Your First Test Now
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl relative max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition"
              >
                <X size={24} />
              </motion.button>

              {/* Test Form */}
              <TestFormUnAuthorized />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TestFormLanding;
