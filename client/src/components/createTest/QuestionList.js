import React from 'react';
import PropTypes from 'prop-types';

const QuestionList = props => {
  const questions = props.questionList;
  return (
    <div className="questions">
      <ol>
        {questions.map((question, i) => (
          <div className="questions--item" key={i}>
            <div className="questions--title">
              <h3>Question {i + 1}</h3>
            </div>
            <p className="questions--question">{question.question}</p>
            <div className="questions--answerList">
              {question.answers.map((answer, j) => (
                <p key={j} className="questions--answers">
                  {j + 1}: {answer}
                </p>
              ))}
            </div>
            <p className="questions--correctAnswer">Correct Answer: {question.correctAnswer}</p>
            <button
              onClick={() => {
                props.removeQuestion(i);
              }}
              className="btn btn__remove"
            >
              Remove
            </button>
          </div>
        ))}
      </ol>
    </div>
  );
};
export default QuestionList;

QuestionList.propTypes = {
  questionList: PropTypes.array.isRequired,
};
