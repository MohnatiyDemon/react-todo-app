import PropTypes from 'prop-types'
import React from 'react'
import './TaskFilter.css'

export default class TaskFilter extends React.Component {
  static propTypes = {
    filter: PropTypes.string.isRequired,
    onFilterChange: PropTypes.func.isRequired,
  }
  render() {
    const { filter, onFilterChange } = this.props

    return (
      <ul className="filters">
        <li>
          <button type="button" className={filter === 'All' ? 'selected' : ''} onClick={() => onFilterChange('All')}>
            All
          </button>
        </li>
        <li>
          <button
            type="button"
            className={filter === 'Active' ? 'selected' : ''}
            onClick={() => onFilterChange('Active')}
          >
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            className={filter === 'Completed' ? 'selected' : ''}
            onClick={() => onFilterChange('Completed')}
          >
            Completed
          </button>
        </li>
      </ul>
    )
  }
}
