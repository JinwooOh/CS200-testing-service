import React from 'react';
import PropTypes from 'prop-types';

const QuestionList = props => {
  const questions = props.questionList;
  return (
    <div className="question-list">
      <ol>
        {questions.map(question => (
          <div>
            <p>{question.question}</p>
            <p>{question.updated}</p>
            <p>{question.answers}</p>
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
