import React, { Component } from "react"
import PropTypes from "prop-types"
import { Table } from "semantic-ui-react"


export default class DailyCost extends Component {
  render() {
    let projectDay = this.props.projectDay
    console.log({projectDay})
    let formattedDate = projectDay.date.toLocaleDateString()
    let cost = JSON.stringify(projectDay.dateCost) || "0"
    return (
      
      <Table.Row>
        <Table.Cell>{formattedDate}</Table.Cell>
        <Table.Cell>${cost}</Table.Cell>
      </Table.Row>
    )
  }
}

DailyCost.propTypes = {
  projectDay: PropTypes.object,
}