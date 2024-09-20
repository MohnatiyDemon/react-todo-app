import React from 'react'
import './App.css'
import Footer from './components/Footer/Footer'
import NewTaskForm from './components/NewTaskForm/NewTaskForm'
import TaskList from './components/TaskList/TaskList'

export default class App extends React.Component {
  state = {
    todoData: [
      {
        task: 'Drink coffee',
        completed: false,
        id: 1,
        created: new Date(),
        timer: 0,
        isRunning: false,
        isPaused: false,
      },
      {
        task: 'Make awesome app',
        completed: false,
        id: 2,
        created: new Date(),
        timer: 0,
        isRunning: false,
        isPaused: false,
      },
      {
        task: 'Have a lunch',
        completed: false,
        id: 3,
        created: new Date(),
        timer: 0,
        isRunning: false,
        isPaused: false,
      },
    ],
    filter: 'All',
  }

  addItem = (task, minutes, seconds) => {
    const totalSeconds = (parseInt(minutes, 10) || 0) * 60 + (parseInt(seconds, 10) || 0)
    this.setState(({ todoData }) => {
      const newTask = {
        task,
        completed: false,
        id: todoData.length ? todoData[todoData.length - 1].id + 1 : 1,
        created: new Date(),
        timer: totalSeconds,
        isRunning: false,
        isPaused: false,
      }
      return {
        todoData: [...todoData, newTask],
      }
    })
  }

  updateTaskTimer = (id, time) => {
    this.setState(({ todoData }) => {
      const updatedTasks = todoData.map((item) => {
        if (item.id === id) {
          return { ...item, timer: time }
        }
        return item
      })
      return { todoData: updatedTasks }
    })
  }

  startTimer = (id) => {
    this.setState(({ todoData }) => {
      const updatedTasks = todoData.map((item) => {
        if (item.id === id && !item.isRunning && item.timer > 0) {
          item.isRunning = true
          item.isPaused = false

          item.intervalId = setInterval(() => {
            this.setState(({ todoData }) => {
              const task = todoData.find((t) => t.id === id)
              if (task.timer > 0) {
                const updatedTime = task.timer - 1
                localStorage.setItem(`timer-${id}`, updatedTime)
                return {
                  todoData: todoData.map((t) => (t.id === id ? { ...t, timer: updatedTime } : t)),
                }
              } else {
                clearInterval(task.intervalId)
                return {
                  todoData: todoData.map((t) => (t.id === id ? { ...t, isRunning: false } : t)),
                }
              }
            })
          }, 1000)
        }
        return item
      })
      return { todoData: updatedTasks }
    })
  }

  pauseTimer = (id) => {
    this.setState(({ todoData }) => {
      const updatedTasks = todoData.map((item) => {
        if (item.id === id && item.isRunning) {
          clearInterval(item.intervalId)
          item.isRunning = false
          item.isPaused = true
        }
        return item
      })
      return { todoData: updatedTasks }
    })
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const taskToDelete = todoData.find((item) => item.id === id)
      if (taskToDelete && taskToDelete.isRunning) {
        clearInterval(taskToDelete.intervalId)
      }
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
            onStartTimer={this.startTimer}
            onPauseTimer={this.pauseTimer}
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
