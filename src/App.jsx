import { useEffect, useRef, useState } from 'react'
import './App.css'
import Footer from './components/Footer/Footer'
import NewTaskForm from './components/NewTaskForm/NewTaskForm'
import TaskList from './components/TaskList/TaskList'

const App = () => {
  const [todoData, setTodoData] = useState([
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
  ])

  const [filter, setFilter] = useState('All')
  const intervalRefs = useRef({})

  const addItem = (task, minutes, seconds) => {
    const totalSeconds = (parseInt(minutes, 10) || 0) * 60 + (parseInt(seconds, 10) || 0)
    setTodoData((prevTodoData) => [
      ...prevTodoData,
      {
        task,
        completed: false,
        id: prevTodoData.length ? prevTodoData[prevTodoData.length - 1].id + 1 : 1,
        created: new Date(),
        timer: totalSeconds,
        isRunning: false,
        isPaused: false,
      },
    ])
  }

  const startTimer = (id) => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((item) => {
        if (item.id === id && !item.isRunning && item.timer > 0) {
          item.isRunning = true
          item.isPaused = false

          intervalRefs.current[id] = setInterval(() => {
            setTodoData((currentTodoData) => {
              const task = currentTodoData.find((t) => t.id === id)
              if (task.timer > 0) {
                const updatedTime = task.timer - 1
                localStorage.setItem(`timer-${id}`, updatedTime)
                return currentTodoData.map((t) => (t.id === id ? { ...t, timer: updatedTime } : t))
              } else {
                clearInterval(intervalRefs.current[id])
                return currentTodoData.map((t) => (t.id === id ? { ...t, isRunning: false } : t))
              }
            })
          }, 1000)
        }
        return item
      })
    )
  }

  const pauseTimer = (id) => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((item) => {
        if (item.id === id && item.isRunning) {
          clearInterval(intervalRefs.current[id])
          item.isRunning = false
          item.isPaused = true
        }
        return item
      })
    )
  }

  useEffect(() => {
    const activeTimers = Object.assign({}, intervalRefs.current)
    return () => {
      Object.values(activeTimers).forEach(clearInterval)
    }
  }, [])

  const deleteItem = (id) => {
    setTodoData((prevTodoData) => {
      const taskToDelete = prevTodoData.find((item) => item.id === id)
      if (taskToDelete && taskToDelete.isRunning) {
        clearInterval(intervalRefs.current[id])
      }
      return prevTodoData.filter((item) => item.id !== id)
    })
  }

  const onToggleCompleted = (id) => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    )
  }

  const clearCompleted = () => {
    setTodoData((prevTodoData) => prevTodoData.filter((item) => !item.completed))
  }

  const filterTasks = () => {
    if (filter === 'Active') {
      return todoData.filter((task) => !task.completed)
    }
    if (filter === 'Completed') {
      return todoData.filter((task) => task.completed)
    }
    return todoData
  }

  const updateTask = (id, newTask) => {
    setTodoData((prevTodoData) => prevTodoData.map((item) => (item.id === id ? { ...item, task: newTask } : item)))
  }

  const filteredTasks = filterTasks()
  const activeTasksCount = todoData.filter((item) => !item.completed).length

  return (
    <main className="main todoapp">
      <section className="todoapp">
        <NewTaskForm onItemAdded={addItem} />
        <TaskList
          todos={filteredTasks}
          onDeleted={deleteItem}
          onToggleCompleted={onToggleCompleted}
          onStartTimer={startTimer}
          onPauseTimer={pauseTimer}
          onTaskUpdated={updateTask}
        />
        <Footer
          activeTasksCount={activeTasksCount}
          onClearCompleted={clearCompleted}
          filter={filter}
          onFilterChange={setFilter}
        />
      </section>
    </main>
  )
}

export default App
