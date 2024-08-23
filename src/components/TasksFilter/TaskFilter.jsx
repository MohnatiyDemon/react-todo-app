import React from 'react'
import './TaskFilter.css'

export default class TaskFilter extends React.Component {
  render() {
    return (
      <ul className="filters">
        <li>
          <button type="button" className="selected">
            All
          </button>
        </li>
        <li>
          <button type="button">Active</button>
        </li>
        <li>
          <button type="button">Completed</button>
        </li>
      </ul>
    )
  }
}
