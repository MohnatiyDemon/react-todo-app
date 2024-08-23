import React from 'react'
import './App.css'
import Footer from './components/Footer/Footer'
import NewTaskForm from './components/NewTaskForm/NewTaskForm'
import TaskList from './components/TaskList/TaskList'

export default class App extends React.Component {
  state = {
    todoData: [
      { task: 'Drink coffee', completed: false, id: 1 },
      { task: 'Make awesome app', completed: false, id: 2 },
      { task: 'Have a lanch', completed: false, id: 3 },
    ],
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((item) => item.id !== id)
      return {
        todoData: newArray,
      }
    })
  }
  render() {
    return (
      <main className="main todoapp">
        <section className="todoapp">
          <NewTaskForm />
          <TaskList todos={this.state.todoData} onDeleted={this.deleteItem} />
          <Footer />
        </section>
      </main>
    )
  }
}
