import PropTypes from 'prop-types'
import TaskFilter from '../TasksFilter/TaskFilter'
import './Footer.css'

const Footer = ({ activeTasksCount }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{activeTasksCount} items left</span>
      <TaskFilter />
      <button type="button" className="clear-completed">
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  activeTasksCount: PropTypes.number.isRequired,
}
export default Footer
