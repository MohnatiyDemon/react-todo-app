import PropTypes from 'prop-types'
import './TaskInput.css'

const TaskInput = ({ value, onInputChange, onKeyDown }) => {
  return (
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      value={value}
      onChange={onInputChange}
      onKeyDown={onKeyDown}
    ></input>
  )
}
TaskInput.propTypes = {
  value: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
}

export default TaskInput
