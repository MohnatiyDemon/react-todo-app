import classNames from 'classnames'
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
          <button
            type="button"
            className={classNames({ selected: filter === 'All' })}
            onClick={() => onFilterChange('All')}
          >
            All
          </button>
        </li>
        <li>
          <button
            type="button"
            className={classNames({ selected: filter === 'Active' })}
            onClick={() => onFilterChange('Active')}
          >
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            className={classNames({ selected: filter === 'Completed' })}
            onClick={() => onFilterChange('Completed')}
          >
            Completed
          </button>
        </li>
      </ul>
    )
  }
}
