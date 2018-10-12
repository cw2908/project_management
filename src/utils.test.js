import * as utils from  "./utils"

it("validates type of date", () => {
  const date = new Date(2018,1,1)
  expect(utils.validateDateType(date)).toBe(true)
})

it("rejects invalid dates", () => {
  const invalidDate = ""
  expect(utils.validateDateType(invalidDate)).toBe(false)
  expect(utils.validateDateType()).toBe(false)
  expect(utils.validateDateType(null)).toBe(false)
})