import React from 'react';

import { SortableContainer, SortableElement } from 'react-sortable-hoc';

const SortableItem = SortableElement(props => {
  return (
    <div className="questions--item">
      <div className="questions--title">
        <h3>Question</h3>
      </div>
      <p>{props.value.question}</p>
      {props.value.answers.map((answer, j) => (
        <div key={j}>
          <p>
            {j + 1}: {answer}
          </p>
        </div>
      ))}
      <p>Correct Answer: {props.value.correctAnswer}</p>
      <button
        onClick={() => {
          props.removeQuestion(props.index);
        }}
      />
    </div>
  );
});

const SortableList = SortableContainer(props => {
  return (
    <ul>
      {props.items.map((value, index) => (
        <SortableItem
          key={`item-${index}`}
          index={index}
          value={value}
          removeQuestion={props.removeQuestion}
        />
      ))}
    </ul>
  );
});

export default SortableList;
