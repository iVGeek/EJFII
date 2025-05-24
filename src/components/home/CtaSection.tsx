import React from 'react';
import { Link } from 'react-router-dom';

const CtaSection: React.FC = () => (
  <section className="py-16 bg-primary text-white text-center">
    <div className="max-w-3xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Prioritize Your Mental Health?</h2>
      <p className="text-lg mb-8">
        Take our free assessment or explore our resources to get started on your journey to better mental well-being.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/assessment"
          className="bg-white text-primary font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300"
        >
          Take Assessment
        </Link>
        <Link
          to="/resources"
          className="bg-transparent border-2 border-white text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-white hover:text-primary transition-all duration-300"
        >
          View Resources
        </Link>
      </div>
    </div>
  </section>
);

export default CtaSection;
