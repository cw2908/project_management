import React, { Component } from "react"
import PropTypes from "prop-types"
import { Input, Button, Dropdown, Divider } from "semantic-ui-react"
import {DayPicker} from "react-day-picker"
import "react-day-picker/lib/style.css"

const cityOptions = [
  {
    text: "High Cost",
    value: "high"
  },
  {
    text: "Low Cost",
    value: "low"
  }
] 


class NewProject extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
    }
    this.handleSelection = this.handleSelection.bind(this)
  }

  handleDate (date, type) {
    let obj = {}
    obj[type] = date
    this.setState(obj)
  }
  handleSelection (e, {value }) {this.setState({cityType: value })}

  render() {
    const {addProjectToState} = this.props
    const {projectName, cityType, startDate, endDate} = this.state
    // Simple Validation
    let formValidated = !(projectName && cityType && startDate && endDate && startDate <= endDate)
    return (
      <div className='new-project-container'>
        <Input placeholder="Project Name" onChange={(e) => this.setState({projectName: e.target.value})}/>
        <DayPicker selectedDays={startDate} onDayClick={(e) => this.handleDate(e, "startDate")}/>
        <DayPicker selectedDays={endDate}   onDayClick={(e) => this.handleDate(e, "endDate")}/>
        <Dropdown className='city-selector' placeholder='Select City Type' options={cityOptions} onChange={this.handleSelection}/>
        <Divider hidden/>
        <Button 
          onClick={() => addProjectToState({projectName, cityType, startDate, endDate})}
          disabled={formValidated}
          primary
        >
          Add Project
        </Button>
        <Divider />
      </div>
    )
  }
}



NewProject.propTypes = {
  addProjectToState: PropTypes.func.isRequired,
}

export default NewProject