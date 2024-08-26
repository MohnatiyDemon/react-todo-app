import React from 'react'
import './App.css'
import Footer from './components/Footer/Footer'
import NewTaskForm from './components/NewTaskForm/NewTaskForm'
import TaskList from './components/TaskList/TaskList'

export default class App extends React.Component {
  state = {
    todoData: [
      { task: 'Drink coffee', completed: false, id: 1, created: new Date() },
      { task: 'Make awesome app', completed: false, id: 2, created: new Date() },
      { task: 'Have a lanch', completed: false, id: 3, created: new Date() },
    ],
  }

  addItem = (task) => {
    this.setState(({ todoData }) => {
      const newTask = {
        task,
        completed: false,
        id: todoData.length ? todoData[todoData.length - 1].id + 1 : 1,
        created: new Date(),
      }
      return {
        todoData: [...todoData, newTask],
      }
    })
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((item) => item.id !== id)
      return {
        todoData: newArray,
      }
    })
  }

  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => {
      const newData = todoData.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed }
        }
        return item
      })
      return { todoData: newData }
    })
  }

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((item) => !item.completed)
      return {
        todoData: newArray,
      }
    })
  }

  render() {
    const activeTasksCount = this.state.todoData.filter((item) => !item.completed).length

    return (
      <main className="main todoapp">
        <section className="todoapp">
          <NewTaskForm onItemAdded={this.addItem} />
          <TaskList
            todos={this.state.todoData}
            onDeleted={this.deleteItem}
            onToggleCompleted={this.onToggleCompleted}
          />
          <Footer activeTasksCount={activeTasksCount} onClearCompleted={this.clearCompleted} />
        </section>
      </main>
    )
  }
}
