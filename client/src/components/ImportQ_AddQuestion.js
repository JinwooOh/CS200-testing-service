import React, { Component } from 'react';

export default class ImportQ_AddQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numChildren: 0,
      file: {},
      imagePreviewUrl: '',
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
          alert('Success!');
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
      children.push(<ChildComponent key={i} number={i} />);
    }
    return (
      <div>
        <h4>Add Question</h4>
        <textarea rows="4" cols="50" placeholder="Description" />
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

        <button className="btn btn__createTest"> Add Question </button>
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

const ChildComponent = props => (
  <div>
    <input type="text" />
  </div>
);
