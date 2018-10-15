import React from "react"
import ReactDOM from "react-dom"
import Project from "./Project"
import { addProject } from "./utils"

test("renders given valid props", () => {
  const date = new Date(2018,1,1)
  const project = addProject("Example", "low", date, date)
  const div = document.createElement("div")
  ReactDOM.render(<Project project={project} />, div)
  ReactDOM.unmountComponentAtNode(div)
})
