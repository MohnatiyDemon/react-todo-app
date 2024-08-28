import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'
import React from 'react'
import './Task.css'

export default class Task extends React.Component {
  state = {
    editing: false,
    editingTask: this.props.task,
  }

  onEditTask = () => {
    this.setState({ editing: true })
  }

  onChangeTask = (event) => {
    this.setState({ editingTask: event.target.value })
  }

  onSubmitEdit = (event) => {
    if (event.key === 'Enter') {
      const { id, onTaskUpdated } = this.props
      const { editingTask } = this.state
      if (editingTask.trim()) {
        onTaskUpdated(id, editingTask.trim())
      }
      this.setState({ editing: false })
    }
  }

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
    onTaskUpdated: PropTypes.func.isRequired,
  }
  static defaultProps = {
    completed: false,
  }

  render() {
    const { task, id, created, completed, onDeleted, onToggleCompleted } = this.props
    const { editing, editingTask } = this.state

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
              <span className="description">{task}</span>
              <span className="created">{`created ${formatDistanceToNow(created, { addSuffix: true })}`}</span>
            </label>
          )}
          <button type="button" className="icon icon-edit" onClick={this.onEditTask}></button>
          <button type="button" className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        {editing && (
          <input
            type="text"
            className="edit"
            value={editingTask}
            onChange={this.onChangeTask}
            onKeyDown={this.onSubmitEdit}
          />
        )}
      </li>
    )
  }
}
