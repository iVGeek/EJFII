import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

type Question = {
  id: number;
  text: string;
  options: {
    value: number;
    label: string;
  }[];
};

const questions: Question[] = [
  {
    id: 1,
    text: "Over the last 2 weeks, how often have you felt little interest or pleasure in doing things?",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" },
    ],
  },
  {
    id: 2,
    text: "Over the last 2 weeks, how often have you felt down, depressed, or hopeless?",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" },
    ],
  },
  {
    id: 3,
    text: "Over the last 2 weeks, how often have you had trouble falling or staying asleep, or sleeping too much?",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" },
    ],
  },
  {
    id: 4,
    text: "Over the last 2 weeks, how often have you felt tired or had little energy?",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" },
    ],
  },
  {
    id: 5,
    text: "Over the last 2 weeks, how often have you had poor appetite or overeaten?",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" },
    ],
  },
];

const Assessment: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

  const handleOptionSelect = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    return answers.reduce((sum, answer) => sum + (answer !== -1 ? answer : 0), 0);
  };

  const getResultMessage = (score: number) => {
    if (score <= 4) return "Your responses suggest minimal symptoms of depression.";
    if (score <= 9) return "Your responses suggest mild symptoms of depression. Consider self-care strategies and monitoring your mood.";
    if (score <= 14) return "Your responses suggest moderate symptoms of depression. Consider reaching out to a mental health professional.";
    return "Your responses suggest severe symptoms of depression. We strongly recommend seeking help from a mental health professional.";
  };

  const resetAssessment = () => {
    setAnswers(Array(questions.length).fill(-1));
    setCurrentQuestion(0);
    setCompleted(false);
  };

  if (completed) {
    const score = calculateScore();
    const resultMessage = getResultMessage(score);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900"
      >
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
              Your Assessment Results
            </h2>
            
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Your score: {score}/15</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {score <= 4 ? "Minimal" : score <= 9 ? "Mild" : score <= 14 ? "Moderate" : "Severe"}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div
                  className="bg-primary h-4 rounded-full"
                  style={{ width: `${(score / 15) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-3">
                {score <= 4 ? "You're doing well!" : "Consider these suggestions"}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{resultMessage}</p>
              
              <div className="space-y-3">
                {score > 4 && (
                  <>
                    <div className="flex items-start">
                      <span className="flex-shrink-0 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full p-1 mr-3">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <p className="text-gray-700 dark:text-gray-300">
                        Practice self-care: regular exercise, healthy eating, and sufficient sleep.
                      </p>
                    </div>
                    <div className="flex items-start">
                      <span className="flex-shrink-0 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full p-1 mr-3">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <p className="text-gray-700 dark:text-gray-300">
                        Connect with supportive friends or family members.
                      </p>
                    </div>
                  </>
                )}
                {score > 9 && (
                  <div className="flex items-start">
                    <span className="flex-shrink-0 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full p-1 mr-3">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">
                      Consider reaching out to a mental health professional for support.
                    </p>
                  </div>
                )}
                {score > 14 && (
                  <div className="flex items-start">
                    <span className="flex-shrink-0 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full p-1 mr-3">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">
                      We strongly recommend seeking professional help as soon as possible.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={resetAssessment}
                className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-3 px-6 rounded-lg transition-colors duration-300"
              >
                Retake Assessment
              </button>
              <button
                onClick={() => navigate('/resources')}
                className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
              >
                View Resources
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900"
    >
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
            Mental Health Self-Assessment
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
            This anonymous assessment is designed to help you reflect on your mental well-being over the past two weeks.
          </p>

          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm font-medium text-primary">
                {answers[currentQuestion] !== -1 ? "Answered" : "Not answered"}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {questions[currentQuestion].text}
            </h3>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
                    answers[currentQuestion] === option.value
                      ? "border-primary bg-primary/10 dark:bg-primary/20"
                      : "border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => handleOptionSelect(option.value)}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                        answers[currentQuestion] === option.value
                          ? "border-primary bg-primary"
                          : "border-gray-400 dark:border-gray-500"
                      }`}
                    >
                      {answers[currentQuestion] === option.value && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{option.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`py-2 px-6 rounded-lg font-medium ${
                currentQuestion === 0
                  ? "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                  : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={answers[currentQuestion] === -1}
              className={`py-2 px-6 rounded-lg font-medium ${
                answers[currentQuestion] === -1
                  ? "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                  : "bg-primary hover:bg-primary/90 text-white"
              }`}
            >
              {currentQuestion === questions.length - 1 ? "See Results" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Assessment;
