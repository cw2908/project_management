import React, { Component } from "react"
import PropTypes from "prop-types"
import { Card, Table } from "semantic-ui-react"
import "./App.css"
import Project from "./Project.js"
import DailyCost from "./DailyCost.js"
import NewProject from "./NewProject.js"
import { addProject, calculateProjectSetCost,  } from "./utils"
 

const initialProps = {
  projects: [
    // Set 1
    // addProject("Project 1", "low", new Date(2015,9,1), new Date(2015, 9, 3)),

    // // Set 2
    // addProject("Project 1", "low", new Date(2015,9,1), new Date(2015, 9, 1)),
    // addProject("Project 2", "high", new Date(2015,9,2), new Date(2015, 9, 6)),
    // addProject("Project 3", "low", new Date(2015,9,6), new Date(2015, 9, 8)),

    // Set 3
    // addProject("Project 1", "low", new Date(2015,9,1), new Date(2015, 9, 3)),
    // addProject("Project 2", "high", new Date(2015,9,5), new Date(2015, 9, 7)),
    // addProject("Project 3", "high", new Date(2015,9,8), new Date(2015, 9, 8)),
    
    // Set 4
    addProject("Project 1", "low", new Date(2015,9,1), new Date(2015, 9, 1)),
    addProject("Project 2", "low", new Date(2015,9,1), new Date(2015, 9, 1)),
    addProject("Project 3", "high", new Date(2015,9,2), new Date(2015, 9, 2)),
    addProject("Project 4", "high", new Date(2015,9,2), new Date(2015, 9, 3)),
  ]
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...initialProps,
      ...props
    }
    this.removeProject = this.removeProject.bind(this)
    this.addProjectToState = this.addProjectToState.bind(this)
  }

  addProjectToState(projectData) {
    let newProject = addProject(
      projectData.projectName,
      projectData.cityType,
      projectData.startDate,
      projectData.endDate
    )
    this.setState({
      projects: [...this.state.projects, newProject]
    })
  }

  removeProject(project) {
    let projects = this.state.projects
    let projectIndex = projects.indexOf(project)
    let removedProjects = projects.slice(0, projectIndex).concat(projects.slice(projectIndex+1))
    this.setState({projects: removedProjects})
  }

  render() {
    const { projects } = this.state
    const costData = calculateProjectSetCost(projects)
    // Key indexes are not safe (should use project.id / uuid in real project with database)
    const projectItems = projects
      .map((project, index) => <Project project={project} key={index} removeProject={this.removeProject}/>) 
    const dailyCosts = costData.projectSetArray
      .map((projectDay, index) => <DailyCost key={index} projectDay={projectDay}/>)
    return (
      <div className="App">
        <header className="App-header">
          <h2>Project Cost Calculator</h2>
        </header>
        <NewProject addProjectToState={this.addProjectToState}/>
        <Card.Group>
          {projectItems}
        </Card.Group>
  
        <Table celled compact>  
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Cost</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {dailyCosts}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell>Total Days: {costData.totalDays}</Table.HeaderCell>
              <Table.HeaderCell>Total Cost: ${JSON.stringify(costData.projectSetCost)}</Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    )
  }
}

App.propTypes = {
  projects: PropTypes.array,
}

export default App
