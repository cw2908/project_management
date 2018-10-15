import React, { Component } from "react"
import PropTypes from "prop-types"
import { Input, Button, Dropdown, Divider } from "semantic-ui-react"
import {DayPicker} from "react-day-picker"
import "react-day-picker/lib/style.css"
import "react-datepicker/dist/react-datepicker.css"

const cityOptions = [
  {
    text: "High",
    value: "high"
  },
  {
    text: "Low",
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
    console.log({date},{type})
    let obj = {}
    obj[type] = date
    this.setState(obj)
  }
  handleSelection (e, {value }) {this.setState({cityType: value })}

  render() {
    console.log({props: this.props})
    const {addProjectToState} = this.props
    const {projectName, cityType, startDate, endDate} = this.state
    // Simple Validation
    let formValidated = !(projectName && cityType && startDate && endDate && startDate <= endDate)
    console.log({formValidated})
    console.log({startDate})
    console.log({endDate})
    return (
      <div className='new-project-container'>
        <Input placeholder="Project Name" onChange={(e) => this.setState({projectName: e.target.value})}/>
        <DayPicker selectedDays={startDate} onDayClick={(e) => this.handleDate(e, "startDate")}/>
        <DayPicker selectedDays={endDate}   onDayClick={(e) => this.handleDate(e, "endDate")}/>
        <Dropdown placeholder='Select City Type' options={cityOptions} onChange={this.handleSelection}/>
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