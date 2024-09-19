import PropTypes from 'prop-types'
import Task from '../Task/Task'
import './TaskList.css'

const TaskList = ({ todos, onDeleted, onToggleCompleted, onTaskUpdated, onStartTimer, onPauseTimer }) => {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item

    return (
      <Task
        key={id}
        id={id}
        {...itemProps}
        onDeleted={() => onDeleted(id)}
        onToggleCompleted={() => onToggleCompleted(id)}
        onTaskUpdated={onTaskUpdated}
        onStartTimer={onStartTimer}
        onPauseTimer={onPauseTimer}
      />
    )
  })
  return <ul className="todo-list">{elements}</ul>
}
TaskList.propTypes = {
  onDeleted: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  onTaskUpdated: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      task: PropTypes.string.isRequired,
      completed: PropTypes.bool,
      timer: PropTypes.number,
    })
  ).isRequired,
  onStartTimer: PropTypes.func.isRequired,
  onPauseTimer: PropTypes.func.isRequired,
}
export default TaskList
