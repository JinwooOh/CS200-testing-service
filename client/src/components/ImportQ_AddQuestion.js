import React, { Component } from 'react';

export default class ImportQ_AddQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numChildren: 0,
      question: { desc: '', answers: [], correct_ans: [] },
      file: {},
      imagePreviewUrl: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
  }

  addQuestion() {
    fetch('/api/addQuestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.question),
    })
      .then(alert('The question is uploaded and saved.'))
      .catch(error => console.error('fetch error at importCSV', error));
  }

  handleChange(evt) {
    if (evt.target.name.substring(0, 6) == 'answer') {
      var newQuestion = Object.assign({}, this.state.question);
      const index = parseInt(evt.target.name.substring(6));
      newQuestion.answers[index] = evt.target.value;
      this.setState({ question: newQuestion });
    } else if (evt.target.name == 'desc') {
      var newQuestion = Object.assign({}, this.state.question);
      newQuestion.desc = evt.target.value;
      this.setState({ question: newQuestion });
    } else if (evt.target.name.substring(0, 11) == 'correct_ans') {
      var newQuestion = Object.assign({}, this.state.question);
      const index = parseInt(evt.target.name.substring(11));
      newQuestion.correct_ans[index] = !this.state.question.correct_ans[index];
      this.setState({ question: newQuestion });
    }
  }

  onAddChild = () => {
    if (this.state.numChildren < 8) {
      this.setState({
        numChildren: this.state.numChildren + 1,
      });
      this.state.question.correct_ans.push(false);
    }
  };

  onDeleteChild = () => {
    if (this.state.numChildren > 0) {
      this.setState({
        numChildren: this.state.numChildren - 1,
      });
      this.state.question.answers.pop();
      this.state.question.correct_ans.pop();
    }
  };

  handleImageChange = e => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  uploadHandler = () => {
    const data = new FormData();
    data.append('file', this.state.file);
    data.append('name', this.state.file.name);
    data.append('description', 'imageUpload');
    fetch('/api/uploadimage', {
      method: 'POST',
      body: data,
    })
      .then(res => res.json())
      .then(res => {
        if (res.success === true) {
          alert(
            'Success! An image is uploaded to a local directory. In the next version, We plan to implement rendering an image in a question.'
          );
        } else {
          alert('failed to upload');
        }
      });
  };

  render() {
    const children = [];
    const { imagePreviewUrl } = this.state;
    let imagePreview = null;
    if (imagePreviewUrl) {
      imagePreview = <img src={imagePreviewUrl} />;
    } else {
      imagePreview = <div className="previewText">Please select an Image for Preview</div>;
    }

    for (let i = 0; i < this.state.numChildren; i += 1) {
      children.push(
        <ChildComponent key={i} number={i} value={this.state} onChange={this.handleChange} />
      );
    }
    return (
      <div>
        <h4>Add Question</h4>
        <textarea
          name="desc"
          rows="4"
          cols="50"
          placeholder="Description"
          onChange={this.handleChange}
        />
        <ParentComponent addChild={this.onAddChild} deleteChild={this.onDeleteChild}>
          {children}
        </ParentComponent>

        <label className="importImg">
          <input type="file" onChange={e => this.handleImageChange(e)} />
          <p>Select an image</p>
        </label>
        <div>{imagePreview}</div>

        <button className="btn btn__createTest" onClick={this.uploadHandler}>
          Upload Image
        </button>

        <button
          onClick={() => {
            this.addQuestion();
          }}
          className="btn btn__createTest"
        >
          {' '}
          Add Question{' '}
        </button>
      </div>
    );
  }
}

const ParentComponent = props => (
  <div className="card calculator">
    <p>
      <button className="btn btn__createTest" onClick={props.addChild}>
        Add Answer Option
      </button>
      <button className="btn btn__createTest" onClick={props.deleteChild}>
        Delete Answer Option
      </button>
    </p>
    <div id="children-pane">{props.children}</div>
  </div>
);

function ChildComponent(props) {
  return (
    <div className="container__questions">
      <input
        type="text"
        name={`answer${props.number}`}
        value={props.value.question.answers[props.number]}
        onChange={props.onChange}
      />
      <input
        style={{ width: '2rem' }}
        type="radio"
        name={`correct_ans${props.number}`}
        checked={props.value.question.correct_ans[props.number]}
        onClick={props.onChange}
      />

      {props.value.question.correct_ans[props.number] ? (
        <span>Correct Answer</span>
      ) : (
        <span>Wrong Answer</span>
      )}
    </div>
  );
}
