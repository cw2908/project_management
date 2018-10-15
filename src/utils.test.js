import * as utils from  "./utils"

// Unit Tests

it("validates type of date", () => {
  const date = new Date(2018,1,1)
  const invalidDate = "12-31-2018"
  
  expect(utils.validateDateType(date)).toBe(true)
  expect(utils.validateDateType(invalidDate)).toBe(false)
  expect(utils.validateDateType(2018)).toBe(false)
  // Should generally check null vs undefined in JS
  expect(utils.validateDateType()).toBe(false)
  expect(utils.validateDateType(null)).toBe(false) 
})

it("checks that dates are ordered correctly", () => {
  let startDate = new Date(2018,1,1)
  let endDate = new Date(2018,12,31)
  
  const validProject = utils.addProject("Example", "low", startDate, endDate)
  const oneDayProject = utils.addProject("One Day","Low",startDate, startDate)
  const reverseDateProject = utils.addProject("Example", "low", endDate, startDate)

  expect(validProject).toBeDefined()
  expect(oneDayProject).toBeDefined()
  expect(reverseDateProject).toBeFalsy()
})

it("creates projects with valid input", () => {
  let date = new Date(2018,1,1)
  const lowProject = utils.addProject("Low Example", "low", date, date)
  const highProject = utils.addProject("High Example", "high", date, date)
  const expectedLowProject = {name: "Low Example", dailyCost: {travel: 45, full: 75}, startDate: date, endDate: date}
  const expectedHighProject = {name: "High Example", dailyCost: {travel: 55, full: 85}, startDate: date, endDate: date}
  
  expect(lowProject).toEqual(expectedLowProject)
  expect(highProject).toEqual(expectedHighProject)
})

it("returns false for invalid project input", () => {
  let date = new Date(2018,1,1)
  const invalidProject = utils.addProject("Low Example", "low", date, null)
  
  expect(invalidProject).toBe(false)
})

it("checks if dates are the same",() => {
  let date = new Date(2018,1,1)
  let dateDuplicate = new Date(2018,1,1)
  let offsetDate = new Date(2018,1,2)
  expect(utils.sameDay(date,dateDuplicate)).toBe(true)
  expect(utils.sameDay(offsetDate)).toBeFalsy()
  expect(utils.sameDay()).toBeFalsy()
})

it("checks type of number", () => {
  let number = 3
  let undefNumber
  expect(utils.isNumber(3)).toBe(true)
  expect(utils.isNumber(number)).toBe(true)
  expect(utils.isNumber(23)).toBe(true)
  expect(utils.isNumber(-23.32)).toBe(true)
  expect(utils.isNumber("-23.32")).toBe(true)
  expect(utils.isNumber("-a23.32")).toBe(false)
  expect(utils.isNumber(undefNumber)).toBe(false)
  expect(utils.isNumber("Test")).toBe(false)
  expect(utils.isNumber("")).toBe(false)
  expect(utils.isNumber()).toBe(false)
  expect(utils.isNumber(null)).toBe(false)
})


it("finds an offset date",() => {
  let date = new Date(2018,1,1)
  let manuallyOffsetDate = new Date(2018,1,2)
  let offsetDate = utils.offsetDate(date,1)
  expect(utils.sameDay(manuallyOffsetDate, date)).toBe(false)
  expect(utils.sameDay(manuallyOffsetDate, offsetDate)).toBe(true)
  expect(utils.sameDay(date,"")).toBeFalsy()
  expect(utils.sameDay(date,null)).toBeFalsy()
  expect(utils.sameDay()).toBeFalsy()
})



// Integration Tests

it("Adds cost correctly when adding project",() => {
  let date = new Date(2018,1,1)
  const lowProject = utils.addProject("Low Example", "low", date, date)
  const highProject = utils.addProject("Low Example", "high", date, date)
  
  expect(lowProject.dailyCost.travel).toBe(45)
  expect(lowProject.dailyCost.full).toBe(75)
  expect(highProject.dailyCost.travel).toBe(55)
  expect(highProject.dailyCost.full).toBe(85)
})

it("Saves project but returns no cost if type is not 'low' or 'high'", () => {
  let date = new Date(2018,1,1)
  const mediumProject = utils.addProject("Medium Example", "medium", date, date)
  expect(mediumProject.dailyCost).toBeUndefined()
  // check other behaviors are not affected by integration between addProject and cost
  expect(mediumProject).toBeDefined()
  expect(mediumProject.name).toEqual("Medium Example")
})

