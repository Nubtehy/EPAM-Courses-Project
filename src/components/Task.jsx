import React, { Component } from 'react'
import PropTypes from 'prop-types'

const Task = ({ date, title, description }) => (
    <tr>
        <td>{date}</td>

        <td>
            {title}
            <div>

                {description}
            </div>
        </td>
        <td>Status</td>
        <td>Progress</td>
        <td>Author</td>
        <td>Team</td>
    </tr>
)

Task.propTypes = {

    description: PropTypes.string.isRequired
}
export default Task