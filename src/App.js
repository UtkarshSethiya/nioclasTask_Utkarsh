import "./App.css";
import React, { useState, useEffect } from "react";
import { MathJax } from "better-react-mathjax";
import { MathJaxContext } from "better-react-mathjax";
function App() {
  const [questions, setQuestions] = useState("");

  const questionarray = [
    "AreaUnderTheCurve_901",
    "BinomialTheorem_901",
    "DifferentialCalculus2_901",
  ];

  const [counter, setCounter] = useState(0);
  const QuestionId = questionarray[counter];
  console.log(QuestionId);

  const nextcounter = () => {
    if (counter < 2) {
      setCounter(counter + 1);
    } else {
      setCounter(2);
    }
  };

  const previouscounter = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    } else {
      setCounter(0);
    }
  };

  console.log(questions);

  useEffect(() => {
    fetch(
      `https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=${questionarray[counter]} `
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setQuestions(data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [QuestionId]);

  console.log(questions.Question);
  return (
    <div className="App">
      <div className="question">
        <div className="button_group">
          <button className="btn btn-outline-primary" onClick={previouscounter}>
            Previous
          </button>
          <button className="btn btn-outline-primary" onClick={nextcounter}>
            Next
          </button>
        </div>

        <br />
       

        <h5 className="q_number">Question : {counter + 1}</h5>
        <h2>
          <MathJaxContext>
            <MathJax>{questions.Question}</MathJax>
          </MathJaxContext>{" "}
        </h2>
      </div>
    </div>
  );
}

export default App;
