import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import axios from 'axios'
import './App.css';
import About from './components/pages/About'
import Todos from './components/Todos';
import Header from './components/layout/Header';
import AddTodo from './components/AddTodo'

class App extends Component {

  state = {
    todos: []
  }

  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.isCompleted = !todo.isCompleted;
        }
        return todo;
      })
    })
  }

  deleteTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((res) => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }))

  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then((res) => this.setState({ todos: res.data }))
  }

  AddTodo = title => {

    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      isCompleted: false
    })
      .then((res) => this.setState({ todos: [...this.state.todos, res.data] }))

  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path='/' render={props => (
              <Fragment>
                <AddTodo AddTodo={this.AddTodo} />
                <Todos todos={this.state.todos} markComplete={this.markComplete} deleteTodo={this.deleteTodo} />
              </Fragment>
            )} />
            <Route path='/about' component={About} />
          </div>
        </div>
      </Router>
    );

  }
}

export default App;
