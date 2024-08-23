import PropTypes from 'prop-types'
import Task from '../Task/Task'
import './TaskList.css'

const TaskList = ({ todos, onDeleted }) => {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item

    return <Task key={id} id={id} {...itemProps} onDeleted={() => onDeleted(id)} />
  })
  return <ul className="todo-list">{elements}</ul>
}
TaskList.propTypes = {
  onDeleted: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      task: PropTypes.string.isRequired,
      completed: PropTypes.bool,
    })
  ).isRequired,
}
export default TaskList
