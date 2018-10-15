import React, { Component } from "react"
import PropTypes from "prop-types"


class Project extends Component {
  render() {
    const project = this.props.project
    return (
      <li>
        {project.name} -- {JSON.stringify(project)}
      </li> 
    )
  }
}

Project.propTypes = {
  project: PropTypes.object.isRequired,
}

export default Project