import React from 'react';

import { SortableContainer, SortableElement } from 'react-sortable-hoc';

const SortableItem = SortableElement(({ value }) => {
  return (
    <div className="questions--item">
      <div className="questions--title">
        <h3>Question</h3>
      </div>
      <p>{value.question}</p>
      {value.answers.map((answer, j) => (
        <div key={j}>
          <p>
            {j + 1}: {answer}
          </p>
        </div>
      ))}
      <p>Correct Answer: {value.correctAnswer}</p>
    </div>
  );
});

const SortableList = SortableContainer(({ items }) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  );
});

export default SortableList;
