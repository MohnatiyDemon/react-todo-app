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
    filter: 'All',
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

  setFilter = (filter) => {
    this.setState({ filter })
  }

  filterTasks = () => {
    const { todoData, filter } = this.state
    if (filter === 'Active') {
      return todoData.filter((task) => !task.completed)
    }
    if (filter === 'Completed') {
      return todoData.filter((task) => task.completed)
    }
    return todoData
  }

  updateTask = (id, newTask) => {
    this.setState(({ todoData }) => {
      const updatedTasks = todoData.map((item) => {
        if (item.id === id) {
          return { ...item, task: newTask }
        }
        return item
      })
      return { todoData: updatedTasks }
    })
  }

  render() {
    const { filter } = this.state
    const filteredTasks = this.filterTasks()
    const activeTasksCount = this.state.todoData.filter((item) => !item.completed).length

    return (
      <main className="main todoapp">
        <section className="todoapp">
          <NewTaskForm onItemAdded={this.addItem} />
          <TaskList
            todos={filteredTasks}
            onDeleted={this.deleteItem}
            onToggleCompleted={this.onToggleCompleted}
            onTaskUpdated={this.updateTask}
          />
          <Footer
            activeTasksCount={activeTasksCount}
            onClearCompleted={this.clearCompleted}
            filter={filter}
            onFilterChange={this.setFilter}
          />
        </section>
      </main>
    )
  }
}
