import { useState ,useEffect} from 'react';
import { ImStopwatch } from "react-icons/im";

import './style.css';
 

const questions = [
  {
    question: "Which element has the chemical symbol 'Au'?",
    options: ["Silver", "Gold", "Copper", "Iron"],
    answer: "Gold",
  },
  {
    question: "What is the result of '2' + 2 in JavaScript?",
    options: ["4", "'22'", "NaN", "Error"],
    answer: "'22'",
  },
  {
    question: "Which country hosted the first Olympic Games?",
    options: ["Italy", "Greece", "France", "USA"],
    answer: "Greece",
  },
  {
    question: "Which method adds a new element to the end of an array?",
    options: ["push()", "pop()", "shift()", "concat()"],
    answer: "push()",
  },
  {
    question: "Who is known as the 'Father of Computers'?",
    options: ["Alan Turing", "Charles Babbage", "Bill Gates", "Steve Jobs"],
    answer: "Charles Babbage",
  },
  {
    question: "Which keyword is used to create a class in JavaScript?",
    options: ["class", "function", "object", "constructor"],
    answer: "class",
  },
  {
    question: "Which planet is known as the 'Red Planet'?",
    options: ["Mars", "Venus", "Jupiter", "Mercury"],
    answer: "Mars",
  },
  {
    question: "What will `typeof null` return?",
    options: ["null", "object", "undefined", "number"],
    answer: "object",
  },
  {
    question: "What is the tallest mountain in the world?",
    options: ["K2", "Everest", "Kangchenjunga", "Makalu"],
    answer: "Everest",
  },
  {
    question: "Which of the following is NOT a looping structure in JS?",
    options: ["for", "while", "foreach", "loop"],
    answer: "loop",
  },
];


function App() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
   const [buttonName, setButtonName] = useState('Show Result');
     const [minutes, setMinutes] = useState(1);
   const [seconds, setSeconds] = useState(0);
      const [running, setRunning] = useState(false);
 



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
  const handleTryAgain = ()=>{
    window.location.reload();
  }

const handleAnswerCheck = () => {
   setButtonName(buttonName === 'Show Result' ? 'Hide Result' : 'Show Result');
 const div = document.querySelector('.user-answers');
  if (div.style.display === "none") {
    div.style.display = "block";
  } else {
    div.style.display = "none";
  }
};


  useEffect(() => {
    let interval;

    if (running && (minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(prev => prev - 1);
        } else if (minutes > 0) {
          setMinutes(prev => prev - 1);
          setSeconds(59);
        }
      }, 1000);
    }

    
    if (running && minutes === 0 && seconds === 0) {
      setRunning(false);
      alert("Time's up!");
       setShowResult(true); 
      //  this goto result page
    }

    return () => clearInterval(interval);
  }, [running, minutes, seconds]);

  const handleStart = () => {
    if (!running) setRunning(true);
  };

  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;



  return (
    <div className="quiz-page">
      <h1 style={{ textAlign: "center" }}> Quiz Time</h1>
      <div className="quizBoxes">
       
        {!showResult ? (
          <div className="questions">
            <div className='header'>
               <h3>
              Question {currentQ + 1} of {questions.length}
            </h3>

           <h5>
  <ImStopwatch style={{ position: 'relative', top: '-2px' }} /> :{formattedTime} </h5>





              
               </div>
           
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
              <button className='btn btn-success' onClick={handleStart} disabled ={running}> Start </button>
             <button
  className="btn btn-primary"
  onClick={handleNext}
  disabled={!selectedAnswers[currentQ]}
>
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
          <div className='user-answers' style={{display:"none"}}>
            {questions.map((q,idx)=>(
                <div key={idx} className='user-answer-list'>
                  <p>
                    <strong>
                      Q{idx+1}:{q.question}
                    </strong>
                  </p>
                  
                  <p>
                    <strong>Options:</strong>{' '}
                    {q.options.map((opt, i) => (
                      <span
                        key={i}
                        style={{
                          color: opt === q.answer ? 'green' : 'white',
                          fontWeight: opt === q.answer ? 'bold' : 'normal',
                        }}
                      >
                        {opt}{i < q.options.length - 1 ? ' | ' : ''}
                      </span>
                    ))}
                  </p>
                  <p>
                  <strong>
                    Your Answer: {" "}
                  </strong>
                  <span style={{color:selectedAnswers[idx]===q.answer ? "green" : "red"}}>
                    {selectedAnswers[idx]}
                  </span>
                  {selectedAnswers[idx]!== q.answer && selectedAnswers[idx] && (
                    <>
                    {" | "}

                    <strong>
                      Correct: 
                    </strong> {" "}
                    <span style={{color:"green",fontWeight:"bold"}}>
                        {q.answer}
                    </span>
                
                    </>
                  )}
                  </p>
                  <div style={{borderBottom:"1px solid white"}}> </div>
                 </div>
              ))}

           </div>
         

<div className='result-btn'> 
  
             <button onClick={handleAnswerCheck} className='btn btn-primary'>
                {buttonName}
             </button>
            
            <button onClick={handleTryAgain} className='btn btn-primary'>
              Try Again
             
            </button>
           
           
            </div>
               
          </div>
        )}
      </div>
      
    </div>
  );
}

export default App;



