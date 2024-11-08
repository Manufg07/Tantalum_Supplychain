import React from "react";
import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <header className="bg-blue-900 text-white py-20">
        <motion.div
          className="container mx-auto px-4 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Tantalum Supply Chain
          </h1>
          <p className="text-lg md:text-2xl mb-6">
            A blockchain-based solution for managing and tracking tantalum from
            mine to market.
          </p>
          <motion.div
            className="flex justify-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <a
              href="#organization"
              className="bg-white text-blue-900 font-semibold py-3 px-6 rounded shadow hover:bg-blue-100 transition duration-300"
            >
              Explore Organizations
            </a>
            <a
              href="#features"
              className="bg-blue-700 text-white font-semibold py-3 px-6 rounded shadow hover:bg-blue-800 transition duration-300"
            >
              View Features
            </a>
          </motion.div>
        </motion.div>
      </header>

      {/* Organization Section */}
      <section id="organization" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-12">
            Select an Organization
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {organizations.map((org) => (
              <motion.div
                key={org.title}
                className="bg-white shadow-lg rounded-lg p-6 text-center cursor-pointer hover:bg-blue-100 transition"
                onClick={() => (window.location.href = org.link)}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-4xl mb-4">{org.icon}</div>
                <h3 className="text-2xl font-semibold text-blue-900 mb-2">
                  {org.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <motion.div
          className="container mx-auto px-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-blue-900 mb-12">
            Our Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Call to Action Section */}
      <section id="cta" className="py-20 bg-blue-900 text-white text-center">
        <motion.div
          className="container mx-auto px-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-4">
            Start Managing Tantalum Ore Now
          </h2>
          <p className="text-lg mb-8">
            Easily register, track, and verify tantalum ore with our
            blockchain-based platform.
          </p>
          <a
            href="/register"
            className="bg-white text-blue-900 font-semibold py-3 px-6 rounded shadow hover:bg-blue-100 transition duration-300"
          >
            Register Now
          </a>
        </motion.div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Tantalum Supply Chain. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

// Organization data
const organizations = [
  {
    title: "Mining Company",
    icon: "⛏️",
    link: "Dash",
  },
  {
    title: "Refining Company",
    icon: "🏭",
    link: "Refinedash",
  },
  {
    title: "Manufacturing Company",
    icon: "🏗️",
    link: "Manu",
  },
  {
    title: "Certification Authority",
    icon: "📜",
    link: "CA",
  },
];

// Features data
const features = [
  {
    title: "Track Ore Provenance",
    description:
      "Trace the origin and journey of tantalum from mining sites to end-users.",
    icon: "🌍",
  },
  {
    title: "Secure Private Data",
    description: "Maintain private data securely for authorized entities only.",
    icon: "🔒",
  },
  {
    title: "Real-Time Updates",
    description: "Get real-time updates and notifications on ore transactions.",
    icon: "⏱️",
  },
];

// Feature Card Component
function FeatureCard({ title, description, icon }) {
  return (
    <motion.div
      className="bg-white shadow-lg rounded-lg p-6 text-center"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-2xl font-semibold text-blue-900 mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </motion.div>
  );
}

export default LandingPage;
