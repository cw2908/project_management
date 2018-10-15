// Did not write test for this
// A test would likely be longer than the code
const validateDateType = (date) => {
  return (Object.prototype.toString.call(date) === "[object Date]") 
    ? true 
    : false
}

const costMap = (type) => {
  // string is probably not the best option here
  // could be boolean or an object/model if more than 3 cost types
  const typeIsValid = ["low","high"].indexOf(type) > -1
  if (!typeIsValid) return
  
  return {
    low:  { travel: 45, full: 75},
    high: { travel: 55, full: 85}
  }[type]
}


const sameDay = (date1, date2) => {
  if (!validateDateType(date1)) return false
  if (!validateDateType(date2)) return false
  return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
}


// returns all dates between a range
const getDates = (startDate, endDate) => {
  let dates = []
  let currentDate = startDate
  let  addDays = function(days) {
    let date = new Date(this.valueOf())
    date.setDate(date.getDate() + days)
    return date
  }
  while (currentDate <= endDate) {
    dates.push(currentDate)
    currentDate = addDays.call(currentDate, 1)
  }
  return dates
}

// Ensures value is a number
const isNumber = (n) => !isNaN(parseFloat(n)) && !isNaN(n - 0)

// Change a date based on integer offset
const offsetDate = (date, offset) => {
  if (!isNumber(offset) || !validateDateType(date)) return
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + offset)
}

// Checks if project end points overlap or are consecutive
const checkAdjacency = (projects, date) => {
  let nextDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
  let prevDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1)
  return projects.some(project => {
    let projectIndex = projects.indexOf(project)
    let otherProjects = projects.slice(0, projectIndex).concat(projects.slice(projectIndex+1))
    return otherProjects.some(adjacentProject => 
      sameDay(nextDay, adjacentProject.startDate) 
      || sameDay(prevDay, adjacentProject.endDate)
      || sameDay(project.endDate, adjacentProject.startDate) 
      || sameDay(project.startDate, adjacentProject.endDate) 
    )
  })
}

const checkTravelDay = (projects, date) =>
  projects
    .filter(project =>  sameDay(date, project.startDate) || sameDay(date, project.endDate))
    .length !== 0


// Adds project and returns false if dates are invalid (or reversed)
exports.addProject = (name = "", cityType, startDate, endDate) => {
  // May want to raise error or display message depending on requirements
  if (!validateDateType(startDate)
      || !validateDateType(endDate)
      || startDate > endDate
  ) {
    return false
  }
  return {
    name: name,
    dailyCost: costMap(cityType),
    startDate: startDate,
    endDate: endDate
  }
}


exports.calculateProjectSetCost = (projects) => {
  const projectSetStartDate = new Date(Math.min.apply(Math, projects.map((project)  => project.startDate)))
  const projectSetEndDate = new Date(Math.max.apply(Math, projects.map((project)  => project.endDate)))
  const potentialWorkDays = getDates(projectSetStartDate, projectSetEndDate)
  const totalDays = potentialWorkDays.length
  

  // Iterate over all dates and determine full project workday or travel day
  let projectSetArray = potentialWorkDays.map((date) => {
    let chargeType = null
    let isTravelDay = checkTravelDay(projects, date)
    let isAdjactentDay = checkAdjacency(projects, date)
    let notFirstOrLastDate = !sameDay(date, projectSetEndDate) && !sameDay(date, projectSetStartDate)
    let isFullProjectWorkDay = projects.some((project) =>  date > project.startDate && date < project.endDate)

    // Days explicitly in range of single project are always full
    if (isFullProjectWorkDay) {
      chargeType = "full"
    } else {
      if (isTravelDay) {
        // If adjacent and not beginning or end of set it is a full day, otherwise travel
        if (isAdjactentDay && notFirstOrLastDate) {
          chargeType = "full"
        } else {
          chargeType = "travel"
        }
      }
    }
    let projectCosts = projects
      .filter(project => date >= project.startDate && date <= project.endDate)
      .map(project => project.dailyCost[chargeType])
      
    let dateCost = projectCosts.sort().reverse()[0]
    return {
      date,
      dateCost,
      chargeType,
    }
  })
  
  console.table(projectSetArray)
  let projectSetCost = projectSetArray
    .map(projectSetDay => projectSetDay.dateCost)
    .filter(el => el != null)
    .reduce((sum, current) => sum+current, 0)
  return {potentialWorkDays, totalDays, projectSetArray, projectSetCost}
}


exports.validateDateType = validateDateType
exports.isNumber = isNumber
exports.sameDay = sameDay
exports.offsetDate = offsetDate