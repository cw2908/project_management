import React, { Component } from "react"
import PropTypes from "prop-types"


export default class DailyCost extends Component {
  render() {
    let projectDay = this.props.projectDay
    console.log({projectDay})
    let formattedDate = projectDay.date.toLocaleDateString()
    let cost = JSON.stringify(projectDay.dateCost) || "0"
    return (
      <li>
        {formattedDate} - ${cost}
      </li>
    )
  }
}

DailyCost.propTypes = {
  projectDay: PropTypes.object,
}