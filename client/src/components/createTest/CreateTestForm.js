import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CreateTestForm = props => {
  return (
    <div>
      <form onSubmit={props.pullQuestion}>
        <h3 className="createTest--title">Create Exam</h3>
        <label htmlFor="date"> Date </label>
        <div className="datePicker">
          <DatePicker
            id="date"
            selected={props.fields.startDate}
            onChange={props.handleChangeDate}
          />
        </div>
        <label htmlFor="name"> Exam Name </label>
        <input
          required
          type="text"
          id="name"
          name="name"
          value={props.fields.name}
          onChange={props.handleChange}
        />
        <br />
        <label htmlFor="timeLimit"> Time Limit </label>
        <input
          value={props.fields.timeLimit}
          name="timeLimit"
          id="timeLimit"
          type="number"
          step="10"
          min="20"
          ref={elm => {
            this.numberInput = elm;
          }}
          onChange={event => props.handleChangeTimeLimit(event)}
        />
        <label htmlFor="number"> Number of Questions to Pull</label>
        <input
          value={props.fields.number}
          name="number"
          id="number"
          type="number"
          min="1"
          onChange={props.handleChange}
        />
        <br />
        <button type="button" className="btn btn__createTest" onClick={() => props.reset()}>
          Reset
        </button>
        <button type="submit" className="btn btn__createTest">
          Pull Question
        </button>
      </form>
    </div>
  );
};

export default CreateTestForm;
