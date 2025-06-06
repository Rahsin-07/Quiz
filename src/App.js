import { useState } from 'react';

import './style.css';

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "London", "Paris", "Madrid"],
    answer: "Paris",
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Picasso", "Da Vinci", "Michelangelo"],
    answer: "Da Vinci",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Colorful Style Sheets",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    question: "Which year was JavaScript created?",
    options: ["1990", "1995", "2000", "2005"],
    answer: "1995",
  },
  {
    question: "What does HTTP stand for?",
    options: [
      "HyperText Transfer Protocol",
      "HighText Transfer Protocol",
      "HyperText Transmission Protocol",
      "Home Tool Transfer Protocol",
    ],
    answer: "HyperText Transfer Protocol",
  },
  {
    question: "Which company created React?",
    options: ["Google", "Facebook", "Microsoft", "Amazon"],
    answer: "Facebook",
  },
  {
    question: "What is the largest planet?",
    options: ["Earth", "Venus", "Jupiter", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "Which HTML tag is used for JavaScript?",
    options: ["<script>", "<js>", "<javascript>", "<code>"],
    answer: "<script>",
  },
  {
    question: "Which keyword is used to declare a constant in JS?",
    options: ["var", "let", "const", "define"],
    answer: "const",
  },
];

function App() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQ]: option });
  };

  const handleNext = () => {
    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
    }
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.answer) {
        score++;
      }
    });
    return score;
  };

  const score = calculateScore();
  const percentage = ((score / questions.length) * 100);

  return (
    <div className="quiz-page">
      <h1 style={{ textAlign: "center" }}>It's Quiz Time</h1>
      <div className="quizBox">
        {!showResult ? (
          <div className="questions">
            <h3>
              Question {currentQ + 1} of {questions.length}
            </h3>
            <p style={{ fontWeight: "bolder" }}>{questions[currentQ].question}</p>

            <div className="options">
              {questions[currentQ].options.map((option, index) => (
                <label key={index} className="option-label">
                  <input
                    type="radio"
                    name={`question-${currentQ}`}
                    value={option}
                    checked={selectedAnswers[currentQ] === option}
                    onChange={() => handleOptionClick(option)}
                  />
                  {option}
                </label>
              ))}
            </div>

            <div className="actions">
              <button onClick={handlePrev} disabled={currentQ === 0} type="button" className="btn btn-primary">
                Prev
              </button>

              <button className="btn btn-primary" onClick={handleNext}>
                {currentQ === questions.length - 1 ? 'Finish' : 'Next'}
              </button>
            </div>
          </div>
        ) : (
          <div className="scorecard">
            <h2>
              You  Scored {percentage}%
            </h2>
            <p style={{ textAlign: "center" }}>
              {score >= 7 ? '🎉 Great job!' : '💪 Keep practicing!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
