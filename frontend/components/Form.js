import React from "react";

const inputState = {
  input: "",
};

export default class Form extends React.Component {
  state = inputState;

  handleChange = (event) => {
    this.setState({ ...this.state, input: event.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleAdd(this.state.input);
  };
  render() {
    return (
      <form>
        <input
          onChange={this.handleChange}
          // id="task"
          // type="text"
          // placeholder="type text"
          // value={this.props.todos.task}
        />
        <button onClick={this.handleSubmit}>Add ToDo</button>
      </form>
    );
  }
}
