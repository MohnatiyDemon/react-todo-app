import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'
import React from 'react'
import './Task.css'

export default class Task extends React.Component {
  onTaskClick = () => {
    this.props.onToggleCompleted(this.props.id)
  }
  static propTypes = {
    id: PropTypes.number.isRequired,
    task: PropTypes.string.isRequired,
    completed: PropTypes.bool,
    onToggleCompleted: PropTypes.func.isRequired,
    created: PropTypes.instanceOf(Date).isRequired,
    onDeleted: PropTypes.func.isRequired,
  }
  static defaultProps = {
    completed: false,
  }

  render() {
    const { task, id, created, completed } = this.props

    return (
      <li className={completed ? 'completed' : ''}>
        <div className="view">
          <input id={id} onChange={this.onTaskClick} className="toggle" type="checkbox" checked={completed} />
          <label htmlFor={id}>
            <span className="description">{task}</span>
            <span className="created">{`created ${formatDistanceToNow(created, { addSuffix: true })}`}</span>
          </label>
          <button type="button" className="icon icon-edit"></button>
          <button type="button" className="icon icon-destroy" onClick={this.props.onDeleted}></button>
        </div>
      </li>
    )
  }
}
