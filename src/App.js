import React, { Component } from "react"
import "./App.css"
import { addProject } from "./utils"

const initialProps = {
  projects: [
    addProject("IT Project", "low")
  ]
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...initialProps,
      ...props
    }
    this.renderProject = this.renderProject.bind(this)
  }
  renderProject(project, index) {
    // In a production instance the key should be unique (primary key from db, etc)
    const key = `${index}-${project.name}`
    return <li key={key}> {project.name} </li>
  }
  render() {
    const { projects } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <h2>Project Management</h2>
          {projects.map((project, index) => this.renderProject(project, index))}
        </header>
      </div>
    )
  }
}

export default App
