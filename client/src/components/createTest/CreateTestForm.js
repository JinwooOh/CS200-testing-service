import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CreateTestForm = props => {
  return (
    <div>
      <h3 className="createTest--title">Create Test</h3>

      <label htmlFor="date"> Date </label>
      <div className="datePicker">
        <DatePicker id="date" selected={props.fields.startDate} onChange={props.handleChangeDate} />
      </div>
      <label htmlFor="name"> Test Name </label>
      <input
        type="text"
        id="name"
        name="name"
        value={props.fields.name}
        onChange={props.handleChange}
      />

      <br />

      <label htmlFor="startTime"> Start Time </label>
      <div className="datePicker">
        <DatePicker
          id="startTime"
          selected={props.fields.startTime}
          onChange={props.handleChangeStartTime}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          dateFormat="LT"
          timeCaption="Time"
        />
      </div>
      <label htmlFor="endTime"> End Time </label>
      <div className="datePicker">
        <DatePicker
          id="endTime"
          selected={props.fields.endTime}
          onChange={props.handleChangeEndTime}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          dateFormat="LT"
          timeCaption="Time"
        />
      </div>
      <label htmlFor="number"> Question Number </label>
      <input
        value={props.fields.number}
        name="number"
        id="number"
        type="number"
        min="1"
        onChange={props.handleChange}
      />
      {/* <label htmlFor="difficulty">Difficulty</label>
      <select value={props.fields.difficulty} name="difficulty" onChange={props.handleChange}>
        <option value="easy">easy</option>
        <option value="medium">medium</option>
        <option value="hard">hard</option>
      </select> */}
      <br />
      <label htmlFor="multiplechoice"> Multiplechoice </label>
      <form>
        <input
          type="radio"
          name="multiplechoice"
          id="multiplechoice"
          value="true"
          onChange={this.handleChange}
        />
        <input
          type="radio"
          name="multiplechoice"
          id="multiplechoice"
          value="false"
          onChange={this.handleChange}
        />
      </form>
    </div>
  );
};

export default CreateTestForm;
