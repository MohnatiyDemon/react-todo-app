import PropTypes from 'prop-types'
import { useState } from 'react'
import Header from '../Header/Header'
import TaskInput from '../TaskInput/TaskInput'
import './NewTaskForm.css'

const NewTaskForm = ({ onItemAdded }) => {
  const [task, setTask] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  const onInputChange = (event) => {
    setTask(event.target.value)
  }

  const onMinutesChange = (e) => {
    const value = e.target.value
    setMinutes(value === '' ? 0 : value)
  }

  const onSecondsChange = (e) => {
    const value = e.target.value
    setSeconds(value === '' ? 0 : value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!task.trim()) {
      return
    }
    onItemAdded(task, minutes, seconds)
    setTask('')
    setMinutes('')
    setSeconds('')
  }

  return (
    <form className="header new-todo-form" onSubmit={onSubmit}>
      <Header />
      <TaskInput
        value={task}
        minutes={minutes}
        seconds={seconds}
        onInputChange={onInputChange}
        onMinutesChange={onMinutesChange}
        onSecondsChange={onSecondsChange}
      />
      <button type="submit"></button>
    </form>
  )
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
}

export default NewTaskForm
