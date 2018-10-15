import React, { Component } from "react"
import PropTypes from "prop-types"
import "./App.css"
import Project from "./Project.js"
import { addProject, calculateProjectSetCost,  } from "./utils"
 

const initialProps = {
  projects: [
    // Set 1
    // addProject("Project 1", "low", new Date(2018,9,1), new Date(2018, 9, 3)),

    // // Set 2
    // addProject("Project 1", "low", new Date(2018,9,1), new Date(2018, 9, 1)),
    // addProject("Project 2", "high", new Date(2018,9,2), new Date(2018, 9, 6)),
    // addProject("Project 3", "low", new Date(2018,9,6), new Date(2018, 9, 8)),

    // Set 3
    addProject("Project 1", "low", new Date(2018,9,1), new Date(2018, 9, 3)),
    addProject("Project 2", "high", new Date(2018,9,5), new Date(2018, 9, 7)),
    addProject("Project 3", "high", new Date(2018,9,8), new Date(2018, 9, 8)),
    
    // Set 4
    // addProject("Project 1", "low", new Date(2018,9,1), new Date(2018, 9, 1)),
    // addProject("Project 2", "low", new Date(2018,9,1), new Date(2018, 9, 1)),
    // addProject("Project 3", "high", new Date(2018,9,2), new Date(2018, 9, 2)),
    // addProject("Project 4", "high", new Date(2018,9,2), new Date(2018, 9, 3)),
  ]
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...initialProps,
      ...props
    }
  }

  render() {
    const { projects } = this.state
    const costData = calculateProjectSetCost(projects)
    const projectItems = projects
      .map((project, index) => <Project project={project} key={index}/>)  // key=index is not safe (should use project.id / uuid in real project)
    
    return (
      <div className="App">
        <header className="App-header">
          <h2>Project Management</h2>
        </header>
        <ul className='project-container__ul'>
          {projectItems}
        </ul>
        <p>Total Days: {costData.totalDays}</p>
        <ul className='project-daily-cost'>
          <li></li>
        </ul>
        <p>Total: {JSON.stringify(costData.projectSetCost)}</p>
      </div>
    )
  }
}

App.propTypes = {
  projects: PropTypes.array,
}

export default App
