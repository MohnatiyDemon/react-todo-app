import PropTypes from 'prop-types'
import TaskFilter from '../TasksFilter/TaskFilter'
import './Footer.css'

const Footer = ({ activeTasksCount, onClearCompleted, filter, onFilterChange }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{activeTasksCount} items left</span>
      <TaskFilter filter={filter} onFilterChange={onFilterChange} />
      <button type="button" className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  activeTasksCount: PropTypes.number.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
}
export default Footer
