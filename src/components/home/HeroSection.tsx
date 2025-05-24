import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-r from-primary/10 to-black/10 dark:from-primary/20 dark:to-black/20 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Mental Health <span className="text-primary">Matters</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
              At EJ Foundation, we're dedicated to breaking the stigma around mental health and providing accessible resources for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/assessment"
                className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
              >
                Take Our Assessment
              </Link>
              <Link
                to="/resources"
                className="bg-transparent border-2 border-primary text-primary dark:text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
              >
                Explore Resources
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-primary/20 rounded-3xl p-8 backdrop-blur-sm">
              <img
                src="/images/hero-image.png"
                alt="Mental health awareness"
                className="rounded-2xl shadow-xl w-full h-auto"
              />
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg"
              >
                <div className="flex items-center">
                  <div className="bg-primary/10 p-3 rounded-full mr-3">
                    <FiArrowRight className="text-primary text-xl" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Join our community
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Over 10,000 members
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
