import { motion } from 'framer-motion';
import { FiHeart, FiUsers, FiGlobe } from 'react-icons/fi';

const MissionSection: React.FC = () => {
  const missionItems = [
    {
      icon: <FiHeart className="text-primary text-3xl" />,
      title: "Compassionate Support",
      description: "We provide a safe, non-judgmental space for individuals to seek help and share their experiences."
    },
    {
      icon: <FiUsers className="text-primary text-3xl" />,
      title: "Community Building",
      description: "Connecting people with shared experiences to foster understanding and reduce isolation."
    },
    {
      icon: <FiGlobe className="text-primary text-3xl" />,
      title: "Global Awareness",
      description: "Advocating for mental health awareness and policy changes worldwide."
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our <span className="text-primary">Mission</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            EJ Foundation is committed to transforming mental health care through education, support, and advocacy. We believe everyone deserves access to quality mental health resources.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {missionItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-white mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
