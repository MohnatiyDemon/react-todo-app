import PropTypes from 'prop-types'
import './TaskInput.css'

const TaskInput = ({ value, minutes, seconds, onInputChange, onSecondsChange, onMinutesChange }) => {
  return (
    <>
      <input
        className="new-todo"
        name="text"
        type="text"
        placeholder="What needs to be done?"
        value={value}
        onChange={onInputChange}
        required
        minLength="1"
      ></input>
      <input
        className="new-todo-form__timer"
        type="number"
        name="minutes"
        value={minutes}
        onChange={onMinutesChange}
        placeholder="Min"
        min="0"
      ></input>
      <input
        className="new-todo-form__timer"
        type="number"
        name="seconds"
        value={seconds}
        onChange={onSecondsChange}
        placeholder="Sec"
        min="0"
      ></input>
      <button type="submit"></button>
    </>
  )
}

TaskInput.propTypes = {
  value: PropTypes.string.isRequired,
  minutes: PropTypes.string,
  seconds: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  onSecondsChange: PropTypes.func.isRequired,
  onMinutesChange: PropTypes.func.isRequired,
}

export default TaskInput
