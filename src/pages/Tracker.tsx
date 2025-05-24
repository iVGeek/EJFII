import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiCalendar, FiTrendingUp, FiActivity, FiSun, FiMoon } from 'react-icons/fi';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Entry = {
  id: string;
  date: string;
  mood: number;
  sleep: number;
  stress: number;
  notes: string;
};

const Tracker: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newEntry, setNewEntry] = useState<Omit<Entry, 'id'>>({
    date: new Date().toISOString().split('T')[0],
    mood: 5,
    sleep: 7,
    stress: 5,
    notes: '',
  });
  const [activeTab, setActiveTab] = useState<'mood' | 'sleep' | 'stress'>('mood');

  useEffect(() => {
    const savedEntries = localStorage.getItem('wellnessEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wellnessEntries', JSON.stringify(entries));
  }, [entries]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewEntry(prev => ({
      ...prev,
      [name]: name === 'notes' ? value : Number(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entryWithId = {
      ...newEntry,
      id: Date.now().toString(),
    };
    setEntries(prev => [...prev, entryWithId]);
    setNewEntry({
      date: new Date().toISOString().split('T')[0],
      mood: 5,
      sleep: 7,
      stress: 5,
      notes: '',
    });
    setShowForm(false);
  };

  const getMoodLabel = (value: number) => {
    if (value <= 2) return 'Very Low';
    if (value <= 4) return 'Low';
    if (value <= 6) return 'Neutral';
    if (value <= 8) return 'Good';
    return 'Excellent';
  };

  const getSleepLabel = (value: number) => {
    if (value <= 3) return 'Very Poor';
    if (value <= 5) return 'Poor';
    if (value <= 7) return 'Fair';
    if (value <= 9) return 'Good';
    return 'Excellent';
  };

  const getStressLabel = (value: number) => {
    if (value <= 2) return 'Very Low';
    if (value <= 4) return 'Low';
    if (value <= 6) return 'Moderate';
    if (value <= 8) return 'High';
    return 'Very High';
  };

  const chartData = {
    labels: entries.map(entry => new Date(entry.date).toLocaleDateString()),
    datasets: [
      {
        label: activeTab === 'mood' ? 'Mood' : activeTab === 'sleep' ? 'Sleep (hours)' : 'Stress',
        data: entries.map(entry => entry[activeTab]),
        borderColor: activeTab === 'mood' ? '#FFA500' : activeTab === 'sleep' ? '#4BC0C0' : '#FF6384',
        backgroundColor: activeTab === 'mood' ? '#FFA50080' : activeTab === 'sleep' ? '#4BC0C080' : '#FF638480',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (activeTab === 'mood') {
              label += `${context.raw} (${getMoodLabel(context.raw)})`;
            } else if (activeTab === 'sleep') {
              label += `${context.raw} (${getSleepLabel(context.raw)})`;
            } else {
              label += `${context.raw} (${getStressLabel(context.raw)})`;
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        min: activeTab === 'sleep' ? 0 : 1,
        max: activeTab === 'sleep' ? 12 : 10,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Mental Wellness Tracker</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Monitor your mood, sleep, and stress levels over time
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900/30 mr-4">
                <FiSun className="text-orange-500 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Mood</h3>
            </div>
            {entries.length > 0 ? (
              <>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {getMoodLabel(entries[entries.length - 1].mood)}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Latest: {entries[entries.length - 1].mood}/10
                </p>
              </>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No data yet</p>
            )}
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-teal-100 dark:bg-teal-900/30 mr-4">
                <FiMoon className="text-teal-500 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Sleep</h3>
            </div>
            {entries.length > 0 ? (
              <>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {getSleepLabel(entries[entries.length - 1].sleep)}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Latest: {entries[entries.length - 1].sleep} hours
                </p>
              </>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No data yet</p>
            )}
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30 mr-4">
                <FiActivity className="text-red-500 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Stress</h3>
            </div>
            {entries.length > 0 ? (
              <>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {getStressLabel(entries[entries.length - 1].stress)}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Latest: {entries[entries.length - 1].stress}/10
                </p>
              </>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No data yet</p>
            )}
          </motion.div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={() => setActiveTab('mood')}
                className={`px-4 py-2 rounded-lg font-medium flex items-center ${
                  activeTab === 'mood'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}
              >
                <FiSun className="mr-2" />
                Mood
              </button>
              <button
                onClick={() => setActiveTab('sleep')}
                className={`px-4 py-2 rounded-lg font-medium flex items-center ${
                  activeTab === 'sleep'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}
              >
                <FiMoon className="mr-2" />
                Sleep
              </button>
              <button
                onClick={() => setActiveTab('stress')}
                className={`px-4 py-2 rounded-lg font-medium flex items-center ${
                  activeTab === 'stress'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}
              >
                <FiActivity className="mr-2" />
                Stress
              </button>
            </div>

            {entries.length > 0 ? (
              <div className="h-80">
                <Line data={chartData} options={chartOptions} />
              </div>
            ) : (
              <div className="text-center py-12">
                <FiTrendingUp className="mx-auto text-4xl text-gray-400 dark:text-gray-500 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No data to display
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Start tracking your wellness to see your progress over time
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-6 rounded-lg inline-flex items-center"
                >
                  <FiPlus className="mr-2" />
                  Add Entry
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Entries</h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg inline-flex items-center"
          >
            <FiPlus className="mr-2" />
            Add Entry
          </button>
        </div>

        {entries.length > 0 ? (
          <div className="space-y-4">
            {[...entries].reverse().map(entry => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center">
                    <FiCalendar className="text-gray-500 dark:text-gray-400 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {new Date(entry.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <span className="px-2 py-1 text-xs rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200">
                      Mood: {entry.mood}/10
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-200">
                      Sleep: {entry.sleep}h
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200">
                      Stress: {entry.stress}/10
                    </span>
                  </div>
                </div>
                {entry.notes && (
                  <div className="mt-2">
                    <p className="text-gray-600 dark:text-gray-400">{entry.notes}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
            <FiCalendar className="mx-auto text-4xl text-gray-400 dark:text-gray-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No entries yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Track your first wellness entry to get started
            </p>
          </div>
        )}
      </div>

      {/* Add Entry Modal */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Add Wellness Entry</h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="date">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={newEntry.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Mood: {newEntry.mood}/10 - {getMoodLabel(newEntry.mood)}
                  </label>
                  <input
                    type="range"
                    name="mood"
                    min="1"
                    max="10"
                    value={newEntry.mood}
                    onChange={handleInputChange}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Sleep: {newEntry.sleep} hours - {getSleepLabel(newEntry.sleep)}
                  </label>
                  <input
                    type="range"
                    name="sleep"
                    min="0"
                    max="12"
                    value={newEntry.sleep}
                    onChange={handleInputChange}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-teal-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Stress: {newEntry.stress}/10 - {getStressLabel(newEntry.stress)}
                  </label>
                  <input
                    type="range"
                    name="stress"
                    min="1"
                    max="10"
                    value={newEntry.stress}
                    onChange={handleInputChange}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-red-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="notes">
                    Notes (optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={newEntry.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 rounded-lg font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg font-medium bg-primary hover:bg-primary/90 text-white"
                  >
                    Save Entry
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Tracker;
