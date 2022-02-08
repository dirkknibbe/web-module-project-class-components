import React from "react";
import TodoList from "./TodoList";
import Form from "./Form";

// const initialState = {
//   task: "",
//   id: Math.floor(Math.random() * 1000000000000),
//   completed: false,
// };

const initialState = {
  todos: [
    {
      task: "Organize Garage",
      id: 1528817077286,
      completed: false,
    },
    {
      task: "Bake Cookies",
      id: 1528817084358,
      completed: false,
    },
  ],
};

export default class App extends React.Component {
  state = initialState;

  // handleChange = (event) => {
  //   event.preventDefault();
  //   const { value, id } = event.target;
  //   this.setState({ ...this.state, [id]: value });
  // };

  handleAdd = (task) => {
    const newTodo = {
      task: task,
      id: Math.floor(Math.random() * 1000000000000),
      completed: false,
    };
    this.setState({ ...this.state, todos: [...this.state.todos, newTodo] });
  };

  handleClear = () => {
    this.setState({
      ...this.state,
      todos: this.state.todos.filter((todo) => {
        return todo.completed === false;
      }),
    });
  };

  handleToggle = (clickedId) => {
    this.setState({
      ...this.state,
      todos: this.state.todos.map((todo) => {
        if (todo.id === clickedId) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      }),
    });
  };

  render() {
    const { todos } = this.state;
    return (
      <div>
        <TodoList handleToggle={this.handleToggle} todos={todos} />
        <Form handleAdd={this.handleAdd} />
        <button onClick={this.handleClear}>Clear Completed</button>
      </div>
    );
  }
}
