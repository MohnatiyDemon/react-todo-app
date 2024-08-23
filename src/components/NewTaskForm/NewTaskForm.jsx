import PropTypes from 'prop-types'
import React from 'react'
import Header from '../Header/Header'
import TaskInput from '../TaskInput/TaskInput'
import './NewTaskForm.css'

const NewTaskForm = ({ onItemAdded }) => {
  const [task, setTask] = React.useState('')

  const onInputChange = (event) => {
    setTask(event.target.value)
  }

  const onKeyDown = (event) => {
    if (event.key === 'Enter' && task.trim()) {
      event.preventDefault()
      onItemAdded(task)
      setTask('')
    }
  }
  return (
    <form className="header" onSubmit={(e) => e.preventDefault()}>
      <Header />
      <TaskInput value={task} onInputChange={onInputChange} onKeyDown={onKeyDown} />
    </form>
  )
}
NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
}

export default NewTaskForm
