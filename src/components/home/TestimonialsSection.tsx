import React from 'react';

const testimonials = [
  {
    name: 'Jane Doe',
    text: 'EJ Foundation helped me find the support I needed. Their resources are invaluable!',
  },
  {
    name: 'John Smith',
    text: 'The assessment tool gave me insight into my mental health. Highly recommended!',
  },
  {
    name: 'Priya Patel',
    text: 'I love the community and the events. I feel less alone on my journey.',
  },
];

const TestimonialsSection: React.FC = () => (
  <section className="py-16 bg-white dark:bg-gray-900">
    <div className="max-w-5xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-10">What People Are Saying</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div key={testimonial.name} className="bg-primary/10 dark:bg-primary/20 rounded-lg shadow p-6 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-bold text-2xl mb-4">
              {testimonial.name[0]}
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">"{testimonial.text}"</p>
            <span className="font-semibold text-primary">{testimonial.name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
