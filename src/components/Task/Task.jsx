import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'
import React from 'react'
import './Task.css'

export default class Task extends React.Component {
  state = {
    completed: false,
  }

  onTaskClick = () => {
    this.setState((state) => {
      return {
        completed: !state.completed,
      }
    })
  }
  static propTypes = {
    id: PropTypes.number.isRequired,
    task: PropTypes.string.isRequired,
    completed: PropTypes.bool,
    onDeleted: PropTypes.func.isRequired,
  }
  static defaultProps = {
    completed: false,
  }

  render() {
    const { task, id } = this.props
    const { completed } = this.state

    return (
      <li className={completed ? 'completed' : ''}>
        <div className="view">
          <input id={id} onClick={this.onTaskClick} className="toggle" type="checkbox" />
          <label htmlFor={id}>
            <span className="description">{task}</span>
            <span className="created">{`created ${formatDistanceToNow(new Date(), { addSuffix: true })}`}</span>
          </label>
          <button type="button" className="icon icon-edit"></button>
          <button type="button" className="icon icon-destroy" onClick={this.props.onDeleted}></button>
        </div>
      </li>
    )
  }
}
