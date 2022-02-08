import React from "react";
import TodoList from "./TodoList";
import Form from "./Form";
import axios from "axios";

// const initialState = {
//   task: "",
//   id: Math.floor(Math.random() * 1000000000000),
//   completed: false,
// };

// const initialState = {
//   message: "Here are your Todos",
//   data: [
//     {
//       id: "EdEjX",
//       name: "laundry",
//       completed: false,
//     },
//     {
//       id: "js-Dw",
//       name: "dishes",
//       completed: false,
//     },
//     {
//       id: "o2vnp",
//       name: "groceries",
//       completed: true,
//     },
//   ],
// };

export default class App extends React.Component {
  state = {
    todos: [
      {
        id: Math.floor(Math.random() * 1000000000000),
        name: "",
        completed: false,
      },
    ],
  };

  componentDidMount() {
    axios.get(`http://localhost:9000/api/todos`).then((resp) => {
      console.log(resp.data.data);
      this.setState({
        ...this.state,
        todos: resp.data.data,
      });
    });
  }

  // handleChange = (event) => {
  //   event.preventDefault();
  //   const { value, id } = event.target;
  //   this.setState({ ...this.state, [id]: value });
  // };

  handleAdd = (name) => {
    const newTodo = {
      id: Math.floor(Math.random() * 1000000000000),
      name: name,
      completed: false,
    };
    axios
      .post(`http://localhost:9000/api/todos`, newTodo)
      .then((resp) => {
        this.setState({
          ...this.state,
          todos: [...resp.data.data, newTodo],
        });
      })
      .catch((err) => {
        console.log(err);
      });
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
    axios.patch(`http://localhost:9000/api/todos/${clickedId}`).then((resp) => {
      console.log(resp.data.data);
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
