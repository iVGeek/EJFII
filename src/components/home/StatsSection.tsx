import React from 'react';

const stats = [
  { label: 'Community Members', value: '10,000+' },
  { label: 'Resources Shared', value: '500+' },
  { label: 'Events Hosted', value: '50+' },
  { label: 'Assessments Taken', value: '2,000+' },
];

const StatsSection: React.FC = () => (
  <section className="py-16 bg-primary/10 dark:bg-primary/20">
    <div className="max-w-5xl mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
            <div className="text-gray-700 dark:text-gray-300 text-lg">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
