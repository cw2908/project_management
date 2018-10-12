const cost = (type) => {
  if (type === "low") {
    return 25
  } else if (type === "high") {
    return 75
  }
  else {
    return false
  }
}

const validateDateType = (date) => {
  return (Object.prototype.toString.call(date) === "[object Date]") 
    ? true 
    : false
}

exports.addProject = (name, cityType, startDate, endDate) => {
  // Could raise error here depending on requirements
  if (!validateDateType(startDate) || !validateDateType(endDate)) {
    return false
  }
  return {
    name: name,
    cost: cost(cityType)
  }
}

exports.calculateCost = (project) => {
  return project
}

exports.validateDateType = validateDateType