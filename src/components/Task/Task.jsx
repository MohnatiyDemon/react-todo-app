import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'
import { useState } from 'react'
import './Task.css'

const Task = ({
  id,
  task,
  completed,
  onToggleCompleted,
  created,
  onDeleted,
  onTaskUpdated,
  timer,
  isRunning,
  onStartTimer,
  onPauseTimer,
}) => {
  const [editing, setEditing] = useState(false)
  const [editingTask, setEditingTask] = useState(task)

  const onEditTask = () => {
    setEditing(true)
  }

  const onChangeTask = (event) => {
    setEditingTask(event.target.value)
  }

  const onSubmitEdit = (event) => {
    if (event.key === 'Enter') {
      if (editingTask.trim()) {
        onTaskUpdated(id, editingTask.trim())
      }
      setEditing(false)
    }
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  let classNames = completed ? 'completed' : ''
  if (editing) {
    classNames += ' editing'
  }

  return (
    <li className={classNames}>
      <div className="view">
        <input id={id} onChange={onToggleCompleted} className="toggle" type="checkbox" checked={completed} />
        {!editing && (
          <label htmlFor={id}>
            <span className="description">
              <span>{task}</span>
              {!isRunning ? (
                <button className="icon icon-play" onClick={() => onStartTimer(id)}></button>
              ) : (
                <button className="icon icon-pause" onClick={() => onPauseTimer(id)}></button>
              )}
              <span>{formatTime(timer)}</span>
            </span>
            <span className="created">{`created ${formatDistanceToNow(created, { addSuffix: true })}`}</span>
          </label>
        )}
        <button type="button" className="icon icon-edit" onClick={onEditTask}></button>
        <button type="button" className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
      {editing && (
        <input type="text" className="edit" value={editingTask} onChange={onChangeTask} onKeyDown={onSubmitEdit} />
      )}
    </li>
  )
}

Task.propTypes = {
  id: PropTypes.number.isRequired,
  task: PropTypes.string.isRequired,
  completed: PropTypes.bool,
  onToggleCompleted: PropTypes.func.isRequired,
  created: PropTypes.instanceOf(Date).isRequired,
  onDeleted: PropTypes.func.isRequired,
  onTaskUpdated: PropTypes.func.isRequired,
  timer: PropTypes.number,
  isRunning: PropTypes.bool,
  isPaused: PropTypes.bool,
  onStartTimer: PropTypes.func.isRequired,
  onPauseTimer: PropTypes.func.isRequired,
}
Task.applydefaultProps = {
  completed: false,
  timer: 0,
  isRunning: false,
  isPaused: false,
}

export default Task
