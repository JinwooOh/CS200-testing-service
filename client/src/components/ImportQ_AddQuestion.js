import React, { Component } from 'react';

export default class ImportQ_AddQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numChildren: 0,
    };
  }

  onAddChild = () => {
    this.setState({
      numChildren: this.state.numChildren + 1,
    });
  };

  onDeleteChild = () => {
    this.setState({
      numChildren: this.state.numChildren - 1,
    });
  };

  render() {
    const children = [];

    for (let i = 0; i < this.state.numChildren; i += 1) {
      children.push(<ChildComponent key={i} number={i} />);
    }
    return (
      <div>
        <h4>Add Question</h4>
        <textarea rows="4" cols="50" placeholder="Description" />
        <ParentComponent addChild={this.onAddChild} deleteChild={this.onDeleteChild}>
          {children}
        </ParentComponent>
        <button className="btn btn__createTest">import image</button>
        <button className="btn btn__createTest"> Add Question </button>
      </div>
    );
  }
}

const ParentComponent = props => (
  <div className="card calculator">
    <p>
      <button className="btn btn__createTest" onClick={props.addChild}>Add Answer Option</button>
      <button className="btn btn__createTest" onClick={props.deleteChild}>Delete Answer Option</button>
    </p>
    <div id="children-pane">{props.children}</div>
  </div>
);

const ChildComponent = props => (
  <div>
    <input type="text" />
  </div>
);
