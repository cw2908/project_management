import React, { Component } from "react"
import PropTypes from "prop-types"
import { Button, Card } from "semantic-ui-react"

class Project extends Component {
  render() {
    const {project, removeProject} = this.props
    return (
      <Card>
        <Card.Header> {project.name}</Card.Header>
        <Card.Meta> Workday: {project.dailyCost.full}</Card.Meta>
        <Card.Meta> Travel: {project.dailyCost.travel}</Card.Meta>
        {project.startDate.toLocaleDateString()} through {project.endDate.toLocaleDateString()}
        <Button color='red' onClick={() => removeProject(project)}>Delete</Button>
      </Card>
    )
  }
}

Project.propTypes = {
  project: PropTypes.object.isRequired,
  removeProject: PropTypes.func.isRequired,
}

export default Project