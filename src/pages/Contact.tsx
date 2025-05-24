import React from 'react';

const Contact: React.FC = () => (
  <div className="container mx-auto py-12 px-4">
    <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
    <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
      Have questions or want to get in touch? Fill out the form below or email us at <a href="mailto:info@ejfoundation.org" className="text-primary underline">info@ejfoundation.org</a>.
    </p>
    {/* Contact form can be added here */}
  </div>
);

export default Contact;
