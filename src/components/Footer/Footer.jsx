import TaskFilter from '../TasksFilter/TaskFilter'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <span className="todo-count">0 items left</span>
      <TaskFilter />
      <button type="button" className="clear-completed">
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
